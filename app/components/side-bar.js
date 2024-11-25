import Ember from 'ember';

export default Ember.Component.extend({
  user: Ember.inject.service(), 
  isLogoutModalOpen:false,

  userData: Ember.computed('user.userData', function () {
    return this.get('user').getUserData(); // Get user data from the service
  }),
  restaurantId: null,

  actions: {
    showLogoutModal() {
      this.set('isLogoutModalOpen', true);
    },

    closeLogoutModal() {
      this.set('isLogoutModalOpen', false);
    },

    logoutUser() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      const router = Ember.getOwner(this).lookup('router:main');
      
      // Attempt to access the restaurants.index controller
      const indexController = Ember.getOwner(this).lookup('controller:restaurants.index');
      
      if (indexController) {
        // Reset search state if the controller exists
        indexController.clearSearchState();
      } else {
        console.error("Index Controller not found");
      }
      
      router.transitionTo('login');
    }
    
    
  }
});
