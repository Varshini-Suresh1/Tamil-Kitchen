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
    return this.getOrdersForRestaurant(restaurantId,role)
      .then(orders => {
        console.log("Fetched Orders:", orders);

        return {
          restaurant: {
            id: restaurantId,
            orders: orders || [],
          },
        };
      })
      .catch(error => {
        return {
          restaurant: {
            id: restaurantId,
            orders: [],
            error: error.message
          },
        };
      });
  },

  getOrdersForRestaurant(restaurantId,role) {

    return this.fetchWithAuth(`http://localhost:8080/api/v1/restaurants/${restaurantId}/orders?isCompleted=placed`
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
    controller.set('orders', model.restaurant.orders);
  },
});
