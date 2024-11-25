import Ember from 'ember';
import FetchAuthMixin from '../../mixins/Authmixin';
import restaurants from '.';

export default Ember.Controller.extend(FetchAuthMixin, {
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  responseMessage: null,
  showSuccessMessage: false,
  showErrorMessage: false,
  foodItems: Ember.A([]),
  isFoodDetailDropdownOpen: false,   
  foodDetailSearchQuery: '',         
  selectedFoodDetail: null, 

  newFoodItem: {
    stock: '',
    priceHistoryList: [{ price: '' }]
  },

  newFoodDetail: {
    name: '',
    type: '',
    isVeg: false
  },

  isAddingNewFoodDetail: false,
  editedFoodItem: null,

  user: Ember.inject.service(),

  userData: Ember.computed('user.tokenLoaded', function () {
    return this.get('user').getUserData();
  }),

  filteredFoodDetails: Ember.computed('foodDetailSearchQuery', function () {
    let searchQuery = this.get('foodDetailSearchQuery').trim().toLowerCase();
    return this.get('foodDetailsList')
      .filter(foodDetail => searchQuery === '' || foodDetail.name.toLowerCase().includes(searchQuery));
  }),
  
  actions: {
    toggleFoodDetailDropdown() {
      this.set('isFoodDetailDropdownOpen', !this.isFoodDetailDropdownOpen);
    },

    selectFoodDetail(foodDetail) {
      this.set('newFoodItem.foodDetailsId', foodDetail.foodDetailsID);
      this.set('selectedFoodDetail', foodDetail);
      this.set('isFoodDetailDropdownOpen', false);       
    },

    openAddFoodItemModal() {
      this.set('isAddModalOpen', true);
      this.set('newFoodItem', {
        stock: null,
        foodDetailsId: null,
        price: null 
      });
      this.set('newFoodDetail', {
        name: '',
        type: '',
        isVeg: false,
        price: null 
      });
    },

    toggleFoodDetailOption(selectedValue) {
      this.set('isAddingNewFoodDetail', selectedValue === 'true');
    },
    closeAddFoodItemModal() {
      this.set('isAddModalOpen', false);
      this.set('newFoodDetail', {
        name: '',
        type: '',
        isVeg: false,
        stock: '',
      });

      this.set('newFoodItem', {
        stock: '',
        price: '' 
      });
      this.set('isAddingNewFoodDetail', false);
      this.set('foodDetailSearchQuery', ''); 
      this.set('selectedFoodDetail', null);
    },
    updateSelectedFoodDetail(selectedFoodDetailId) {
      this.set('newFoodItem.foodDetailsId', selectedFoodDetailId);
    },

    openEditModal(foodItem) {
      this.set('currentfoodItem', foodItem);
      this.set('editedFoodItem', Object.assign({}, foodItem));
      this.set('isEditModalOpen', true);
    },

    closeEditModal() {
      this.set('isEditModalOpen', false);
      this.set('editedFoodItem', null);
    },

    openDeleteModal(foodItem) {
      this.set('currentFoodItem', foodItem);
      this.set('isDeleteModalOpen', true);
    },

    closeDeleteModal() {
      this.set('isDeleteModalOpen', false);
      this.set('currentFoodItem', null);
    },
    updateSelectedFoodDetail(foodDetailsId) {
      this.set('newFoodItem.foodDetailsId', foodDetailsId);
    },

    goBack() {
      this.get('target').transitionTo('restaurants');
    },



    addFoodItem(event) {
      if (event) event.preventDefault();

      const newFoodItem = this.get('newFoodItem');
      const foodDetailsId = parseInt(newFoodItem.foodDetailsId, 10);
      const stock = parseInt(newFoodItem.stock, 10);
      const price = parseFloat(newFoodItem.price);

      // Check if the food item already exists in the current list of foodItems
      const foodItems = this.get('foodItems');
      const existingFoodItem = foodItems.find(item => item.foodDetailsId === foodDetailsId);

      if (existingFoodItem) {
        this.set('responseMessage', "Food item already exists.");
        this.set('showErrorMessage', true);

        setTimeout(() => {
          this.set('showErrorMessage', false);
        }, 1000);
        return;
      }

      // If food item does not exist, proceed to create a new one
      const payload = { stock, foodDetailsId, price };
      const restaurantId = this.get('model.restaurant.id');

      this.fetchWithAuth(
        `http://localhost:8080/api/v1/restaurants/${restaurantId}/fooditems`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {}
        }
      )
        .then((parsedResponse) => {
          this.set('responseMessage', parsedResponse.message);
          this.set('showSuccessMessage', true);

          const selectedFoodDetail = this.get('model.foodDetailsList').findBy('foodDetailsID', Number(newFoodItem.foodDetailsId));
          const addedFoodItem = {
            foodItemID: parsedResponse.value,
            foodDetails: {
              name: selectedFoodDetail.name,
              type: selectedFoodDetail.type,
              isVeg: selectedFoodDetail.isVeg,
            },
            stock: newFoodItem.stock,
            soldQuantity: 0,
            price: newFoodItem.price,
          };

          this.get('foodItems').pushObject(addedFoodItem);
          this.set('newFoodItem', {});
          this.set('foodDetailSearchQuery', ''); 
          this.set('selectedFoodDetail', null);

          setTimeout(() => {
            this.set('showSuccessMessage', false);
            this.send('closeAddFoodItemModal');
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


    
    addNewFoodDetail(event) {
      if (event) event.preventDefault();
      const newFoodDetail = this.get('newFoodDetail');
      if (this.get('isVegRestaurant')) {
        newFoodDetail.isVeg = true;
      }
      const payload = {
        name: newFoodDetail.name,
        type: parseInt(newFoodDetail.type, 10), // Convert type to an integer
        isVeg: newFoodDetail.isVeg,
      };
      //check if food detail already exists
      const existingFoodDetail = this.get('foodDetailsList').find(detail =>
        detail.name.toLowerCase() === payload.name.toLowerCase() &&
        detail.type === payload.type
      );

      if (existingFoodDetail) {
        this.set('responseMessage', "Food detail already exists.");
        this.set('showErrorMessage', true);

        setTimeout(() => {
          this.set('showErrorMessage', false);
        }, 1000);
        return; 
      }
      const url = 'http://localhost:8080/api/v1/fooddetails';

      this.fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {}
      })
        .then((parsedResponse) => {
          this.set('responseMessage', parsedResponse.message);
          this.set('showSuccessMessage', true);

          this.set('newFoodItem.foodDetailsId', parsedResponse.value);
          this.set('newFoodItem.stock', newFoodDetail.stock);
          this.set('newFoodItem.price', newFoodDetail.price); // Correctly set the price
          const addedFoodDetail = {
            foodDetailsID: parsedResponse.value,
            name: newFoodDetail.name,
            type: parseInt(newFoodDetail.type, 10),
            isVeg: newFoodDetail.isVeg,
          };

          this.get('foodDetailsList').pushObject(addedFoodDetail);
          this.set('newFoodDetail', {});
          this.send('addFoodItem');
        })
        .catch((error) => {
          this.set('responseMessage', error);
          this.set('showErrorMessage', true);

          setTimeout(() => {
            this.set('showErrorMessage', false);
          }, 1000);
        });
    },



    editFoodItem(event) {
      if (event) {
        event.preventDefault();
      }
      const foodItem = this.get('editedFoodItem');
      const payload = {
        stock: parseInt(foodItem.stock, 10),
        price: parseFloat(foodItem.price)

      };
      const url = `http://localhost:8080/api/v1/restaurants/${this.get('model.restaurant.id')}/fooditems/${foodItem.foodItemID}`;
      this.fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {}
      })
        .then((parsedResponse) => {
          if (parsedResponse && parsedResponse.message) {
            this.set('responseMessage', parsedResponse.message);
            this.set('showSuccessMessage', true);

            this.set('currentfoodItem.stock', payload.stock);
            this.set('currentfoodItem.price', payload.price);

            setTimeout(() => {
              this.set('showSuccessMessage', false);
              this.send('closeEditModal');
            }, 1000);
          }
        })
        .catch((error) => {
          this.set('responseMessage', error);
          this.set('showErrorMessage', true);

          setTimeout(() => {
            this.set('showErrorMessage', false);
            this.send('closeEditModal');
          }, 1000);
        });
    },



    deleteFoodItem() {
      const foodItem = this.get('currentFoodItem');
      const restaurantId = this.get('model.restaurant.id');
      const foodItemId = foodItem.foodItemID;

      const url = `http://localhost:8080/api/v1/restaurants/${restaurantId}/fooditems/${foodItemId}`;
      this.fetchWithAuth(url, { method: 'DELETE', headers: {} })
        .then((parsedResponse) => {
          if (parsedResponse.message) {
            this.set('responseMessage', parsedResponse.message);
            this.set('showSuccessMessage', true);
          }
          const foodItems = this.get('foodItems');
          const updatedFoodItems = foodItems.filter(item => item.foodItemID !== foodItemId);
          this.set('foodItems', updatedFoodItems);

          setTimeout(() => {
            this.set('showSuccessMessage', false);
            this.send('closeDeleteModal');
          }, 1000);
        })
        .catch((error) => {
          this.set('responseMessage', error);
          this.set('showErrorMessage', true);

          setTimeout(() => {
            this.set('showErrorMessage', false);
            this.send('closeDeleteModal');
          }, 1000);
        });
    },



    handleAddToCart(foodItem) {
      const userId = this.get('userData.userId');
      const restaurantId = parseInt(this.get('model.restaurant.id'), 10);
      const foodItemId = foodItem.foodItemID;
      const defaultQuantity = 1; // Start with 1 when adding a new item

      this.fetchIncompleteOrders(userId).then((orders) => {
        const existingOrder = orders.find(order => Number(order.restaurantId) === Number(restaurantId));

        if (existingOrder) {
          this.checkExistingOrderItem(userId, existingOrder.orderId, foodItemId)
            .then((orderItem) => {
              if (orderItem) {
                // Update the quantity if the item already exists in the cart
                let updatedQuantity = orderItem.quantity + 1;
                return this.updateOrderItemQuantity(userId, existingOrder.orderId, orderItem.orderItemId, updatedQuantity);
              } else {
                // If the item does not exist in the cart, add it with the default quantity
                return this.addOrderItem(userId, existingOrder.orderId, foodItemId, defaultQuantity);
              }
            });
        } else {
          // Create a new order if it doesn't exist for the restaurant
          return this.createNewOrder(userId, restaurantId, foodItemId, defaultQuantity);
        }
      }).catch((error) => {
        console.error('Error fetching incomplete orders:', error);
      });
    },



    removeFromCart(foodItem) {
      const userId = this.get('userData.userId');
      const restaurantId = this.get('model.restaurant.id');
      const foodItemId = foodItem.foodItemID;

      // Fetch the incomplete orders for the user
      this.fetchIncompleteOrders(userId).then((orders) => {
        const existingOrder = orders.find(order => Number(order.restaurantId) === Number(restaurantId));

        if (existingOrder) {
          // Check if the food item exists in the order
          this.checkExistingOrderItem(userId, existingOrder.orderId, foodItemId)
            .then((orderItem) => {
              if (orderItem) {
                if (orderItem.quantity > 1) {
                  // Decrement the quantity if it's greater than 1
                  let updatedQuantity = orderItem.quantity - 1;
                  return this.updateOrderItemQuantity(userId, existingOrder.orderId, orderItem.orderItemId, updatedQuantity);
                } else {
                  // If the quantity is 1, delete the item
                  return this.deleteOrderItem(userId, existingOrder.orderId, orderItem.orderItemId)
                    .then(() => {
                      // Check if the order has any remaining items
                      return this.checkOrderItems(userId, existingOrder.orderId)
                        .then((remainingItems) => {
                          console.log(remainingItems);
                          if (Array.isArray(remainingItems) && remainingItems.length === 0) {
                            // Delete the order if there are no items left
                            return this.deleteOrder(userId, existingOrder.orderId)
                              .then(() => {
                                console.log('Order deleted successfully as there were no remaining items.');
                              });
                          }
                        });
                    });
                }
              } else {
                console.log("Food item not found in the cart.");
              }
            });
        }
      }).catch((error) => {
        console.error('Error removing food item:', error);
      });
    },
  },

  fetchIncompleteOrders(userId) {
    const url = `http://localhost:8080/api/v1/users/${userId}/orders?isCompleted=cart`;
    const options = { method: 'GET', headers: {} };

    return this.fetchWithAuth(url, options)
      .then(data => Array.isArray(data) ? data : [])
      .catch(error => {
        return []
      });
  },

  checkExistingOrderItem(userId, orderId, foodItemId) {
    const url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}/orderitems`;
    const options = { method: 'GET', headers: {} };

    return this.fetchWithAuth(url, options)
      .then(data => Array.isArray(data) ? data.find(item => item.foodItemId === foodItemId) || null : null)
      .catch(error => {
        console.error('Error fetching order items:', error);
        throw error;
      });
  },

  updateOrderItemQuantity(userId, orderId, orderItemId, quantity) {
    const url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}/orderitems/${orderItemId}`;
    const payload = { foodItemId: orderItemId, quantity: quantity };
    const options = {
      method: 'PUT',
      body: JSON.stringify(payload), headers: {}
    };

    return this.fetchWithAuth(url, options)
      .then(data => {
        if (data.message) {
          this.set('responseMessage', "Cart Updated Successfully");
          this.set('showSuccessMessage', true);
          setTimeout(() => {
            this.set('showSuccessMessage', false);
            this.send('closeDeleteModal');
          }, 1000);
        }
      });
  },

  addOrderItem(userId, orderId, foodItemId, quantity) {
    const url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}/orderitems`;
    const payload = { foodItemId, quantity };
    const options = {
      method: 'POST',
      body: JSON.stringify(payload), headers: {}
    };

    return this.fetchWithAuth(url, options)
      .then(data => {
        if (data.message) {
          this.set('responseMessage', data.message);
          this.set('showSuccessMessage', true);
          setTimeout(() => {
            this.set('showSuccessMessage', false);
            this.send('closeDeleteModal');
          }, 1000);
        }
      });
  },

  createNewOrder(userId, restaurantId, foodItemId, quantity) {
    const url = `http://localhost:8080/api/v1/users/${userId}/orders`;
    const payload = {
      restaurantId,
      orderItems: [{ foodItemId, quantity }]
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(payload), headers: {}
    };

    return this.fetchWithAuth(url, options)
      .then(data => {
        if (data.message) {
          this.set('responseMessage', data.message);
          this.set('showSuccessMessage', true);
          setTimeout(() => {
            this.set('showSuccessMessage', false);
          }, 1000);
        }
      });
  },

  deleteOrderItem(userId, orderId, orderItemId) {
    const url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}/orderitems/${orderItemId}`;
    const options = { method: 'DELETE', headers: {} };

    return this.fetchWithAuth(url, options)
      .then(data => {
        if (data.message) {
          this.set('responseMessage', data.message);
          this.set('showSuccessMessage', true);
          setTimeout(() => {
            this.set('showSuccessMessage', false);
          }, 1000);
        }
      })
      .catch(error => {
        console.error('Error deleting order item:', error);
        throw error;
      });
  },



  checkOrderItems(userId, orderId) {
    const url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}/orderitems`;
    const options = { method: 'GET', headers: {} };
  
    return this.fetchWithAuth(url, options)
      .then(data => {
        // Return an array of remaining items
        return data;
      })
      .catch(error => {
       return error;
      });
  },


  deleteOrder(userId, orderId) {
    const url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}`;
    const options = { method: 'DELETE', headers: {} };

    return this.fetchWithAuth(url, options)
      .then(data => {
        this.set('responseMessage', data.message);
          this.set('showSuccessMessage', true);
          setTimeout(() => {
            this.set('showSuccessMessage', false);
          }, 1000);
      })
      .catch(error => {
        console.error('Error deleting order:', error);
        throw error;
      });
  }

});
