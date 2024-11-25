import Controller from '@ember/controller';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import FetchAuthMixin from '../../mixins/Authmixin'; 

export default Controller.extend(FetchAuthMixin, { 
  showOrderDetails: false,
  selectedOrder: null,
  errorMessage: null,
  showSuccessMessage: false,
  showErrorMessage: false,

  user: Ember.inject.service(), 

  // Computed property to access user data
  userData: computed('user.userData', function () {
    return this.get('user').getUserData(); 
  }),

  restaurantId: computed('model.restaurant.id', function () {
    return this.get('model.restaurant.id');
  }),

  actions: {
    viewOrderDetails(order) {
      this.set('selectedOrder', order);
      this.set('showOrderDetails', true);
    },

    closeModal() {
      this.set('showOrderDetails', false);
    },

    goBack() {
      this.get('target').transitionTo('restaurants');
    },

    
    acceptOrder(order) {
      console.log('Accepting order:', order);
      let userData = this.get('userData');
      let restaurantId = this.get('restaurantId');
      if (!userData) {
        console.error('userData is undefined');
        this.set('errorMessage', 'Failed to fetch user data. Please log in again.');
        return;
      }
    
      let userId = userData.userId;
      let orderId = order.orderId; 
      const url = `http://localhost:8080/api/v1/restaurants/${restaurantId}/orders/${orderId}`;
    
      this.fetchWithAuth(url, {
        method: 'PUT' ,
        body: JSON.stringify({ isCompleted: 2}),
        headers: {}
      })
      .then((data) => {
        console.log('Response data:', data); // Log the response data
        if (data.error) {
          // Log the error message
          console.error('Error from server:', data.error);
          this.set('responseMessage', data.error);
          this.set('showErrorMessage', true);
          setTimeout(() => {
            this.set('showErrorMessage', false);
          }, 3000);
          return; // Don't remove the order from the list
        }
        
        this.set('responseMessage', data.message);
        this.set('showSuccessMessage', true);
        setTimeout(() => {
          this.set('showSuccessMessage', false);
        }, 1000);
        
        this.updateOrderStatus(order, 2); 
      })
      .catch((error) => {
        this.set('responseMessage', error.message);
        this.set('showErrorMessage', true);
        setTimeout(() => {
          this.set('showErrorMessage', false);
        }, 1000);
      });
    },    

    rejectOrder(order) {
      this.updateOrderStatus(order, -1); // Status -1 for Rejected
    },

    sendStatusToRoute(status) {
      let restaurantId = this.get('restaurantId');
      const url = `http://localhost:8080/api/v1/restaurants/${restaurantId}/orders?isCompleted=${status}`;

      this.fetchWithAuth(url,{
        method: 'GET' , headers: {}
      })
        .then((data) => {
          console.log('Fetched Data:', data); 
          if (Array.isArray(data)) {
            this.set('model.restaurant.orders', data);
          } else {
            this.set('model.restaurant.orders', []);
          }
        })
        .catch((error) => {
          this.set('responseMessage', error);
          this.set('model.restaurant.orders', []);
        });
    },
  },

  updateOrderStatus(order, status) {
    let restaurantId = this.get('restaurantId');
    let orderId = order.orderId;
    const url = `http://localhost:8080/api/v1/restaurants/${restaurantId}/orders/${orderId}`;

    this.fetchWithAuth(url, {
      method: 'PUT',
      body: JSON.stringify({ isCompleted: status}),
      headers: {}
    })
    .then((data) => {
      this.set('model.restaurant.orders', this.get('model.restaurant.orders').filter(o => o.orderId !== order.orderId));
      this.set('responseMessage', data.message);
      this.set('showSuccessMessage', true);
      setTimeout(() => {
        this.set('showSuccessMessage', false);
      }, 1000);
    })
      .catch((error) => {
        console.log(error);
      });
  }
});
