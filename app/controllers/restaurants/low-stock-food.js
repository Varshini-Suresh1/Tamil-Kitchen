import Ember from 'ember';
import FetchAuthMixin from '../../mixins/Authmixin';
import { computed } from '@ember/object';

export default Ember.Controller.extend(FetchAuthMixin, {
  showMessage: false,
  responseMessage: null,
  
  actions: {
    goBack() {
      this.get('target').transitionTo('restaurants');
    },

    updateFoodItemStock(foodItem) {
      if (!foodItem.newStock || foodItem.newStock <= 0) {
        alert('Please enter a valid stock value.');
        return;
      }

      const payload = {
        stock: parseInt(foodItem.newStock,10),
      };
      const url = `http://localhost:8080/api/v1/restaurants/${foodItem.restaurantID}/fooditems/${foodItem.foodItemID}`;
      const options = {
        method: 'PUT',
        headers: {},
        body: JSON.stringify(payload),
      };

      this.fetchWithAuth(url, options)
        .then((parsedResponse) => {
          Ember.set(foodItem, 'stock', foodItem.newStock);
          Ember.set(foodItem, 'newStock', null);

          // Check if the updated stock is greater than 10
          if (foodItem.stock > 10) {
            const foodItems = this.get('model.restaurant.foodItems');

            // Filter out the food item with stock > 10
            const updatedFoodItems = foodItems.filter(item => item.foodItemID !== foodItem.foodItemID);
            this.set('model.restaurant.foodItems', updatedFoodItems);
          }

          if (parsedResponse.message) {
            this.set('responseMessage', parsedResponse.message);
            this.set('showSuccessMessage', true);
          }
          setTimeout(() => {
            this.set('showSuccessMessage', false);
          }, 1000);
        })
        .catch((error) => {
          this.set('responseMessage', error);
          this.set('showErrorMessage', true);
          setTimeout(() => {
            this.set('showErrorMessage', false);
          }, 1000);
        });
    },
  }
});
