import Ember from 'ember';

export default Ember.Route.extend({
    user: Ember.inject.service(),
    model() {
        const user = this.get('user').getUserData();
        return{
            role:user.role
        }
    },
    actions: {
        goToAdminDashboard() {
          this.transitionTo('restaurants');
        },
        goToResOwnerDashboard() {
          const restaurantId = this.get('user').getRestaurantId();
          if (restaurantId) {
            this.transitionTo('restaurants.fooditems', restaurantId);
          } else {
            console.error("Restaurant ID is not available");
          }
        },
        goToCustomerDashboard() {
          const userId = this.get('user').getUserId();
          if (userId) {
            this.transitionTo('users.addresses', userId);
          } else {
            console.error("User ID is not available");
          }
        }
    }
});
