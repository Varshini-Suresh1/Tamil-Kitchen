import Ember from 'ember';
import FetchAuthMixin from '../mixins/Authmixin';

export default Ember.Controller.extend(FetchAuthMixin, {
  isAddFoodDetailModalOpen: false,
  newFoodDetails: {
    name: '',
    type: '',
    isVeg: true, 
  },
  showMessage: false,
  responseMessage: '',

  actions: {
    openAddFoodDetailModal() {
      this.set('isAddFoodDetailModalOpen', true);
    },

    closeAddFoodDetailModal() {
      this.set('isAddFoodDetailModalOpen', false);
    },

    addFoodDetail(event) {
      if (event) {
        event.preventDefault();
      }

      const newFoodDetails = this.get('newFoodDetails');
      const newFoodType = parseInt(newFoodDetails.type, 10);

      // Check for existing food item with the same name and type
      const existingFoodDetail = this.get('foodDetails').find((food) => 
        food.name === newFoodDetails.name && food.type === newFoodType
      );

      if (existingFoodDetail) {
        this.set('responseMessage', 'Food item with the same name and type already exists.');
        this.set('showErrorMessage', true);
        setTimeout(() => this.set('showErrorMessage', false), 2000);
        return;
      }

      const payload = {
        name: newFoodDetails.name,
        type: newFoodType,
        isVeg: newFoodDetails.isVeg,
      };

      this.fetchWithAuth(
        'http://localhost:8080/api/v1/fooddetails', 
        { method: 'POST', body: JSON.stringify(payload), headers: {} }
      )
        .then((parsedResponse) => {
          if (parsedResponse.message) {
            this.set('responseMessage', parsedResponse.message);
            this.set('showSuccessMessage', true);

            const foodDetailId = parsedResponse.value;
            const addedFoodDetail = {
              foodDetailsID: foodDetailId,
              name: newFoodDetails.name,   
              type: newFoodType,   
              isVeg: newFoodDetails.isVeg,
            };

            this.get('model').pushObject(addedFoodDetail);
            this.set('newFoodDetails', { name: '', type: '', isVeg: true }); 

            setTimeout(() => {
              this.set('showSuccessMessage', false);
              this.send('closeAddFoodDetailModal');
            }, 1000);
          }
        })
        .catch((error) => {
          this.set('responseMessage', error);
          this.set('showErrorMessage', true);
          setTimeout(() => this.set('showErrorMessage', false), 1000);
        });
    }
  }
});
