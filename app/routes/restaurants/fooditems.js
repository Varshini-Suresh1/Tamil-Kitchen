import Route from '@ember/routing/route';
import AuthMixin from '../../mixins/Authmixin';

export default Route.extend(AuthMixin, {
  user: Ember.inject.service(),
  accessControl: Ember.inject.service(),

  beforeModel() {
    const routeName = this.routeName;

    if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
      this.transitionTo('access-denied'); 
    }
  },

  model(params) {
    const { restaurantId } = params;
    const role = this.get('user').getUserRole();

    return Promise.all([
      this.getFoodItemsForRestaurant(restaurantId, role),
      this.getFoodDetails(restaurantId, role),
      this.getRestaurantDetails(restaurantId) //to display only veg food details
    ])
      .then(([foodItems, foodDetails, restaurantDetails]) => {
        let filteredFoodDetails = foodDetails;
        if (restaurantDetails.isVeg) {
          filteredFoodDetails = foodDetails.filter(item => item.isVeg === true); // Only veg items for veg restaurants
        }
        return {
          restaurant: {
            id: restaurantId,
            foodItems: foodItems,
            isVeg: restaurantDetails.isVeg,
          },
          foodDetailsList: filteredFoodDetails, 
        };
      })
      .catch(error => {
        console.error('Error loading data:', error);
        return { restaurant: { id: restaurantId, foodItems: [], isVeg: false }, foodDetailsList: [] };
      });
  },

  getFoodItemsForRestaurant(restaurantId, role) {
    return this.fetchWithAuth(
      `http://localhost:8080/api/v1/restaurants/${restaurantId}/fooditems`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((data) => data || [])
      .catch((error) => {
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

  getFoodDetails(restaurantId, role) {
    return this.fetchWithAuth(
      `http://localhost:8080/api/v1/fooddetails`,
      {
        method: 'GET', headers: {
          'Content-Type': 'application/json'
        }
      },
    )
      .then((data) => data || [])
      .catch((error) => {
        console.error('Error fetching food details:', error);
        return [];
      });
  },

  getRestaurantDetails(restaurantId) {
    return this.fetchWithAuth(
      `http://localhost:8080/api/v1/restaurants/${restaurantId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((data) => data || {})
      .catch((error) => {
        console.error('Error fetching restaurant details:', error);
        return { isVeg: false };
      });
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('foodItems', model.restaurant.foodItems);
    controller.set('foodDetailsList', model.foodDetailsList); // Pass all filtered food items
    controller.set('restaurantId', model.restaurant.id);

    let isVegRestaurant = model.restaurant.isVeg;
    controller.set('isVegRestaurant', isVegRestaurant);
  },

  afterModel() {
    window.scrollTo(0, 0); // Scrolls to the top after any route change
  }
});
