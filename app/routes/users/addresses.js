import Route from '@ember/routing/route';
import FetchAuthMixin from '../../mixins/Authmixin';

export default Route.extend(FetchAuthMixin, {
  user: Ember.inject.service(),
  accessControl: Ember.inject.service(),
  beforeModel() {
    const routeName = this.routeName;

    if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
      this.transitionTo('access-denied');
    }
  },  
  model(params) {
    const { userid } = params;
    const role = this.get('user').getUserRole();

    return this.getAddressesForUser(userid, role)
      .then(addresses => {
        return {
          user: {
            id: userid,
            addresses: addresses || [],
          },
        };
      })
      .catch(error => {
        console.error('Error fetching addresses:', error);
        return {
          user: {
            id: userid,
            addresses: [],
            error: error.message
          },
        };
      });
  },

  getAddressesForUser(userid, role) {
    const url = `http://localhost:8080/api/v1/users/${userid}/addresses`;
    const options = { method: 'GET' , headers: {} };

    return this.fetchWithAuth(url, options)
      .then(data => {
        return data;
      })
      .catch(error => {
        throw error;
      });
  },

  setupController(controller, model) {
    this._super(controller, model); 
    controller.set('addresses', model.user.addresses); 
  },

  actions: {
    refreshModel() {
      this.refresh(); 
    },
  },
});
