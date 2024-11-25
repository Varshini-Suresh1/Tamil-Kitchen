import Route from '@ember/routing/route';
import FetchAuthMixin from '../mixins/Authmixin';

export default Route.extend(FetchAuthMixin, {
  user: Ember.inject.service(),
  accessControl: Ember.inject.service(),
  beforeModel() {
    const routeName = this.routeName;

    if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
      this.transitionTo('access-denied'); 
    }
  },  
  model() {
    return this.getFoodDetails();
  },

  getFoodDetails() {
    const url = 'http://localhost:8080/api/v1/fooddetails';
    const options = { method: 'GET', headers: {} }; 

    return this.fetchWithAuth(url, options)
      .then(response => {
        return response;
      })
      .catch(error => {
        return [];
      });
  },

  setupController(controller, model) {
    this._super(controller, model); 
    controller.set('foodDetails', model);
  },
});
