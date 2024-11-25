import Ember from 'ember';
import Route from '@ember/routing/route';
import AuthMixin from '../../mixins/Authmixin';

export default Route.extend(AuthMixin, {

  user: Ember.inject.service(),
  accessControl: Ember.inject.service(),

  beforeModel() {
    const routeName = this.routeName;

    if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
      this.transitionTo('access-denied'); // Redirect to login if access is denied
    }
  },
  model() {
    const role = this.get('user').getUserRole();
    const userId = this.get('user').getUserId();

    if (role === 0) {
      return Promise.all([
        this.getRestaurants(),
        this.getUsernames()
      ])
        .then(([restaurants, usernames]) => {
          return { restaurants, usernames };
        })
        .catch(error => {
          console.error('Error fetching data for role 0:', error);
          return { restaurants: [], usernames: [] };
        });
    } else if (role === 2) {
      return this.getUserDefaultAddress()
        .then((location) => {
          return this.getRestaurants(location)
            .then((restaurants) => {
              return { restaurants };
            })
            .catch(error => {
              console.error('Error fetching restaurants by location:', error);
              return { restaurants: [] };
            });
        })
        .catch(error => {
          if (error.message !== 'Unauthorized') {
            alert("No Default Address Found! Add Address to proceed.");
          }
          this.transitionTo('users.addresses', userId);
        });
    } 
  },


  getRestaurants(location = '') {
    let apiUrl = 'http://localhost:8080/api/v1/restaurants';

    if (location) {
      apiUrl += `?location=${encodeURIComponent(location)}`;
    }

    return this.fetchWithAuth(apiUrl, { method: 'GET' })
      .then(data => data)
      .catch(error => {
        throw error;
      });
  },

  getUsernames() {
    return this.fetchWithAuth('http://localhost:8080/api/v1/users', { method: 'GET' })
      .then(data => {
        return data;
      })
      .catch(error => {
        throw error;
      });
  },


  getUserDefaultAddress() {
    const userId = this.get('user').getUserId();
    const apiUrl = `http://localhost:8080/api/v1/users/${userId}/addresses?isDefault=true`;
    return this.fetchWithAuth(apiUrl, { method: 'GET', headers: {} })
      .then(data => {
        return data.location;
      })
      .catch(error => {
        throw error;
      });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('restaurants', model.restaurants);
    controller.set('usernames', model.usernames);
  }
});
