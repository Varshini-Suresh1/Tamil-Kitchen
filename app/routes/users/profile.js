import Route from '@ember/routing/route';
import FetchAuthMixin from '../../mixins/Authmixin';

export default Route.extend(FetchAuthMixin, {
  user: Ember.inject.service(),
  accessControl: Ember.inject.service(),
  beforeModel(transition) {
    const routeName = this.routeName;

    if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
      this.transitionTo('access-denied'); // Redirect to login if access is denied
    }
  },  
  model(params) {
    const { userid } = params;

    return Promise.all([
      this.getUserProfile(userid),
      this.getDefaultAddress(userid)
    ])
    .then(([profile, address]) => {
      return {
        profile: profile, 
        defaultAddress: address || null
      };
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  },

  getUserProfile(userid) {
    const url = `http://localhost:8080/api/v1/users/${userid}`;
    const options = { method: 'GET' , headers: {} };

    return this.fetchWithAuth(url, options)
      .then(profile => profile)
      .catch(error => {
        throw error;
      });
  },

  getDefaultAddress(userid) {
    const url = `http://localhost:8080/api/v1/users/${userid}/addresses?isDefault=true`;
    const options = { method: 'GET' , headers: {} };

    return this.fetchWithAuth(url, options)
      .then(address => {
        return address;
      })
      .catch(error => {
        return [];
      });
  },
});
