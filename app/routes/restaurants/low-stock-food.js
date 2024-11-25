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
    const { restaurantId } = params;
    const role = this.get('user').getUserRole();
    return this.getFoodItemsForRestaurant(restaurantId,role)
      .then(foodItems => {
        return {
          restaurant: {
            id: restaurantId,
            foodItems: foodItems || [],
          },
        };
      })
      .catch(error => {
        return {
          restaurant: {
            id: restaurantId,
            foodItems: [],
            error: error.message
          },
        };
      });
  },

  getFoodItemsForRestaurant(restaurantId,role) {
    return this.fetchWithAuth(`http://localhost:8080/api/v1/restaurants/${restaurantId}/fooditems?stockThreshold=10`
      , { method: 'GET' , headers: {} })
      .then(data => {
        return data;
      })
      .catch(error => {
        if (error.message === 'Restaurant does not exist.') {
          const router = Ember.getOwner(this).lookup('router:main');
          alert("The specified restaurant does not exist. Redirecting to the dashboard.");
          router.transitionTo('restaurants'); // Transition to the dashboard
        } else {
          console.error('Error fetching food items:', error);
        }
        return [];
      });
  },

  setupController(controller, model) {
    this._super(controller, model); 
    controller.set('foodItems', model);
  },
});
