"use strict";



define('tamil-kitchen-app/app', ['exports', 'tamil-kitchen-app/resolver', 'ember-load-initializers', 'tamil-kitchen-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('tamil-kitchen-app/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
define('tamil-kitchen-app/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
define('tamil-kitchen-app/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('tamil-kitchen-app/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('tamil-kitchen-app/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('tamil-kitchen-app/components/orders-component', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        showOrderDetails: false,
        selectedOrder: null,
        errorMessage: null,
        showEditModal: false,
        showCheckoutModal: false,
        finalPrice: null,
        totalAmount: null,
        discountedPrice: null,
        discount: null,
        serviceTax: null,
        deliveryFee: null,

        restaurantId: Ember.computed('model.restaurant.id', function () {
            return this.get('model.restaurant.id');
        }),

        user: Ember.inject.service(),

        userData: Ember.computed('user.userData', function () {
            return this.get('user').getUserData();
        }),

        actions: {
            acceptOrder: function acceptOrder(order) {
                this.get('acceptOrder')(order);
            },
            rejectOrder: function rejectOrder(order) {
                this.get('rejectOrder')(order);
            },
            submitRating: function submitRating(order) {
                this.get('submitRating')(order);
            },
            closeModal: function closeModal() {
                this.set('showCheckoutModal', false);
            },
            paymentDetails: function paymentDetails(order) {
                var totalAmount = 0;
                order.orderItems.forEach(function (item) {
                    totalAmount += item.quantity * item.price;
                });

                var discount = totalAmount > 500 ? totalAmount * 0.30 : 0;
                var discountedPrice = totalAmount - discount;
                var serviceTax = discountedPrice * 0.10;
                var deliveryFee = 30;
                var finalPrice = discountedPrice + serviceTax + deliveryFee;

                this.setProperties({
                    selectedOrder: order,
                    showCheckoutModal: true,
                    finalPrice: finalPrice,
                    totalAmount: totalAmount,
                    discountedPrice: discountedPrice,
                    discount: discount,
                    serviceTax: serviceTax,
                    deliveryFee: deliveryFee
                });
            }
        }
    });
});
define('tamil-kitchen-app/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _powerSelectMultiple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
});
define('tamil-kitchen-app/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('tamil-kitchen-app/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _powerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
});
define('tamil-kitchen-app/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _beforeOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
});
define('tamil-kitchen-app/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _options) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
});
define('tamil-kitchen-app/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _placeholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
});
define('tamil-kitchen-app/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _powerSelectGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
});
define('tamil-kitchen-app/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _searchMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
});
define('tamil-kitchen-app/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('tamil-kitchen-app/components/side-bar', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    user: Ember.inject.service(),
    isLogoutModalOpen: false,

    userData: Ember.computed('user.userData', function () {
      return this.get('user').getUserData(); // Get user data from the service
    }),
    restaurantId: null,

    actions: {
      showLogoutModal: function showLogoutModal() {
        this.set('isLogoutModalOpen', true);
      },
      closeLogoutModal: function closeLogoutModal() {
        this.set('isLogoutModalOpen', false);
      },
      logoutUser: function logoutUser() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refreshToken');
        var router = Ember.getOwner(this).lookup('router:main');

        // Attempt to access the restaurants.index controller
        var indexController = Ember.getOwner(this).lookup('controller:restaurants.index');

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
});
define('tamil-kitchen-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('tamil-kitchen-app/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('tamil-kitchen-app/controllers/food-details', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_Authmixin.default, {
    isAddFoodDetailModalOpen: false,
    newFoodDetails: {
      name: '',
      type: '',
      isVeg: true
    },
    showMessage: false,
    responseMessage: '',

    actions: {
      openAddFoodDetailModal: function openAddFoodDetailModal() {
        this.set('isAddFoodDetailModalOpen', true);
      },
      closeAddFoodDetailModal: function closeAddFoodDetailModal() {
        this.set('isAddFoodDetailModalOpen', false);
      },
      addFoodDetail: function addFoodDetail(event) {
        var _this = this;

        if (event) {
          event.preventDefault();
        }

        var newFoodDetails = this.get('newFoodDetails');
        var newFoodType = parseInt(newFoodDetails.type, 10);

        // Check for existing food item with the same name and type
        var existingFoodDetail = this.get('foodDetails').find(function (food) {
          return food.name === newFoodDetails.name && food.type === newFoodType;
        });

        if (existingFoodDetail) {
          this.set('responseMessage', 'Food item with the same name and type already exists.');
          this.set('showErrorMessage', true);
          setTimeout(function () {
            return _this.set('showErrorMessage', false);
          }, 2000);
          return;
        }

        var payload = {
          name: newFoodDetails.name,
          type: newFoodType,
          isVeg: newFoodDetails.isVeg
        };

        this.fetchWithAuth('http://localhost:8080/api/v1/fooddetails', { method: 'POST', body: JSON.stringify(payload), headers: {} }).then(function (parsedResponse) {
          if (parsedResponse.message) {
            _this.set('responseMessage', parsedResponse.message);
            _this.set('showSuccessMessage', true);

            var foodDetailId = parsedResponse.value;
            var addedFoodDetail = {
              foodDetailsID: foodDetailId,
              name: newFoodDetails.name,
              type: newFoodType,
              isVeg: newFoodDetails.isVeg
            };

            _this.get('model').pushObject(addedFoodDetail);
            _this.set('newFoodDetails', { name: '', type: '', isVeg: true });

            setTimeout(function () {
              _this.set('showSuccessMessage', false);
              _this.send('closeAddFoodDetailModal');
            }, 1000);
          }
        }).catch(function (error) {
          _this.set('responseMessage', error);
          _this.set('showErrorMessage', true);
          setTimeout(function () {
            return _this.set('showErrorMessage', false);
          }, 1000);
        });
      }
    }
  });
});
define('tamil-kitchen-app/controllers/login', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_Authmixin.default, {
    username: '',
    encryptedPwd: '',
    responseMessage: '',
    user: Ember.inject.service(),

    actions: {
      login: function login(event) {
        var _this = this;

        if (event) {
          event.preventDefault();
        }

        var payload = {
          username: this.get('username'),
          encryptedPwd: this.get('encryptedPwd')
        };

        fetch('http://localhost:8080/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).then(function (response) {
          if (!response.ok) {
            throw new Error('Invalid username or password');
          }

          // Get tokens from response headers
          var accessToken = response.headers.get('Access-Token');
          var refreshToken = response.headers.get('Refresh-Token');

          if (!accessToken || !refreshToken) {
            throw new Error('Tokens not received');
          }

          localStorage.setItem('jwtToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          _this.get('user').loadToken();

          var userData = _this.get('user').getUserData();
          var userId = userData.userId;
          var role = userData.role;
          var restaurantId = userData.restaurantId;

          _this.set('username', '');
          _this.set('encryptedPwd', '');

          _this.transitionToRole(role, restaurantId, userId);
        }).catch(function (error) {
          _this.set('showErrorMessage', true);
          _this.set('responseMessage', error.message);
          setTimeout(function () {
            return _this.set('showErrorMessage', false);
          }, 1000);
        });
      },
      setUsername: function setUsername(value) {
        this.set('username', value);
      },
      setPassword: function setPassword(value) {
        this.set('encryptedPwd', value);
      }
    },

    transitionToRole: function transitionToRole(role, restaurantId, userId) {
      var _this2 = this;

      if (role === 0) {
        this.get('target').transitionTo('restaurants');
      } else if (role === 1) {
        this.get('target').transitionTo('restaurants.fooditems', restaurantId);
      } else if (role === 2) {
        this.getUserDefaultAddress(userId).then(function (defaultAddress) {
          if (defaultAddress) {
            _this2.get('target').transitionTo('restaurants');
          } else {
            _this2.get('target').transitionTo('users.addresses', userId);
          }
        });
      } else {
        this.get('target').transitionTo('login');
      }
    },
    getUserDefaultAddress: function getUserDefaultAddress(userid) {
      console.log("UserId:", userid);
      var url = 'http://localhost:8080/api/v1/users/' + userid + '/addresses?isDefault=true';
      return this.fetchWithAuth(url).then(function (data) {
        return data ? data.location : null;
      }).catch(function (error) {
        console.error("Error fetching default address:", error);
        return null;
      });
    }
  });
});
define('tamil-kitchen-app/controllers/restaurants/fooditems', ['exports', 'tamil-kitchen-app/mixins/Authmixin', 'tamil-kitchen-app/controllers/restaurants'], function (exports, _Authmixin, _restaurants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _actions;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  exports.default = Ember.Controller.extend(_Authmixin.default, {
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
      var searchQuery = this.get('foodDetailSearchQuery').trim().toLowerCase();
      return this.get('foodDetailsList').filter(function (foodDetail) {
        return searchQuery === '' || foodDetail.name.toLowerCase().includes(searchQuery);
      });
    }),

    actions: (_actions = {
      toggleFoodDetailDropdown: function toggleFoodDetailDropdown() {
        this.set('isFoodDetailDropdownOpen', !this.isFoodDetailDropdownOpen);
      },
      selectFoodDetail: function selectFoodDetail(foodDetail) {
        this.set('newFoodItem.foodDetailsId', foodDetail.foodDetailsID);
        this.set('selectedFoodDetail', foodDetail);
        this.set('isFoodDetailDropdownOpen', false);
      },
      openAddFoodItemModal: function openAddFoodItemModal() {
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
      toggleFoodDetailOption: function toggleFoodDetailOption(selectedValue) {
        this.set('isAddingNewFoodDetail', selectedValue === 'true');
      },
      closeAddFoodItemModal: function closeAddFoodItemModal() {
        this.set('isAddModalOpen', false);
        this.set('newFoodDetail', {
          name: '',
          type: '',
          isVeg: false,
          stock: ''
        });

        this.set('newFoodItem', {
          stock: '',
          price: ''
        });
        this.set('isAddingNewFoodDetail', false);
        this.set('foodDetailSearchQuery', '');
        this.set('selectedFoodDetail', null);
      },
      updateSelectedFoodDetail: function updateSelectedFoodDetail(selectedFoodDetailId) {
        this.set('newFoodItem.foodDetailsId', selectedFoodDetailId);
      },
      openEditModal: function openEditModal(foodItem) {
        this.set('currentfoodItem', foodItem);
        this.set('editedFoodItem', Object.assign({}, foodItem));
        this.set('isEditModalOpen', true);
      },
      closeEditModal: function closeEditModal() {
        this.set('isEditModalOpen', false);
        this.set('editedFoodItem', null);
      },
      openDeleteModal: function openDeleteModal(foodItem) {
        this.set('currentFoodItem', foodItem);
        this.set('isDeleteModalOpen', true);
      },
      closeDeleteModal: function closeDeleteModal() {
        this.set('isDeleteModalOpen', false);
        this.set('currentFoodItem', null);
      }
    }, _defineProperty(_actions, 'updateSelectedFoodDetail', function updateSelectedFoodDetail(foodDetailsId) {
      this.set('newFoodItem.foodDetailsId', foodDetailsId);
    }), _defineProperty(_actions, 'goBack', function goBack() {
      this.get('target').transitionTo('restaurants');
    }), _defineProperty(_actions, 'addFoodItem', function addFoodItem(event) {
      var _this = this;

      if (event) event.preventDefault();

      var newFoodItem = this.get('newFoodItem');
      var foodDetailsId = parseInt(newFoodItem.foodDetailsId, 10);
      var stock = parseInt(newFoodItem.stock, 10);
      var price = parseFloat(newFoodItem.price);

      // Check if the food item already exists in the current list of foodItems
      var foodItems = this.get('foodItems');
      var existingFoodItem = foodItems.find(function (item) {
        return item.foodDetailsId === foodDetailsId;
      });

      if (existingFoodItem) {
        this.set('responseMessage', "Food item already exists.");
        this.set('showErrorMessage', true);

        setTimeout(function () {
          _this.set('showErrorMessage', false);
        }, 1000);
        return;
      }

      // If food item does not exist, proceed to create a new one
      var payload = { stock: stock, foodDetailsId: foodDetailsId, price: price };
      var restaurantId = this.get('model.restaurant.id');

      this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurantId + '/fooditems', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {}
      }).then(function (parsedResponse) {
        _this.set('responseMessage', parsedResponse.message);
        _this.set('showSuccessMessage', true);

        var selectedFoodDetail = _this.get('model.foodDetailsList').findBy('foodDetailsID', Number(newFoodItem.foodDetailsId));
        var addedFoodItem = {
          foodItemID: parsedResponse.value,
          foodDetails: {
            name: selectedFoodDetail.name,
            type: selectedFoodDetail.type,
            isVeg: selectedFoodDetail.isVeg
          },
          stock: newFoodItem.stock,
          soldQuantity: 0,
          price: newFoodItem.price
        };

        _this.get('foodItems').pushObject(addedFoodItem);
        _this.set('newFoodItem', {});
        _this.set('foodDetailSearchQuery', '');
        _this.set('selectedFoodDetail', null);

        setTimeout(function () {
          _this.set('showSuccessMessage', false);
          _this.send('closeAddFoodItemModal');
        }, 1000);
      }).catch(function (error) {
        _this.set('responseMessage', error);
        _this.set('showErrorMessage', true);

        setTimeout(function () {
          _this.set('showErrorMessage', false);
        }, 1000);
      });
    }), _defineProperty(_actions, 'addNewFoodDetail', function addNewFoodDetail(event) {
      var _this2 = this;

      if (event) event.preventDefault();
      var newFoodDetail = this.get('newFoodDetail');
      if (this.get('isVegRestaurant')) {
        newFoodDetail.isVeg = true;
      }
      var payload = {
        name: newFoodDetail.name,
        type: parseInt(newFoodDetail.type, 10), // Convert type to an integer
        isVeg: newFoodDetail.isVeg
      };
      //check if food detail already exists
      var existingFoodDetail = this.get('foodDetailsList').find(function (detail) {
        return detail.name.toLowerCase() === payload.name.toLowerCase() && detail.type === payload.type;
      });

      if (existingFoodDetail) {
        this.set('responseMessage', "Food detail already exists.");
        this.set('showErrorMessage', true);

        setTimeout(function () {
          _this2.set('showErrorMessage', false);
        }, 1000);
        return;
      }
      var url = 'http://localhost:8080/api/v1/fooddetails';

      this.fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {}
      }).then(function (parsedResponse) {
        _this2.set('responseMessage', parsedResponse.message);
        _this2.set('showSuccessMessage', true);

        _this2.set('newFoodItem.foodDetailsId', parsedResponse.value);
        _this2.set('newFoodItem.stock', newFoodDetail.stock);
        _this2.set('newFoodItem.price', newFoodDetail.price); // Correctly set the price
        var addedFoodDetail = {
          foodDetailsID: parsedResponse.value,
          name: newFoodDetail.name,
          type: parseInt(newFoodDetail.type, 10),
          isVeg: newFoodDetail.isVeg
        };

        _this2.get('foodDetailsList').pushObject(addedFoodDetail);
        _this2.set('newFoodDetail', {});
        _this2.send('addFoodItem');
      }).catch(function (error) {
        _this2.set('responseMessage', error);
        _this2.set('showErrorMessage', true);

        setTimeout(function () {
          _this2.set('showErrorMessage', false);
        }, 1000);
      });
    }), _defineProperty(_actions, 'editFoodItem', function editFoodItem(event) {
      var _this3 = this;

      if (event) {
        event.preventDefault();
      }
      var foodItem = this.get('editedFoodItem');
      var payload = {
        stock: parseInt(foodItem.stock, 10),
        price: parseFloat(foodItem.price)

      };
      var url = 'http://localhost:8080/api/v1/restaurants/' + this.get('model.restaurant.id') + '/fooditems/' + foodItem.foodItemID;
      this.fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {}
      }).then(function (parsedResponse) {
        if (parsedResponse && parsedResponse.message) {
          _this3.set('responseMessage', parsedResponse.message);
          _this3.set('showSuccessMessage', true);

          _this3.set('currentfoodItem.stock', payload.stock);
          _this3.set('currentfoodItem.price', payload.price);

          setTimeout(function () {
            _this3.set('showSuccessMessage', false);
            _this3.send('closeEditModal');
          }, 1000);
        }
      }).catch(function (error) {
        _this3.set('responseMessage', error);
        _this3.set('showErrorMessage', true);

        setTimeout(function () {
          _this3.set('showErrorMessage', false);
          _this3.send('closeEditModal');
        }, 1000);
      });
    }), _defineProperty(_actions, 'deleteFoodItem', function deleteFoodItem() {
      var _this4 = this;

      var foodItem = this.get('currentFoodItem');
      var restaurantId = this.get('model.restaurant.id');
      var foodItemId = foodItem.foodItemID;

      var url = 'http://localhost:8080/api/v1/restaurants/' + restaurantId + '/fooditems/' + foodItemId;
      this.fetchWithAuth(url, { method: 'DELETE', headers: {} }).then(function (parsedResponse) {
        if (parsedResponse.message) {
          _this4.set('responseMessage', parsedResponse.message);
          _this4.set('showSuccessMessage', true);
        }
        var foodItems = _this4.get('foodItems');
        var updatedFoodItems = foodItems.filter(function (item) {
          return item.foodItemID !== foodItemId;
        });
        _this4.set('foodItems', updatedFoodItems);

        setTimeout(function () {
          _this4.set('showSuccessMessage', false);
          _this4.send('closeDeleteModal');
        }, 1000);
      }).catch(function (error) {
        _this4.set('responseMessage', error);
        _this4.set('showErrorMessage', true);

        setTimeout(function () {
          _this4.set('showErrorMessage', false);
          _this4.send('closeDeleteModal');
        }, 1000);
      });
    }), _defineProperty(_actions, 'handleAddToCart', function handleAddToCart(foodItem) {
      var _this5 = this;

      var userId = this.get('userData.userId');
      var restaurantId = parseInt(this.get('model.restaurant.id'), 10);
      var foodItemId = foodItem.foodItemID;
      var defaultQuantity = 1; // Start with 1 when adding a new item

      this.fetchIncompleteOrders(userId).then(function (orders) {
        var existingOrder = orders.find(function (order) {
          return Number(order.restaurantId) === Number(restaurantId);
        });

        if (existingOrder) {
          _this5.checkExistingOrderItem(userId, existingOrder.orderId, foodItemId).then(function (orderItem) {
            if (orderItem) {
              // Update the quantity if the item already exists in the cart
              var updatedQuantity = orderItem.quantity + 1;
              return _this5.updateOrderItemQuantity(userId, existingOrder.orderId, orderItem.orderItemId, updatedQuantity);
            } else {
              // If the item does not exist in the cart, add it with the default quantity
              return _this5.addOrderItem(userId, existingOrder.orderId, foodItemId, defaultQuantity);
            }
          });
        } else {
          // Create a new order if it doesn't exist for the restaurant
          return _this5.createNewOrder(userId, restaurantId, foodItemId, defaultQuantity);
        }
      }).catch(function (error) {
        console.error('Error fetching incomplete orders:', error);
      });
    }), _defineProperty(_actions, 'removeFromCart', function removeFromCart(foodItem) {
      var _this6 = this;

      var userId = this.get('userData.userId');
      var restaurantId = this.get('model.restaurant.id');
      var foodItemId = foodItem.foodItemID;

      // Fetch the incomplete orders for the user
      this.fetchIncompleteOrders(userId).then(function (orders) {
        var existingOrder = orders.find(function (order) {
          return Number(order.restaurantId) === Number(restaurantId);
        });

        if (existingOrder) {
          // Check if the food item exists in the order
          _this6.checkExistingOrderItem(userId, existingOrder.orderId, foodItemId).then(function (orderItem) {
            if (orderItem) {
              if (orderItem.quantity > 1) {
                // Decrement the quantity if it's greater than 1
                var updatedQuantity = orderItem.quantity - 1;
                return _this6.updateOrderItemQuantity(userId, existingOrder.orderId, orderItem.orderItemId, updatedQuantity);
              } else {
                // If the quantity is 1, delete the item
                return _this6.deleteOrderItem(userId, existingOrder.orderId, orderItem.orderItemId).then(function () {
                  // Check if the order has any remaining items
                  return _this6.checkOrderItems(userId, existingOrder.orderId).then(function (remainingItems) {
                    console.log(remainingItems);
                    if (Array.isArray(remainingItems) && remainingItems.length === 0) {
                      // Delete the order if there are no items left
                      return _this6.deleteOrder(userId, existingOrder.orderId).then(function () {
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
      }).catch(function (error) {
        console.error('Error removing food item:', error);
      });
    }), _actions),

    fetchIncompleteOrders: function fetchIncompleteOrders(userId) {
      var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders?isCompleted=cart';
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (data) {
        return Array.isArray(data) ? data : [];
      }).catch(function (error) {
        return [];
      });
    },
    checkExistingOrderItem: function checkExistingOrderItem(userId, orderId, foodItemId) {
      var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId + '/orderitems';
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (data) {
        return Array.isArray(data) ? data.find(function (item) {
          return item.foodItemId === foodItemId;
        }) || null : null;
      }).catch(function (error) {
        console.error('Error fetching order items:', error);
        throw error;
      });
    },
    updateOrderItemQuantity: function updateOrderItemQuantity(userId, orderId, orderItemId, quantity) {
      var _this7 = this;

      var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId + '/orderitems/' + orderItemId;
      var payload = { foodItemId: orderItemId, quantity: quantity };
      var options = {
        method: 'PUT',
        body: JSON.stringify(payload), headers: {}
      };

      return this.fetchWithAuth(url, options).then(function (data) {
        if (data.message) {
          _this7.set('responseMessage', "Cart Updated Successfully");
          _this7.set('showSuccessMessage', true);
          setTimeout(function () {
            _this7.set('showSuccessMessage', false);
            _this7.send('closeDeleteModal');
          }, 1000);
        }
      });
    },
    addOrderItem: function addOrderItem(userId, orderId, foodItemId, quantity) {
      var _this8 = this;

      var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId + '/orderitems';
      var payload = { foodItemId: foodItemId, quantity: quantity };
      var options = {
        method: 'POST',
        body: JSON.stringify(payload), headers: {}
      };

      return this.fetchWithAuth(url, options).then(function (data) {
        if (data.message) {
          _this8.set('responseMessage', data.message);
          _this8.set('showSuccessMessage', true);
          setTimeout(function () {
            _this8.set('showSuccessMessage', false);
            _this8.send('closeDeleteModal');
          }, 1000);
        }
      });
    },
    createNewOrder: function createNewOrder(userId, restaurantId, foodItemId, quantity) {
      var _this9 = this;

      var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders';
      var payload = {
        restaurantId: restaurantId,
        orderItems: [{ foodItemId: foodItemId, quantity: quantity }]
      };
      var options = {
        method: 'POST',
        body: JSON.stringify(payload), headers: {}
      };

      return this.fetchWithAuth(url, options).then(function (data) {
        if (data.message) {
          _this9.set('responseMessage', data.message);
          _this9.set('showSuccessMessage', true);
          setTimeout(function () {
            _this9.set('showSuccessMessage', false);
          }, 1000);
        }
      });
    },
    deleteOrderItem: function deleteOrderItem(userId, orderId, orderItemId) {
      var _this10 = this;

      var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId + '/orderitems/' + orderItemId;
      var options = { method: 'DELETE', headers: {} };

      return this.fetchWithAuth(url, options).then(function (data) {
        if (data.message) {
          _this10.set('responseMessage', data.message);
          _this10.set('showSuccessMessage', true);
          setTimeout(function () {
            _this10.set('showSuccessMessage', false);
          }, 1000);
        }
      }).catch(function (error) {
        console.error('Error deleting order item:', error);
        throw error;
      });
    },
    checkOrderItems: function checkOrderItems(userId, orderId) {
      var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId + '/orderitems';
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (data) {
        // Return an array of remaining items
        return data;
      }).catch(function (error) {
        return error;
      });
    },
    deleteOrder: function deleteOrder(userId, orderId) {
      var _this11 = this;

      var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId;
      var options = { method: 'DELETE', headers: {} };

      return this.fetchWithAuth(url, options).then(function (data) {
        _this11.set('responseMessage', data.message);
        _this11.set('showSuccessMessage', true);
        setTimeout(function () {
          _this11.set('showSuccessMessage', false);
        }, 1000);
      }).catch(function (error) {
        console.error('Error deleting order:', error);
        throw error;
      });
    }
  });
});
define('tamil-kitchen-app/controllers/restaurants/index', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_Authmixin.default, {
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    isAddModalOpen: false,
    currentRestaurant: null,
    newRestaurant: {},
    editedRestaurant: {},
    responseMessage: null,
    showMessage: false,
    showresult: false,
    isDropdownOpen: false,
    isLocationDropdownOpen: false,
    searchQuery: '',
    locationSearchQuery: '',
    ownerEmailSearchQuery: '',

    restaurants: Ember.A([]),

    user: Ember.inject.service(),

    userData: Ember.computed('user.tokenLoaded', function () {
      return this.get('user').getUserData();
    }),

    tamilnaduCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Ranipet', 'Virudhunagar', 'Karur', 'Nilgiris', 'Sivaganga', 'Tirupathur', 'Nagapattinam', 'Krishnagiri', 'Kanchipuram', 'Ariyalur', 'Perambalur', 'Ramanathapuram', 'Namakkal', 'Cuddalore'],
    filteredLocations: Ember.computed('locationSearchQuery', function () {
      var searchQuery = this.get('locationSearchQuery').trim().toLowerCase();
      return searchQuery === '' ? this.tamilnaduCities : this.tamilnaduCities.filter(function (city) {
        return city.toLowerCase().includes(searchQuery);
      });
    }),

    usernames: [],
    filteredUsernames: Ember.computed('ownerEmailSearchQuery', function () {
      var searchQuery = this.get('ownerEmailSearchQuery').trim().toLowerCase();
      return this.get('usernames').filter(function (user) {
        return user.role === 2;
      }) // Filter only users with role 2
      .filter(function (user) {
        return searchQuery === '' || user.username.toLowerCase().includes(searchQuery);
      }); // Apply search query if available
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.clearSearchState();
    },


    actions: {
      toggleLocationDropdown: function toggleLocationDropdown() {
        this.set('isLocationDropdownOpen', !this.isLocationDropdownOpen);
        this.set('isOwnerEmailDropdownOpen', false);
      },
      toggleUsernameDropdown: function toggleUsernameDropdown() {
        this.set('isOwnerEmailDropdownOpen', !this.isOwnerEmailDropdownOpen);
        this.set('isLocationDropdownOpen', false);
      },
      selectLocation: function selectLocation(city) {
        this.set('newRestaurant.location', city);
        this.set('editedRestaurant.location', city);
        this.set('isLocationDropdownOpen', false); // Close dropdown after selection
      },
      selectUsername: function selectUsername(username) {
        this.set('newRestaurant.ownerUsername', username);
        this.set('editedRestaurant.ownerUsername', username);
        this.set('isOwnerEmailDropdownOpen', false); // Close dropdown after selection
      },
      navigateToFoodItems: function navigateToFoodItems(restaurantId) {
        this.controllerFor('application').set('restaurantId', restaurantId);
        this.transitionTo('restaurants.fooditems', restaurantId);
      },
      togglePopup: function togglePopup(restaurantId) {
        if (this.get('selectedRestaurantId') === restaurantId) {
          this.set('selectedRestaurantId', null);
        } else {
          this.set('selectedRestaurantId', restaurantId);
        }
      },
      openAddModal: function openAddModal() {
        this.set('newRestaurant', {});
        this.set('isAddModalOpen', true);
      },
      closeAddModal: function closeAddModal() {
        this.set('isAddModalOpen', false);
        this.set('isLocationDropdownOpen', false);
        this.set('isOwnerEmailDropdownOpen', false);
        this.set('newRestaurant', {});
        this.set('ownerEmailSearchQuery', '');
        this.set('locationSearchQuery', '');
      },
      openEditModal: function openEditModal(restaurant) {
        this.set('currentRestaurant', restaurant);
        this.set('editedRestaurant', Object.assign({}, restaurant));
        this.set('newRestaurant', Object.assign({}, restaurant));
        this.set('isEditModalOpen', true);
        this.set('originalOwnerUsername', restaurant.ownerUsername);
      },
      closeEditModal: function closeEditModal() {
        this.set('isEditModalOpen', false);
        this.set('editedRestaurant', null);
        this.set('ownerEmailSearchQuery', '');
        this.set('locationSearchQuery', '');
        this.set('isLocationDropdownOpen', false);
        this.set('isOwnerEmailDropdownOpen', false);
        this.set('originalOwnerUsername', null);
      },
      openDeleteModal: function openDeleteModal(restaurant) {
        this.set('currentRestaurant', restaurant);
        this.set('isDeleteModalOpen', true);
      },
      closeDeleteModal: function closeDeleteModal() {
        this.set('isDeleteModalOpen', false);
        this.set('currentRestaurant', null);
        this.set('responseMessage', null);
      },
      createRestaurant: function createRestaurant(event) {
        var _this = this;

        if (event) {
          event.preventDefault();
        }

        var newRestaurant = this.get('newRestaurant');
        var payload = {
          name: newRestaurant.name,
          location: newRestaurant.location,
          isVeg: newRestaurant.isVeg,
          ownerUsername: newRestaurant.ownerUsername
        };
        this.fetchWithAuth('http://localhost:8080/api/v1/restaurants', { method: 'POST', body: JSON.stringify(payload), headers: {} }).then(function (parsedResponse) {
          if (parsedResponse.message) {
            _this.set('responseMessage', parsedResponse.message);
            _this.set('showSuccessMessage', true);

            var restaurantId = parsedResponse.value;
            var addedRestaurant = {
              restaurantId: restaurantId,
              name: newRestaurant.name,
              location: newRestaurant.location,
              isVeg: newRestaurant.isVeg,
              rating: 0,
              ownerUsername: newRestaurant.ownerUsername
            };
            var restaurants = _this.get('restaurants');
            if (Ember.isArray(restaurants)) {
              restaurants.pushObject(addedRestaurant); // Add new restaurant to the array
            } else {
              console.error('restaurants is not an Ember Array:', restaurants);
            }
            var usernames = _this.get('usernames');
            var filteredUsernames = usernames.filter(function (user) {
              return user.username !== newRestaurant.ownerUsername;
            });
            _this.set('usernames', filteredUsernames); // Update usernames model

            _this.set('currentRestaurant', 'restaurants');
            _this.set('newRestaurant', {});

            setTimeout(function () {
              _this.set('showSuccessMessage', false);
              _this.send('closeAddModal');
            }, 1000);
          }
        }).catch(function (error) {
          _this.set('responseMessage', error);
          _this.set('showErrorMessage', true);
          setTimeout(function () {
            return _this.set('showErrorMessage', false);
          }, 1000);
        });
      },
      updateRestaurant: function updateRestaurant(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        console.log("Edited Restaurant:", this.get('editedRestaurant')); // Debug
        var restaurant = this.get('editedRestaurant');
        var oldUsername = this.get('originalOwnerUsername');

        // If changing to a veg restaurant, ensure all food items are veg
        if (restaurant.isVeg) {
          this.getFoodItemsForRestaurant(restaurant.restaurantId).then(function (foodItems) {
            // Check if there are any non-veg food items
            var nonVegFoodItems = foodItems.filter(function (item) {
              return !item.foodDetails.isVeg;
            });
            if (nonVegFoodItems.length > 0) {
              throw new Error('Cannot change to a Veg restaurant. There are non-veg food items.');
            } else {
              _this2.saveRestaurantUpdate(restaurant);
            }
          }).catch(function (error) {
            _this2.set('responseMessage', error);
            _this2.set('showErrorMessage', true);

            setTimeout(function () {
              _this2.set('showErrorMessage', false);
            }, 3000);
          });
        } else {
          // If it's not a Veg restaurant, directly proceed with the update
          this.saveRestaurantUpdate(restaurant, oldUsername);
        }
      },
      deleteRestaurant: function deleteRestaurant() {
        var _this3 = this;

        var restaurantId = this.get('currentRestaurant.restaurantId');

        this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurantId, { method: 'DELETE', headers: {} }).then(function (parsedResponse) {
          var restaurants = _this3.get('restaurants');
          var updatedRestaurants = restaurants.filter(function (r) {
            return String(r.restaurantId) !== String(restaurantId);
          });

          var usernames = _this3.get('usernames');
          usernames.pushObject({ username: _this3.get('currentRestaurant.ownerUsername'), role: 2 });

          _this3.set('restaurants', updatedRestaurants);
          _this3.set('currentRestaurant', null);
          _this3.set('responseMessage', parsedResponse.message);
          _this3.set('showSuccessMessage', true);
          setTimeout(function () {
            return _this3.set('showSuccessMessage', false);
          }, _this3.send('closeDeleteModal'), 1000);
        }).catch(function (error) {
          _this3.set('responseMessage', error);
          _this3.set('showErrorMessage', true);
          setTimeout(function () {
            return _this3.set('showErrorMessage', false);
          }, 1000);
        });
      },
      performSearch: function performSearch() {
        var _this4 = this;

        var restaurantName = this.get('restaurantName') || null;
        var type = this.get('typeFilter') || null;
        var rating = this.get('ratingFilter') || null;
        var role = this.get('userData').role;
        console.log("Role:", role);

        if (!restaurantName && !type && !rating) {
          this.set('restaurantResults', null);
          this.set('showresult', false);
          return;
        }

        var queryParams = new URLSearchParams();

        if (role === 0) {
          // Role 0: Execute search without default address
          if (restaurantName) queryParams.append('restaurantName', restaurantName);
          if (type) queryParams.append('type', type);
          if (rating) queryParams.append('ratingThreshold', rating);

          this.fetchWithAuth('http://localhost:8080/api/v1/restaurants?' + queryParams.toString(), { method: 'GET', headers: {} }).then(function (data) {
            _this4.set('restaurantResults', data.length > 0 ? data : []);
            _this4.set('showresult', true);
          }).catch(function (error) {
            _this4.set('restaurantResults', []);
            _this4.set('showresult', true);
          });
        } else if (role === 2) {
          // Role 2: Fetch and use the default address
          this.getUserDefaultAddress().then(function (userLocation) {
            if (!userLocation) {
              throw new Error('Default address is required.');
            }
            if (restaurantName) queryParams.append('restaurantName', restaurantName);
            if (type) queryParams.append('type', type);
            if (rating) queryParams.append('ratingThreshold', rating);
            queryParams.append('location', userLocation);

            var apiUrl = 'http://localhost:8080/api/v1/restaurants?' + queryParams.toString();
            return _this4.fetchWithAuth(apiUrl, { method: 'GET', headers: {} });
          }).then(function (data) {
            _this4.set('restaurantResults', data.length > 0 ? data : []);
            _this4.set('showresult', true);
          }).catch(function (error) {
            _this4.set('restaurantResults', []);
            _this4.set('showresult', true);
          });
        }
      },
      clearSearch: function clearSearch() {
        this.clearSearchState();
      },
      searchRestaurantsByFood: function searchRestaurantsByFood(foodName) {
        var _this5 = this;

        this.getUserDefaultAddress().then(function (userLocation) {
          var queryParams = new URLSearchParams();
          if (foodName) queryParams.append('foodName', foodName);
          if (userLocation) queryParams.append('location', userLocation);

          var apiUrl = 'http://localhost:8080/api/v1/restaurants?' + queryParams.toString();

          return _this5.fetchWithAuth(apiUrl, {
            method: 'GET'
          }).then(function (data) {
            _this5.set('restaurantResults', data.length > 0 ? data : []);
            _this5.set('showresult', true);
          }).catch(function (error) {
            _this5.set('restaurantResults', []);
            _this5.set('showresult', true);
          });
        }).catch(function (error) {
          _this5.set('searchError', 'Error fetching user default address.');
        });
      }
    },

    saveRestaurantUpdate: function saveRestaurantUpdate(restaurant, oldUsername) {
      var _this6 = this;

      var payload = {
        name: restaurant.name,
        location: restaurant.location,
        isVeg: restaurant.isVeg,
        ownerUsername: restaurant.ownerUsername
      };

      this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurant.restaurantId, { method: 'PUT', body: JSON.stringify(payload), headers: {} }).then(function (parsedResponse) {
        if (parsedResponse.message) {
          _this6.set('responseMessage', parsedResponse.message);
          _this6.set('showSuccessMessage', true);
        }

        _this6.set('currentRestaurant.name', payload.name);
        _this6.set('currentRestaurant.location', payload.location);
        _this6.set('currentRestaurant.isVeg', payload.isVeg);
        _this6.set('currentRestaurant.ownerUsername', payload.ownerUsername);

        if (oldUsername !== restaurant.ownerUsername) {
          // Update usernames array: add old username back, remove the new one
          var usernames = _this6.get('usernames');

          // Add old username back if it's not already in the list
          if (!usernames.find(function (user) {
            return user.username === oldUsername;
          })) {
            usernames.pushObject({ username: oldUsername, role: 2 });
          }
          _this6.set('usernames', usernames.filter(function (user) {
            return user.username !== restaurant.ownerUsername;
          }));
        }
        setTimeout(function () {
          _this6.set('showSuccessMessage', false);
          _this6.send('closeEditModal');
        }, 1000);
      }).catch(function (error) {
        _this6.set('responseMessage', error);
        _this6.set('showErrorMessage', true);
        setTimeout(function () {
          return _this6.set('showErrorMessage', false);
        }, 1000);
      });
    },
    getFoodItemsForRestaurant: function getFoodItemsForRestaurant(restaurantId) {
      return this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurantId + '/fooditems', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).then(function (data) {
        return data || [];
      }).catch(function (error) {
        console.error('Error fetching food items:', error);
        return [];
      });
    },
    getUserDefaultAddress: function getUserDefaultAddress() {
      var _this7 = this;

      var userId = this.get('user').getUserId();
      var apiUrl = 'http://localhost:8080/api/v1/users/' + userId + '/addresses?isDefault=true';

      return this.fetchWithAuth(apiUrl, {
        method: 'GET',
        headers: {}
      }).then(function (data) {
        if (data && data.isDefault) {
          return data.location;
        } else {
          alert('No default address found. Kindly add a default address to proceed.');
          _this7.get('router').transitionTo('users.addresses', userId);
        }
      }).catch(function (error) {
        console.error('Error fetching user default address:', error);
        alert('An error occurred while fetching the default address.');
        throw error;
      });
    },
    clearSearchState: function clearSearchState() {
      this.set('restaurantName', null);
      this.set('typeFilter', "");
      this.set('ratingFilter', "");
      this.set('searchError', "");
      this.set('restaurantResults', []);
      this.set('showresult', false);
    }
  });
});
define('tamil-kitchen-app/controllers/restaurants/low-stock-food', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_Authmixin.default, {
    showMessage: false,
    responseMessage: null,

    actions: {
      goBack: function goBack() {
        this.get('target').transitionTo('restaurants');
      },
      updateFoodItemStock: function updateFoodItemStock(foodItem) {
        var _this = this;

        if (!foodItem.newStock || foodItem.newStock <= 0) {
          alert('Please enter a valid stock value.');
          return;
        }

        var payload = {
          stock: parseInt(foodItem.newStock, 10)
        };
        var url = 'http://localhost:8080/api/v1/restaurants/' + foodItem.restaurantID + '/fooditems/' + foodItem.foodItemID;
        var options = {
          method: 'PUT',
          headers: {},
          body: JSON.stringify(payload)
        };

        this.fetchWithAuth(url, options).then(function (parsedResponse) {
          Ember.set(foodItem, 'stock', foodItem.newStock);
          Ember.set(foodItem, 'newStock', null);

          // Check if the updated stock is greater than 10
          if (foodItem.stock > 10) {
            var foodItems = _this.get('model.restaurant.foodItems');

            // Filter out the food item with stock > 10
            var updatedFoodItems = foodItems.filter(function (item) {
              return item.foodItemID !== foodItem.foodItemID;
            });
            _this.set('model.restaurant.foodItems', updatedFoodItems);
          }

          if (parsedResponse.message) {
            _this.set('responseMessage', parsedResponse.message);
            _this.set('showSuccessMessage', true);
          }
          setTimeout(function () {
            _this.set('showSuccessMessage', false);
          }, 1000);
        }).catch(function (error) {
          _this.set('responseMessage', error);
          _this.set('showErrorMessage', true);
          setTimeout(function () {
            _this.set('showErrorMessage', false);
          }, 1000);
        });
      }
    }
  });
});
define('tamil-kitchen-app/controllers/restaurants/orders-history', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_Authmixin.default, {
    showOrderDetails: false,
    selectedOrder: null,
    errorMessage: null,
    showSuccessMessage: false,
    showErrorMessage: false,

    user: Ember.inject.service(),

    // Computed property to access user data
    userData: Ember.computed('user.userData', function () {
      return this.get('user').getUserData();
    }),

    restaurantId: Ember.computed('model.restaurant.id', function () {
      return this.get('model.restaurant.id');
    }),

    actions: {
      viewOrderDetails: function viewOrderDetails(order) {
        this.set('selectedOrder', order);
        this.set('showOrderDetails', true);
      },
      closeModal: function closeModal() {
        this.set('showOrderDetails', false);
      },
      goBack: function goBack() {
        this.get('target').transitionTo('restaurants');
      },
      acceptOrder: function acceptOrder(order) {
        var _this = this;

        console.log('Accepting order:', order);
        var userData = this.get('userData');
        var restaurantId = this.get('restaurantId');
        if (!userData) {
          console.error('userData is undefined');
          this.set('errorMessage', 'Failed to fetch user data. Please log in again.');
          return;
        }

        var userId = userData.userId;
        var orderId = order.orderId;
        var url = 'http://localhost:8080/api/v1/restaurants/' + restaurantId + '/orders/' + orderId;

        this.fetchWithAuth(url, {
          method: 'PUT',
          body: JSON.stringify({ isCompleted: 2 }),
          headers: {}
        }).then(function (data) {
          console.log('Response data:', data); // Log the response data
          if (data.error) {
            // Log the error message
            console.error('Error from server:', data.error);
            _this.set('responseMessage', data.error);
            _this.set('showErrorMessage', true);
            setTimeout(function () {
              _this.set('showErrorMessage', false);
            }, 3000);
            return; // Don't remove the order from the list
          }

          _this.set('responseMessage', data.message);
          _this.set('showSuccessMessage', true);
          setTimeout(function () {
            _this.set('showSuccessMessage', false);
          }, 1000);

          _this.updateOrderStatus(order, 2);
        }).catch(function (error) {
          _this.set('responseMessage', error.message);
          _this.set('showErrorMessage', true);
          setTimeout(function () {
            _this.set('showErrorMessage', false);
          }, 1000);
        });
      },
      rejectOrder: function rejectOrder(order) {
        this.updateOrderStatus(order, -1); // Status -1 for Rejected
      },
      sendStatusToRoute: function sendStatusToRoute(status) {
        var _this2 = this;

        var restaurantId = this.get('restaurantId');
        var url = 'http://localhost:8080/api/v1/restaurants/' + restaurantId + '/orders?isCompleted=' + status;

        this.fetchWithAuth(url, {
          method: 'GET', headers: {}
        }).then(function (data) {
          console.log('Fetched Data:', data);
          if (Array.isArray(data)) {
            _this2.set('model.restaurant.orders', data);
          } else {
            _this2.set('model.restaurant.orders', []);
          }
        }).catch(function (error) {
          _this2.set('responseMessage', error);
          _this2.set('model.restaurant.orders', []);
        });
      }
    },

    updateOrderStatus: function updateOrderStatus(order, status) {
      var _this3 = this;

      var restaurantId = this.get('restaurantId');
      var orderId = order.orderId;
      var url = 'http://localhost:8080/api/v1/restaurants/' + restaurantId + '/orders/' + orderId;

      this.fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify({ isCompleted: status }),
        headers: {}
      }).then(function (data) {
        _this3.set('model.restaurant.orders', _this3.get('model.restaurant.orders').filter(function (o) {
          return o.orderId !== order.orderId;
        }));
        _this3.set('responseMessage', data.message);
        _this3.set('showSuccessMessage', true);
        setTimeout(function () {
          _this3.set('showSuccessMessage', false);
        }, 1000);
      }).catch(function (error) {
        console.log(error);
      });
    }
  });
});
define('tamil-kitchen-app/controllers/signup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    newUsername: '',
    newName: '',
    newMobileNo: '',
    newPassword: '',
    responseMessage: '',

    actions: {
      setNewUsername: function setNewUsername(value) {
        this.set('newUsername', value);
      },
      setNewName: function setNewName(value) {
        this.set('newName', value);
      },
      setNewMobileNo: function setNewMobileNo(value) {
        this.set('newMobileNo', value);
      },
      setNewPassword: function setNewPassword(value) {
        this.set('newPassword', value);
      },
      signup: function signup(event) {
        var _this = this;

        if (event) {
          event.preventDefault();
        }

        // Input validation
        if (!this.get('newUsername') || !this.get('newPassword') || !this.get('newName') || !this.get('newMobileNo')) {
          this.set('responseMessage', 'All fields are required.');
          return;
        }

        var password = this.get('newPassword');
        if (password && password.includes(' ')) {
          this.set('showErrorMessage', true);
          this.set('responseMessage', 'Password cannot contain spaces.');
          return;
        }

        var payload = {
          username: this.get('newUsername'),
          encryptedPwd: this.get('newPassword'),
          name: this.get('newName'),
          mobileno: this.get('newMobileNo')
        };

        fetch('http://localhost:8080/api/v1/users/signup', {
          method: 'POST',
          headers: {},
          body: JSON.stringify(payload)
        }).then(function (response) {
          return response.json().then(function (parsedResponse) {
            if (!response.ok) {
              throw parsedResponse;
            }
            return parsedResponse;
          });
        }).then(function (parsedResponse) {
          if (parsedResponse.message) {
            _this.set('showSuccessMessage', true);
            _this.set('responseMessage', parsedResponse.message);
            setTimeout(function () {
              return _this.set('showSuccessMessage', false);
            }, 1000);
          }
          _this.set('newUsername', '');
          _this.set('newPassword', '');
          _this.set('newMobileNo', '');
          _this.set('newName', '');
          _this.transitionToRoute('login');
        }).catch(function (error) {
          var errorMessage = error.error || 'Unknown error';
          var value = error.value || '';
          _this.set('showErrorMessage', true);
          _this.set('responseMessage', errorMessage + ' ' + value);
          setTimeout(function () {
            return _this.set('showErrorMessage', false);
          }, 1000);
        });
      }
    }
  });
});
define('tamil-kitchen-app/controllers/users/addresses', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    addresses: [],
    defaultAddressId: null,
    newAddress: {},
    currentAddress: null,
    responseMessage: null,
    showSuccessMessage: false,
    showErrorMessage: false,
    isDropdownOpen: false,
    isLocationDropdownOpen: false,
    searchQuery: '',
    locationSearchQuery: '',

    tamilnaduCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Ranipet', 'Virudhunagar', 'Karur', 'Nilgiris', 'Sivaganga', 'Tirupathur', 'Nagapattinam', 'Krishnagiri', 'Kanchipuram', 'Ariyalur', 'Perambalur', 'Ramanathapuram', 'Namakkal', 'Cuddalore'],

    filteredLocations: Ember.computed('locationSearchQuery', function () {
      var searchQuery = this.get('locationSearchQuery').trim().toLowerCase();
      return searchQuery === '' ? this.tamilnaduCities : this.tamilnaduCities.filter(function (city) {
        return city.toLowerCase().includes(searchQuery);
      });
    }),

    actions: {
      toggleDropdown: function toggleDropdown() {
        this.toggleProperty('isDropdownOpen');
      },
      toggleLocationDropdown: function toggleLocationDropdown() {
        this.toggleProperty('isLocationDropdownOpen');
      },
      selectLocation: function selectLocation(city) {
        if (this.isEditModalOpen) {
          this.set('editedAddress.location', city);
        } else {
          this.set('newAddress.location', city);
        }
        this.set('isLocationDropdownOpen', false); // Close dropdown after selection
      },
      openAddModal: function openAddModal() {
        this.set('newAddress', {
          address: '',
          location: ''
        });
        this.set('isAddModalOpen', true);
      },
      closeAddModal: function closeAddModal() {
        this.set('isAddModalOpen', false);
        this.set('newAddress', {});
      },
      openEditModal: function openEditModal(address) {
        this.set('currentAddress', address);
        this.set('editedAddress', Object.assign({}, address));
        this.set('isEditModalOpen', true);
      },
      closeEditModal: function closeEditModal() {
        this.set('isEditModalOpen', false);
        this.set('editedAddress', null);
      },
      openDeleteModal: function openDeleteModal(address) {
        this.set('currentAddress', address);
        this.set('isDeleteModalOpen', true);
      },
      closeDeleteModal: function closeDeleteModal() {
        this.set('isDeleteModalOpen', false);
        this.set('currentAddress', null);
      },
      addNewAddress: function addNewAddress(event) {
        var _this = this;

        if (event) {
          event.preventDefault();
        }

        var newAddress = this.get('newAddress');
        var userId = this.get('model.user.id');
        var defaultAddressExists = this.get('addresses').some(function (address) {
          return address.isDefault;
        });

        // If no default address exists, set the new address as default
        newAddress.isDefault = !defaultAddressExists;

        this.fetchWithAuth('http://localhost:8080/api/v1/users/' + userId + '/addresses', {
          method: 'POST',
          body: JSON.stringify(newAddress), headers: {}
        }).then(function (parsedResponse) {
          _this.set('responseMessage', parsedResponse.message);
          _this.set('showSuccessMessage', true);

          var addressId = parsedResponse.value;
          var addedAddress = {
            addressId: addressId,
            address: newAddress.address,
            location: newAddress.location,
            isDefault: newAddress.isDefault
          };

          _this.get('addresses').pushObject(addedAddress);
          _this.set('newAddress', {});

          setTimeout(function () {
            _this.set('showSuccessMessage', false);
            _this.send('closeAddModal');
          }, 1000);
        }).catch(function (error) {
          _this.set('responseMessage', error);
          _this.set('showErrorMessage', true);

          setTimeout(function () {
            _this.set('showErrorMessage', false);
          }, 1000);
        });
      },
      updateAddress: function updateAddress(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        var userId = this.get('model.user.id');
        var address = this.get('editedAddress');
        var payload = {
          address: address.address,
          location: address.location,
          isDefault: address.isDefault
        };
        var addressId = address.addressId;

        this.fetchWithAuth('http://localhost:8080/api/v1/users/' + userId + '/addresses/' + addressId, {
          method: 'PUT',
          body: JSON.stringify(payload), headers: {}
        }).then(function (parsedResponse) {
          _this2.set('responseMessage', parsedResponse.message);
          _this2.set('showSuccessMessage', true);

          _this2.set('currentAddress.addressId', parsedResponse.value);
          _this2.set('currentAddress.address', payload.address);
          _this2.set('currentAddress.location', payload.location);
          _this2.set('currentAddress.isDefault', payload.isDefault);

          setTimeout(function () {
            _this2.set('showSuccessMessage', false);
            _this2.send('closeEditModal');
          }, 1000);
        }).catch(function (error) {
          _this2.set('responseMessage', error);
          _this2.set('showErrorMessage', true);

          setTimeout(function () {
            _this2.set('showErrorMessage', false);
          }, 1000);
        });
      },
      deleteAddress: function deleteAddress() {
        var _this3 = this;

        var address = this.get('currentAddress');
        var addressId = address.addressId;
        var userId = this.get('model.user.id');

        this.fetchWithAuth('http://localhost:8080/api/v1/users/' + userId + '/addresses/' + addressId, {
          method: 'DELETE', headers: {}
        }).then(function (parsedResponse) {
          var addresses = _this3.get('addresses');
          var updatedAddresses = addresses.filter(function (a) {
            return String(a.addressId) !== String(addressId);
          });
          _this3.set('addresses', updatedAddresses);

          _this3.set('currentAddress', null);
          _this3.set('responseMessage', parsedResponse.message);
          _this3.set('showSuccessMessage', true);

          setTimeout(function () {
            _this3.set('showSuccessMessage', false);
            _this3.send('closeDeleteModal');
          }, 1000);
        }).catch(function (error) {
          _this3.set('responseMessage', error);
          _this3.set('showErrorMessage', true);

          setTimeout(function () {
            _this3.set('showErrorMessage', false);
            _this3.send('closeDeleteModal');
          }, 1000);
        });
      },
      setDefaultAddress: function setDefaultAddress(addressId) {
        var _this4 = this;

        var address = this.addresses.find(function (addr) {
          return addr.addressId === addressId;
        });

        if (address) {
          Ember.set(address, 'isDefault', true);
          this.get('addresses').forEach(function (addr) {
            if (addr.addressId !== addressId) {
              Ember.set(addr, 'isDefault', false);
            }
          });

          var payload = {
            address: address.address,
            location: address.location,
            isDefault: true
          };
          var userId = this.get('model.user.id');

          this.fetchWithAuth('http://localhost:8080/api/v1/users/' + userId + '/addresses/' + addressId, {
            method: 'PUT',
            body: JSON.stringify(payload), headers: {}
          }).then(function (parsedResponse) {
            _this4.set('responseMessage', parsedResponse.message);
            _this4.set('showSuccessMessage', true);

            setTimeout(function () {
              _this4.set('showSuccessMessage', false);
            }, 1000);
          }).catch(function (error) {
            _this4.set('responseMessage', error);
            _this4.set('showErrorMessage', true);

            setTimeout(function () {
              _this4.set('showErrorMessage', false);
            }, 1000);
          });
        } else {
          console.error('Address not found');
        }
      }
    }
  });
});
define('tamil-kitchen-app/controllers/users/cart', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend(_Authmixin.default, {
        showOrderDetails: false,
        selectedOrder: null,
        errorMessage: null,
        showEditModal: false,
        showCheckoutModal: false,
        finalPrice: null,
        totalAmount: null,
        discountedPrice: null,
        discount: null,
        serviceTax: null,
        deliveryFee: null,

        restaurantId: Ember.computed('model.restaurant.id', function () {
            return this.get('model.restaurant.id');
        }),

        user: Ember.inject.service(),

        userData: Ember.computed('user.userData', function () {
            return this.get('user').getUserData();
        }),

        actions: {
            goBack: function goBack() {
                window.history.back();
            },
            closeModal: function closeModal() {
                this.set('showCheckoutModal', false);
            },
            proceedToPay: function proceedToPay(order) {
                var totalAmount = 0;
                order.orderItems.forEach(function (item) {
                    totalAmount += item.quantity * item.price;
                });

                var discount = totalAmount > 500 ? totalAmount * 0.30 : 0;
                var discountedPrice = totalAmount - discount;
                var serviceTax = discountedPrice * 0.10;
                var deliveryFee = 30;
                var finalPrice = discountedPrice + serviceTax + deliveryFee;

                this.setProperties({
                    selectedOrder: order,
                    showCheckoutModal: true,
                    finalPrice: finalPrice,
                    totalAmount: totalAmount,
                    discountedPrice: discountedPrice,
                    discount: discount,
                    serviceTax: serviceTax,
                    deliveryFee: deliveryFee
                });
            },
            confirmPayment: function confirmPayment(order) {
                var _this = this;

                var orderItems = order.orderItems.map(function (item) {
                    return {
                        foodItemId: item.foodItemId,
                        quantity: item.quantity
                    };
                });

                var payload = {
                    restaurantId: order.restaurantId,
                    orderItems: orderItems
                };

                var userId = this.get('userData.userId');
                var restaurantId = order.restaurantId;

                // Step 1:  Fetch user's default address
                this.fetchWithAuth('http://localhost:8080/api/v1/users/' + userId + '/addresses?isDefault=true', {
                    method: 'GET', headers: {}
                }).then(function (userAddress) {
                    // Step 3: Fetch restaurant details
                    return _this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurantId, {
                        method: 'GET', headers: {}
                    }).then(function (restaurantData) {
                        // Step 4: Compare locations
                        if (userAddress.location === restaurantData.location) {
                            // Proceed with payment if locations match
                            var updatePayload = { isCompleted: 1 };

                            _this.fetchWithAuth('http://localhost:8080/api/v1/users/' + userId + '/orders/' + order.orderId, {
                                method: 'PUT',
                                body: JSON.stringify(updatePayload), headers: {}
                            }).then(function (data) {
                                if (data.message === "Order updated successfully") {
                                    var orders = _this.get('orders');
                                    var updatedOrders = orders.filter(function (a) {
                                        return String(a.orderId) !== String(order.orderId);
                                    });
                                    _this.set('orders', updatedOrders);
                                    _this.set('responseMessage', data.message);
                                    _this.set('showSuccessMessage', "Order placed successfully!");
                                }
                                setTimeout(function () {
                                    _this.set('showSuccessMessage', false);
                                    _this.set('showCheckoutModal', false);
                                }, 1000);
                            }).catch(function (error) {
                                _this.set('responseMessage', error);
                                _this.set('showErrorMessage', true);
                                setTimeout(function () {
                                    _this.set('showErrorMessage', false);
                                }, 3000);
                            });
                        } else {
                            alert("Restaurant unavailable in your current location.");
                        }
                    });
                });
            },
            removeCartOrder: function removeCartOrder(order) {
                var _this2 = this;

                var userId = this.get('userData.userId');
                var orderId = order.orderId;

                this.fetchWithAuth('http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId, {
                    method: 'DELETE', headers: {}
                }).then(function (response) {
                    if (response.message === "Cart deleted successfully.") {
                        var orders = _this2.get('orders');
                        var updatedOrders = orders.filter(function (a) {
                            return String(a.orderId) !== String(orderId);
                        });
                        _this2.set('orders', updatedOrders);

                        _this2.set('responseMessage', response.message);
                        _this2.set('showSuccessMessage', true);
                        setTimeout(function () {
                            _this2.set('showSuccessMessage', false);
                        }, 1000);
                    } else {
                        _this2.set('responseMessage', response.error || "Failed to delete cart.");
                        _this2.set('showErrorMessage', true);
                    }
                }).catch(function (error) {
                    _this2.set('responseMessage', "Failed to delete cart.");
                    _this2.set('showErrorMessage', true);
                    setTimeout(function () {
                        _this2.set('showErrorMessage', false);
                    }, 3000);
                });
            },
            updateOrderItem: function updateOrderItem(item) {
                var _this3 = this;

                var userId = this.get('userData.userId');
                var orderId = item.orderId;
                var orderItemId = item.orderItemId;

                if (!item.quantity || item.quantity <= 0) {
                    alert('Please enter a valid quatity!');
                    return;
                }

                var payload = { quantity: parseInt(item.quantity) };
                var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId + '/orderitems/' + orderItemId;
                var options = {
                    method: 'PUT',
                    headers: {},
                    body: JSON.stringify(payload)
                };

                this.fetchWithAuth(url, options).then(function (parsedResponse) {
                    if (parsedResponse.message) {
                        _this3.set('responseMessage', parsedResponse.message);
                        _this3.set('showSuccessMessage', true);
                    }
                    setTimeout(function () {
                        _this3.set('showSuccessMessage', false);
                    }, 1000);
                }).catch(function (error) {
                    _this3.set('responseMessage', error);
                    _this3.set('showErrorMessage', true);
                    setTimeout(function () {
                        _this3.set('showErrorMessage', false);
                    }, 1000);
                });
            },
            deleteOrderItem: function deleteOrderItem(item) {
                var _this4 = this;

                var userId = this.get('userData.userId');
                var orderId = item.orderId;
                var orderItemId = item.orderItemId;

                var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId + '/orderitems/' + orderItemId;

                this.fetchWithAuth(url, { method: 'DELETE', headers: {} }).then(function (response) {
                    if (response.message === "Cart item deleted successfully.") {
                        var orders = _this4.get('orders');

                        var updatedOrders = orders.map(function (order) {
                            if (order.orderId === orderId) {
                                return Object.assign({}, order, {
                                    orderItems: order.orderItems.filter(function (i) {
                                        return i.orderItemId !== orderItemId;
                                    })
                                });
                            }
                            return order;
                        });
                        // Filter out the order if it has no items left
                        updatedOrders = updatedOrders.filter(function (order) {
                            return order.orderItems.length > 0;
                        });
                        _this4.set('orders', updatedOrders);

                        _this4.set('responseMessage', response.message);
                        _this4.set('showSuccessMessage', true);
                        setTimeout(function () {
                            _this4.set('showSuccessMessage', false);
                        }, 1000);
                    } else {
                        _this4.set('responseMessage', response.error || "Failed to delete item.");
                        _this4.set('showErrorMessage', true);
                        setTimeout(function () {
                            _this4.set('showErrorMessage', false);
                        }, 3000);
                    }
                }).catch(function (error) {
                    console.error("Error deleting order item:", error);
                    _this4.set('responseMessage', "Failed to delete item.");
                    _this4.set('showErrorMessage', true);
                    setTimeout(function () {
                        _this4.set('showErrorMessage', false);
                    }, 3000);
                });
            }
        }
    });
});
define('tamil-kitchen-app/controllers/users/order-history', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend(_Authmixin.default, {
        user: Ember.inject.service(),

        userData: Ember.computed('user.userData', function () {
            return this.get('user').getUserData();
        }),

        actions: {
            submitRating: function submitRating(order) {
                var _this = this;

                var newRating = parseFloat(document.getElementById('rating-' + order.orderId).value);
                newRating = parseFloat(newRating.toFixed(1));

                if (newRating && newRating >= 1 && newRating <= 5) {
                    var payload = {
                        rating: newRating
                    };
                    var userId = this.get('userData.userId');
                    var orderId = order.orderId;

                    var url = 'http://localhost:8080/api/v1/users/' + userId + '/orders/' + orderId;
                    this.fetchWithAuth(url, {
                        method: 'PUT',
                        body: JSON.stringify(payload), headers: {}
                    }).then(function (data) {
                        Ember.set(order, 'rating', newRating);
                        Ember.set(order, 'newRating', null);
                        _this.set('responseMessage', "Rating Submitted successfully");
                        _this.set('showSuccessMessage', true);
                        setTimeout(function () {
                            _this.set('showSuccessMessage', false);
                        }, 1000);
                    }).catch(function (error) {
                        _this.set('errorMessage', error || 'Failed to submit rating. Please try again.');
                    });
                } else {
                    this.set('errorMessage', 'Please enter a valid rating between 1 and 5.');
                }
            }
        }
    });
});
define('tamil-kitchen-app/controllers/users/profile', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend(_Authmixin.default, {
        isChangePasswordModalOpen: false,
        responseMessage: null,
        showSuccessMessage: false,
        showErrorMessage: false,
        oldPassword: '',
        newPassword: '',

        actions: {
            openChangePasswordModal: function openChangePasswordModal() {
                this.set('isChangePasswordModalOpen', true);
            },
            closeChangePasswordModal: function closeChangePasswordModal() {
                this.set('isChangePasswordModalOpen', false);
                this.set('oldPassword', '');
                this.set('newPassword', '');
            },
            changePassword: function changePassword(event) {
                var _this = this;

                if (event) {
                    event.preventDefault();
                }

                var payload = {
                    oldPassword: this.get('oldPassword'),
                    newPassword: this.get('newPassword')
                };

                var userId = this.get('model.profile.userId');
                var url = 'http://localhost:8080/api/v1/users/' + userId;

                this.fetchWithAuth(url, {
                    method: 'PUT',
                    body: JSON.stringify(payload), headers: {}
                }).then(function (parsedResponse) {
                    if (parsedResponse.message) {
                        _this.set('responseMessage', parsedResponse.message);
                        _this.set('showSuccessMessage', true);
                    }
                    setTimeout(function () {
                        _this.set('showSuccessMessage', false);
                        _this.send('closeChangePasswordModal');
                    }, 1000);
                }).catch(function (error) {
                    _this.set('responseMessage', error);
                    _this.set('showErrorMessage', true);
                    setTimeout(function () {
                        _this.set('showErrorMessage', false);
                    }, 1500);
                });
            }
        }
    });
});
define('tamil-kitchen-app/helpers/and', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.helper(function and(params) {
    return params.every(Boolean);
  });
});
define('tamil-kitchen-app/helpers/app-version', ['exports', 'tamil-kitchen-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('tamil-kitchen-app/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
define('tamil-kitchen-app/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectIsGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('tamil-kitchen-app/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectIsSelected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('tamil-kitchen-app/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectTrueStringIfPresent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('tamil-kitchen-app/helpers/eq', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.eq = eq;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function eq(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return a === b;
  }

  exports.default = Ember.Helper.helper(eq);
});
define('tamil-kitchen-app/helpers/format-date', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatDate = formatDate;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function formatDate(_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        timestamp = _ref2[0];

    var date = new Date(timestamp * 1000); //Timestamp is in seconds
    return date.toLocaleDateString();
  }

  exports.default = Ember.Helper.helper(formatDate);
});
define('tamil-kitchen-app/helpers/format-number', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.formatNumber = formatNumber;

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    function formatNumber(_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            number = _ref2[0];

        if (number === null || number === undefined) {
            return '';
        }
        return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 1 }).format(number);
    }

    exports.default = Ember.Helper.helper(formatNumber);
});
define('tamil-kitchen-app/helpers/gt', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = Ember.Helper.helper(function gt(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        left = _ref2[0],
        right = _ref2[1];

    return left > right;
  });
});
define('tamil-kitchen-app/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
define('tamil-kitchen-app/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
define('tamil-kitchen-app/helpers/is-empty', ['exports', 'ember-truth-helpers/helpers/is-empty'], function (exports, _isEmpty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
define('tamil-kitchen-app/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('tamil-kitchen-app/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
define('tamil-kitchen-app/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
define('tamil-kitchen-app/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
define('tamil-kitchen-app/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
define('tamil-kitchen-app/helpers/or', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.or = or;
    function or(params) {
        return params.some(Boolean);
    }

    exports.default = Ember.Helper.helper(or);
});
define('tamil-kitchen-app/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
define('tamil-kitchen-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('tamil-kitchen-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('tamil-kitchen-app/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
define('tamil-kitchen-app/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
define('tamil-kitchen-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'tamil-kitchen-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('tamil-kitchen-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('tamil-kitchen-app/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('tamil-kitchen-app/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
define('tamil-kitchen-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('tamil-kitchen-app/initializers/export-application-global', ['exports', 'tamil-kitchen-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('tamil-kitchen-app/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('tamil-kitchen-app/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('tamil-kitchen-app/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("tamil-kitchen-app/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('tamil-kitchen-app/mixins/Authmixin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Mixin.create({
    user: Ember.inject.service(),
    isSessionExpired: false,

    fetchWithAuth: function fetchWithAuth(url) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var token = localStorage.getItem('jwtToken');
      var refreshToken = localStorage.getItem('refreshToken');

      options.headers = Object.assign({}, options.headers || {}, {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Refresh-Token': refreshToken
      });

      return fetch(url, options).then(function (response) {
        return _this.handleResponse(response);
      }).catch(function (error) {
        throw error;
      });
    },
    handleResponse: function handleResponse(response) {
      if (response.ok) {
        var newAccessToken = response.headers.get('New-Access-Token');

        if (newAccessToken) {
          localStorage.setItem('jwtToken', newAccessToken);
        }
        return response.json();
      }

      if (response.status === 401 && !this.isSessionExpired) {
        this.isSessionExpired = true; // Set flag to true to prevent further alerts
        var router = Ember.getOwner(this).lookup('router:main');
        alert("Session Expired. Kindly Login to Proceed");
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refreshToken');
        router.transitionTo('login');
      }

      if (response.status === 403) {
        var _router = Ember.getOwner(this).lookup('router:main');
        _router.transitionTo('access-denied');

        throw new Error('forbidden');
      }

      return response.json().then(function (errorData) {
        console.log(errorData);
        if (errorData.value) {
          var _errorMessage = '' + errorData.error + errorData.value || "Error fetching data";
          throw new Error(_errorMessage);
        }
        var errorMessage = errorData.error || "Error fetching data";
        throw new Error(errorMessage);
      });
    }
  });
});
define('tamil-kitchen-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('tamil-kitchen-app/router', ['exports', 'tamil-kitchen-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('foodDetails');
    this.route('login');
    this.route('signup');
    this.route('access-denied');
    this.route('restaurants', function () {
      this.route('fooditems', { path: '/:restaurantId/fooditems' });
      this.route('orders-history', { path: '/:restaurantId/orders-history' });
      this.route('low-stock-food', { path: '/:restaurantId/low-stock-food' });
    });

    this.route('users', function () {
      this.route('addresses', { path: '/:userid/addresses' });
      this.route('profile', { path: '/:userid/profile' });
      this.route('cart', { path: '/:userid/cart' });
      this.route('order-history', { path: '/:userid/order-history' });
    });
    // Define a catch-all route at the bottom
    this.route('not-found', { path: '/*path' });
  });

  exports.default = Router;
});
define('tamil-kitchen-app/routes/access-denied', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    user: Ember.inject.service(),
    model: function model() {
      var user = this.get('user').getUserData();
      return {
        role: user.role
      };
    },

    actions: {
      goToAdminDashboard: function goToAdminDashboard() {
        this.transitionTo('restaurants');
      },
      goToResOwnerDashboard: function goToResOwnerDashboard() {
        var restaurantId = this.get('user').getRestaurantId();
        if (restaurantId) {
          this.transitionTo('restaurants.fooditems', restaurantId);
        } else {
          console.error("Restaurant ID is not available");
        }
      },
      goToCustomerDashboard: function goToCustomerDashboard() {
        var userId = this.get('user').getUserId();
        if (userId) {
          this.transitionTo('users.addresses', userId);
        } else {
          console.error("User ID is not available");
        }
      }
    }
  });
});
define('tamil-kitchen-app/routes/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('tamil-kitchen-app/routes/food-details', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),
    beforeModel: function beforeModel() {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied');
      }
    },
    model: function model() {
      return this.getFoodDetails();
    },
    getFoodDetails: function getFoodDetails() {
      var url = 'http://localhost:8080/api/v1/fooddetails';
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (response) {
        return response;
      }).catch(function (error) {
        return [];
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set('foodDetails', model);
    }
  });
});
define('tamil-kitchen-app/routes/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('tamil-kitchen-app/routes/logout', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('tamil-kitchen-app/routes/not-found', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    user: Ember.inject.service(),

    model: function model() {
      var user = this.get('user').getUserData();
      return {
        role: user.role
      };
    },

    actions: {
      goToAdminDashboard: function goToAdminDashboard() {
        this.transitionTo('restaurants');
      },
      goToResOwnerDashboard: function goToResOwnerDashboard() {
        var restaurantId = this.get('user').getRestaurantId();
        if (restaurantId) {
          this.transitionTo('restaurants.fooditems', restaurantId);
        } else {
          console.error("Restaurant ID is not available");
        }
      },
      goToCustomerDashboard: function goToCustomerDashboard() {
        var userId = this.get('user').getUserId();
        if (userId) {
          this.transitionTo('users.addresses', userId);
        } else {
          console.error("User ID is not available");
        }
      }
    }
  });
});
define('tamil-kitchen-app/routes/restaurants', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('tamil-kitchen-app/routes/restaurants/fooditems', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = Ember.Route.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),

    beforeModel: function beforeModel() {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied');
      }
    },
    model: function model(params) {
      var restaurantId = params.restaurantId;

      var role = this.get('user').getUserRole();

      return Promise.all([this.getFoodItemsForRestaurant(restaurantId, role), this.getFoodDetails(restaurantId, role), this.getRestaurantDetails(restaurantId) //to display only veg food details
      ]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
            foodItems = _ref2[0],
            foodDetails = _ref2[1],
            restaurantDetails = _ref2[2];

        var filteredFoodDetails = foodDetails;
        if (restaurantDetails.isVeg) {
          filteredFoodDetails = foodDetails.filter(function (item) {
            return item.isVeg === true;
          }); // Only veg items for veg restaurants
        }
        return {
          restaurant: {
            id: restaurantId,
            foodItems: foodItems,
            isVeg: restaurantDetails.isVeg
          },
          foodDetailsList: filteredFoodDetails
        };
      }).catch(function (error) {
        console.error('Error loading data:', error);
        return { restaurant: { id: restaurantId, foodItems: [], isVeg: false }, foodDetailsList: [] };
      });
    },
    getFoodItemsForRestaurant: function getFoodItemsForRestaurant(restaurantId, role) {
      var _this = this;

      return this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurantId + '/fooditems', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (data) {
        return data || [];
      }).catch(function (error) {
        if (error.message === 'Restaurant does not exist.') {
          var router = Ember.getOwner(_this).lookup('router:main');
          alert("The specified restaurant does not exist. Redirecting to the dashboard.");
          router.transitionTo('restaurants'); // Transition to the dashboard
        } else {
          console.error('Error fetching food items:', error);
        }
        return [];
      });
    },
    getFoodDetails: function getFoodDetails(restaurantId, role) {
      return this.fetchWithAuth('http://localhost:8080/api/v1/fooddetails', {
        method: 'GET', headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (data) {
        return data || [];
      }).catch(function (error) {
        console.error('Error fetching food details:', error);
        return [];
      });
    },
    getRestaurantDetails: function getRestaurantDetails(restaurantId) {
      return this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurantId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).then(function (data) {
        return data || {};
      }).catch(function (error) {
        console.error('Error fetching restaurant details:', error);
        return { isVeg: false };
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);

      controller.set('foodItems', model.restaurant.foodItems);
      controller.set('foodDetailsList', model.foodDetailsList); // Pass all filtered food items
      controller.set('restaurantId', model.restaurant.id);

      var isVegRestaurant = model.restaurant.isVeg;
      controller.set('isVegRestaurant', isVegRestaurant);
    },
    afterModel: function afterModel() {
      window.scrollTo(0, 0); // Scrolls to the top after any route change
    }
  });
});
define('tamil-kitchen-app/routes/restaurants/index', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = Ember.Route.extend(_Authmixin.default, {

    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),

    beforeModel: function beforeModel() {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied'); // Redirect to login if access is denied
      }
    },
    model: function model() {
      var _this = this;

      var role = this.get('user').getUserRole();
      var userId = this.get('user').getUserId();

      if (role === 0) {
        return Promise.all([this.getRestaurants(), this.getUsernames()]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              restaurants = _ref2[0],
              usernames = _ref2[1];

          return { restaurants: restaurants, usernames: usernames };
        }).catch(function (error) {
          console.error('Error fetching data for role 0:', error);
          return { restaurants: [], usernames: [] };
        });
      } else if (role === 2) {
        return this.getUserDefaultAddress().then(function (location) {
          return _this.getRestaurants(location).then(function (restaurants) {
            return { restaurants: restaurants };
          }).catch(function (error) {
            console.error('Error fetching restaurants by location:', error);
            return { restaurants: [] };
          });
        }).catch(function (error) {
          if (error.message !== 'Unauthorized') {
            alert("No Default Address Found! Add Address to proceed.");
          }
          _this.transitionTo('users.addresses', userId);
        });
      }
    },
    getRestaurants: function getRestaurants() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var apiUrl = 'http://localhost:8080/api/v1/restaurants';

      if (location) {
        apiUrl += '?location=' + encodeURIComponent(location);
      }

      return this.fetchWithAuth(apiUrl, { method: 'GET' }).then(function (data) {
        return data;
      }).catch(function (error) {
        throw error;
      });
    },
    getUsernames: function getUsernames() {
      return this.fetchWithAuth('http://localhost:8080/api/v1/users', { method: 'GET' }).then(function (data) {
        return data;
      }).catch(function (error) {
        throw error;
      });
    },
    getUserDefaultAddress: function getUserDefaultAddress() {
      var userId = this.get('user').getUserId();
      var apiUrl = 'http://localhost:8080/api/v1/users/' + userId + '/addresses?isDefault=true';
      return this.fetchWithAuth(apiUrl, { method: 'GET', headers: {} }).then(function (data) {
        return data.location;
      }).catch(function (error) {
        throw error;
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set('restaurants', model.restaurants);
      controller.set('usernames', model.usernames);
    }
  });
});
define('tamil-kitchen-app/routes/restaurants/low-stock-food', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),
    beforeModel: function beforeModel(transition) {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied'); // Redirect to login if access is denied
      }
    },
    model: function model(params) {
      var restaurantId = params.restaurantId;

      var role = this.get('user').getUserRole();
      return this.getFoodItemsForRestaurant(restaurantId, role).then(function (foodItems) {
        return {
          restaurant: {
            id: restaurantId,
            foodItems: foodItems || []
          }
        };
      }).catch(function (error) {
        return {
          restaurant: {
            id: restaurantId,
            foodItems: [],
            error: error.message
          }
        };
      });
    },
    getFoodItemsForRestaurant: function getFoodItemsForRestaurant(restaurantId, role) {
      var _this = this;

      return this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurantId + '/fooditems?stockThreshold=10', { method: 'GET', headers: {} }).then(function (data) {
        return data;
      }).catch(function (error) {
        if (error.message === 'Restaurant does not exist.') {
          var router = Ember.getOwner(_this).lookup('router:main');
          alert("The specified restaurant does not exist. Redirecting to the dashboard.");
          router.transitionTo('restaurants'); // Transition to the dashboard
        } else {
          console.error('Error fetching food items:', error);
        }
        return [];
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set('foodItems', model);
    }
  });
});
define('tamil-kitchen-app/routes/restaurants/orders-history', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),
    beforeModel: function beforeModel(transition) {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied'); // Redirect to login if access is denied
      }
    },
    model: function model(params) {
      var restaurantId = params.restaurantId;

      var role = this.get('user').getUserRole();
      return this.getOrdersForRestaurant(restaurantId, role).then(function (orders) {
        console.log("Fetched Orders:", orders);

        return {
          restaurant: {
            id: restaurantId,
            orders: orders || []
          }
        };
      }).catch(function (error) {
        return {
          restaurant: {
            id: restaurantId,
            orders: [],
            error: error.message
          }
        };
      });
    },
    getOrdersForRestaurant: function getOrdersForRestaurant(restaurantId, role) {
      var _this = this;

      return this.fetchWithAuth('http://localhost:8080/api/v1/restaurants/' + restaurantId + '/orders?isCompleted=placed', { method: 'GET', headers: {} }).then(function (data) {
        return data;
      }).catch(function (error) {
        if (error.message === 'Restaurant does not exist.') {
          var router = Ember.getOwner(_this).lookup('router:main');
          alert("The specified restaurant does not exist. Redirecting to the dashboard.");
          router.transitionTo('restaurants'); // Transition to the dashboard
        } else {
          console.error('Error fetching food items:', error);
        }
        return [];
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set('orders', model.restaurant.orders);
    }
  });
});
define('tamil-kitchen-app/routes/signup', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('tamil-kitchen-app/routes/users/addresses', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),
    beforeModel: function beforeModel() {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied');
      }
    },
    model: function model(params) {
      var userid = params.userid;

      var role = this.get('user').getUserRole();

      return this.getAddressesForUser(userid, role).then(function (addresses) {
        return {
          user: {
            id: userid,
            addresses: addresses || []
          }
        };
      }).catch(function (error) {
        console.error('Error fetching addresses:', error);
        return {
          user: {
            id: userid,
            addresses: [],
            error: error.message
          }
        };
      });
    },
    getAddressesForUser: function getAddressesForUser(userid, role) {
      var url = 'http://localhost:8080/api/v1/users/' + userid + '/addresses';
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (data) {
        return data;
      }).catch(function (error) {
        throw error;
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set('addresses', model.user.addresses);
    },


    actions: {
      refreshModel: function refreshModel() {
        this.refresh();
      }
    }
  });
});
define('tamil-kitchen-app/routes/users/cart', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),
    beforeModel: function beforeModel(transition) {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied'); // Redirect to login if access is denied
      }
    },
    model: function model(params) {
      var userid = params.userid;

      var role = this.get('user').getUserRole();

      console.log('Fetching cart orders for userid:', userid);

      return this.getOrdersForUser(userid, role).then(function (orders) {
        console.log("Fetched Orders:", orders);
        return {
          user: {
            id: userid,
            orders: orders || []
          }
        };
      }).catch(function (error) {
        console.error('Error fetching orders:', error);
        return {
          user: {
            id: userid,
            orders: [],
            error: error.message
          }
        };
      });
    },
    getOrdersForUser: function getOrdersForUser(userid, role) {
      var url = 'http://localhost:8080/api/v1/users/' + userid + '/orders?isCompleted=cart';
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (data) {
        return data;
      }).catch(function (error) {
        throw error;
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.set('orders', model.user.orders);
      controller.set('orderItems', model.user.orders.orderItems);
    }
  });
});
define('tamil-kitchen-app/routes/users/order-history', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),
    beforeModel: function beforeModel(transition) {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied'); // Redirect to login if access is denied
      }
    },
    model: function model(params) {
      var userid = params.userid;

      var role = this.get('user').getUserRole();

      console.log('Fetching order history for userid:', userid);

      return this.getOrdersForUser(userid, role).then(function (orders) {
        console.log("Fetched Orders:", orders);
        return {
          user: {
            id: userid,
            orders: orders || []
          }
        };
      }).catch(function (error) {
        console.error('Error fetching orders:', error);
        return {
          user: {
            id: userid,
            orders: [],
            error: error.message
          }
        };
      });
    },
    getOrdersForUser: function getOrdersForUser(userid, role) {
      var url = 'http://localhost:8080/api/v1/users/' + userid + '/orders';
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (data) {
        return data;
      }).catch(function (error) {
        throw error;
      });
    }
  });
});
define('tamil-kitchen-app/routes/users/profile', ['exports', 'tamil-kitchen-app/mixins/Authmixin'], function (exports, _Authmixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = Ember.Route.extend(_Authmixin.default, {
    user: Ember.inject.service(),
    accessControl: Ember.inject.service(),
    beforeModel: function beforeModel(transition) {
      var routeName = this.routeName;

      if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
        this.transitionTo('access-denied'); // Redirect to login if access is denied
      }
    },
    model: function model(params) {
      var userid = params.userid;


      return Promise.all([this.getUserProfile(userid), this.getDefaultAddress(userid)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            profile = _ref2[0],
            address = _ref2[1];

        return {
          profile: profile,
          defaultAddress: address || null
        };
      }).catch(function (error) {
        console.error('Error fetching data:', error);
        throw error;
      });
    },
    getUserProfile: function getUserProfile(userid) {
      var url = 'http://localhost:8080/api/v1/users/' + userid;
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (profile) {
        return profile;
      }).catch(function (error) {
        throw error;
      });
    },
    getDefaultAddress: function getDefaultAddress(userid) {
      var url = 'http://localhost:8080/api/v1/users/' + userid + '/addresses?isDefault=true';
      var options = { method: 'GET', headers: {} };

      return this.fetchWithAuth(url, options).then(function (address) {
        return address;
      }).catch(function (error) {
        return [];
      });
    }
  });
});
define('tamil-kitchen-app/services/access-control', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    user: Ember.inject.service(),

    accessControl: {
      foodDetails: [0],
      login: [0, 1, 2],
      signup: [0, 1, 2],
      'restaurants.index': [0, 2],
      'restaurants.fooditems': [0, 1, 2],
      'restaurants.orders-history': [0, 1],
      'restaurants.low-stock-food': [0, 1],
      users: [2],
      'users.addresses': [2],
      'users.profile': [2],
      'users.cart': [2],
      'users.order-history': [2]
    },

    canAccessRoute: function canAccessRoute(routeName) {

      this.get('user').loadToken();
      var userRole = this.get('user').getUserRole();
      var allowedRoles = this.get('accessControl');
      var rolesForRoute = allowedRoles[routeName];
      return rolesForRoute.includes(userRole);
    }
  });
});
define('tamil-kitchen-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('tamil-kitchen-app/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _textMeasurer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
});
define('tamil-kitchen-app/services/user', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    jwtToken: null,
    tokenLoaded: Ember.computed.alias('jwtToken'), // Alias to detect changes

    loadToken: function loadToken() {
      var token = localStorage.getItem('jwtToken');
      if (token) {
        this.set('jwtToken', token);
      } else {
        this.set('jwtToken', null);
      }
    },
    decodeJWT: function decodeJWT(token) {
      if (!token) {
        return null;
      }
      var payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    },
    getUserId: function getUserId() {
      var token = this.get('jwtToken');
      var decoded = this.decodeJWT(token);
      return decoded ? decoded.userId : null;
    },
    getUserRole: function getUserRole() {
      var token = this.get('jwtToken');
      var decoded = this.decodeJWT(token);
      return decoded ? decoded.role : null;
    },
    getRestaurantId: function getRestaurantId() {
      var token = this.get('jwtToken');
      var decoded = this.decodeJWT(token);
      return decoded ? decoded.restaurantId : null;
    },
    getUserData: function getUserData() {
      this.loadToken(); // Ensure token is loaded
      var token = this.get('jwtToken');
      return this.decodeJWT(token);
    }
  });
});
define("tamil-kitchen-app/templates/access-denied", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6kc24Phh", "block": "{\"statements\":[[1,[33,[\"log\"],[[28,[\"model\"]]],null],false],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"page-container\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"Access Denied\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"role\"]],0],null]],null,{\"statements\":[[0,\"      \"],[11,\"p\",[]],[13],[0,\"You do not have access to this page. As an admin, you can navigate to the admin dashboard instead.\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"goToAdminDashboard\"]],[13],[0,\"Go to Dashboard\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"role\"]],1],null]],null,{\"statements\":[[0,\"      \"],[11,\"p\",[]],[13],[0,\"You do not have access to this page. As a restaurant owner, please go to your dashboard for your options.\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"goToResOwnerDashboard\"]],[13],[0,\"Go to Dashboard\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"role\"]],2],null]],null,{\"statements\":[[0,\"      \"],[11,\"p\",[]],[13],[0,\"You do not have access to this page. As a customer, you can return to your dashboard for available actions.\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"goToCustomerDashboard\"]],[13],[0,\"Go to Dashboard\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"p\",[]],[13],[0,\"You do not have access to this page. As a guest, you can return to the home page.\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"goUserDashboard\"]],[13],[0,\"Go Home\"],[14],[0,\"\\n    \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"loading\"],[13],[0,\"Loading your access details, please wait...\"],[14],[0,\" \\n\"]],\"locals\":[]}],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/access-denied.hbs" } });
});
define("tamil-kitchen-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+cjJunGV", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/application.hbs" } });
});
define("tamil-kitchen-app/templates/components/orders-component", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pf9f2ac3", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"orders\"],[13],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"errorMessage\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\" \"],[4,\" Display error message if any \"],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"orders\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"orders\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Order ID:\"],[14],[0,\" \"],[1,[28,[\"order\",\"orderId\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"User ID:\"],[14],[0,\" \"],[1,[28,[\"order\",\"userId\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],0],null]],null,{\"statements\":[[0,\"          \"],[11,\"strong\",[]],[13],[0,\"Added to cart:\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"strong\",[]],[13],[0,\"Order Date:\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[1,[33,[\"format-date\"],[[28,[\"order\",\"orderDate\"]]],null],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Status:\"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],0],null]],null,{\"statements\":[[0,\"          In Cart\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],1],null]],null,{\"statements\":[[0,\"          Placed\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],2],null]],null,{\"statements\":[[0,\"          Accepted\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],-1],null]],null,{\"statements\":[[0,\"          Rejected\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          Unknown\\n          \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],2],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Rating:\"],[14],[0,\" \"],[1,[33,[\"if\"],[[28,[\"order\",\"rating\"]],[33,[\"format-number\"],[[28,[\"order\",\"rating\"]]],null],\"No Rating\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Restaurant Name:\"],[14],[0,\" \"],[1,[28,[\"order\",\"restaurantName\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"unless\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],0],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Address:\"],[14],[0,\" \"],[1,[28,[\"order\",\"address\"]],false],[0,\", \"],[1,[28,[\"order\",\"location\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n        \"],[4,\" Display order items below the order details \"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"order\",\"orderItems\",\"length\"]]],null,{\"statements\":[[0,\"        \"],[11,\"table\",[]],[15,\"class\",\"order-items-table\"],[13],[0,\"\\n          \"],[11,\"thead\",[]],[13],[0,\"\\n            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"th\",[]],[13],[0,\"Food Item Name\"],[14],[0,\"\\n              \"],[11,\"th\",[]],[13],[0,\"Quantity\"],[14],[0,\"\\n              \"],[11,\"th\",[]],[13],[0,\"Price\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"order\",\"orderItems\"]]],null,{\"statements\":[[0,\"            \"],[11,\"tr\",[]],[13],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"foodItemName\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"quantity\"]],false],[14],[0,\"\\n              \"],[11,\"td\",[]],[13],[1,[33,[\"format-number\"],[[28,[\"item\",\"price\"]]],null],false],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"p\",[]],[13],[0,\"No items found for this order.\"],[14],[0,\"\\n\"]],\"locals\":[]}],[6,[\"if\"],[[33,[\"and\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null],[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],2],null],[33,[\"eq\"],[[28,[\"order\",\"rating\"]],0],null]],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[16,\"for\",[34,[\"rating-\",[28,[\"order\",\"orderId\"]]]]],[13],[11,\"strong\",[]],[13],[0,\"Rate this Order:\"],[14],[14],[0,\"\\n          \"],[11,\"input\",[]],[15,\"type\",\"number\"],[16,\"id\",[34,[\"rating-\",[28,[\"order\",\"orderId\"]]]]],[16,\"value\",[28,[\"order\",\"newRating\"]],null],[15,\"min\",\"1\"],[15,\"max\",\"5\"],[15,\"step\",\"0.5\"],[13],[14],[0,\"\\n          \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"submitRating\",[28,[\"order\"]]]],[13],[0,\"Submit\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"and\"],[[33,[\"or\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null],[33,[\"eq\"],[[28,[\"userData\",\"role\"]],1],null]],null],[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],1],null]],null]],null,{\"statements\":[[0,\"        \"],[4,\" Conditionally show Accept and Reject buttons \"],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"acceptOrder\",[28,[\"order\"]]]],[13],[0,\"Accept\"],[14],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"rejectOrder\",[28,[\"order\"]]]],[13],[0,\"Reject\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[6,[\"unless\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],0],null]],null,{\"statements\":[[0,\"        \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"paymentDetails\",[28,[\"order\"]]]],[13],[0,\"Payment details\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[\"order\"]},null]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"No orders found.\"],[14],[0,\"\\n    \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n  \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n  \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showCheckoutModal\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[5,[\"action\"],[[28,[null]],\"closeModal\"]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"modal checkout-modal shadow-lg rounded p-4\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeModal\"]],[13],[0,\"×\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"and\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null],[33,[\"eq\"],[[28,[\"selectedOrder\",\"isCompleted\"]],0],null]],null]],null,{\"statements\":[[0,\"      \"],[11,\"h2\",[]],[15,\"class\",\"text-center mb-4\"],[13],[0,\"Checkout\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[6,[\"unless\"],[[33,[\"eq\"],[[28,[\"selectedOrder\",\"isCompleted\"]],0],null]],null,{\"statements\":[[0,\"      \"],[11,\"h2\",[]],[15,\"class\",\"text-center mb-4\"],[13],[0,\"Payment Details\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"order-summary p-3 border mb-4 rounded\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Total Amount:\"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"value text-primary\"],[13],[1,[33,[\"format-number\"],[[28,[\"totalAmount\"]]],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"gt\"],[[28,[\"totalAmount\"]],500],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Discount (30%):\"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"value text-success\"],[13],[0,\"- \"],[1,[33,[\"format-number\"],[[28,[\"discount\"]]],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Discounted Price:\"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"value text-primary\"],[13],[1,[33,[\"format-number\"],[[28,[\"discountedPrice\"]]],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Service Tax (10%):\"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"value text-danger\"],[13],[0,\"+ \"],[1,[33,[\"format-number\"],[[28,[\"serviceTax\"]]],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Delivery Fee:\"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"value text-danger\"],[13],[0,\"+ \"],[1,[33,[\"format-number\"],[[28,[\"deliveryFee\"]]],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold h4\"],[13],[0,\"Final Price:\"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"value font-weight-bold h4 text-success\"],[13],[1,[33,[\"format-number\"],[[28,[\"finalPrice\"]]],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"and\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null],[33,[\"eq\"],[[28,[\"selectedOrder\",\"isCompleted\"]],0],null]],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"text-center\"],[13],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"btn btn-primary btn-lg px-5\"],[5,[\"action\"],[[28,[null]],\"confirmPayment\",[28,[\"selectedOrder\"]]]],[13],[0,\"Confirm\\n          Payment\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/components/orders-component.hbs" } });
});
define("tamil-kitchen-app/templates/components/side-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9qwSFZEI", "block": "{\"statements\":[[11,\"div\",[]],[15,\"id\",\"nav-bar\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"id\",\"nav-header\"],[13],[0,\"\\n    \"],[11,\"a\",[]],[15,\"id\",\"nav-title\"],[13],[0,\"TamilKitchen\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"id\",\"nav-content\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"isFoodItemsRoute\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n          \"],[6,[\"link-to\"],[\"restaurants.fooditems\",[28,[\"restaurantId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Food Items\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n          \"],[6,[\"link-to\"],[\"restaurants.low-stock-food\",[28,[\"restaurantId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Low Stock Foods\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n          \"],[6,[\"link-to\"],[\"restaurants.orders-history\",[28,[\"restaurantId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Orders\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n          \"],[6,[\"link-to\"],[\"restaurants\"],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Restaurants\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n          \"],[6,[\"link-to\"],[\"foodDetails\"],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Food Details\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],1],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"restaurants.fooditems\",[28,[\"userData\",\"restaurantId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Food Items\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"restaurants.low-stock-food\",[28,[\"userData\",\"restaurantId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Low Stock Foods\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"restaurants.orders-history\",[28,[\"userData\",\"restaurantId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Orders\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"restaurants\"],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Order Food\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"users.order-history\",[28,[\"userData\",\"userId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Order History\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"users.cart\",[28,[\"userData\",\"userId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Cart\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"users.addresses\",[28,[\"userData\",\"userId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Addresses\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n        \"],[6,[\"link-to\"],[\"users.profile\",[28,[\"userData\",\"userId\"]]],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Profile\"]],\"locals\":[]},null],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"nav-button\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"nav-link-style\"],[5,[\"action\"],[[28,[null]],\"showLogoutModal\"]],[13],[0,\"Logout\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[4,\" Logout Confirmation Modal \"],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"isLogoutModalOpen\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Are you sure you want to Logout?\"],[14],[0,\"\\n    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"logoutUser\"]],[13],[0,\"Yes\"],[14],[0,\"\\n    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"closeLogoutModal\"]],[13],[0,\"No\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/components/side-bar.hbs" } });
});
define("tamil-kitchen-app/templates/food-details", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kpIrGHkS", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n    \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"left-section\"],[13],[0,\"\\n            \"],[11,\"h3\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Food Details\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"add-btn\"],[5,[\"action\"],[[28,[null]],\"openAddFoodDetailModal\"]],[13],[0,\"\\n            \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                \"],[11,\"path\",[]],[15,\"d\",\"M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"foodDetails\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"foodDetails\"]]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[11,\"strong\",[]],[13],[0,\"Food Details ID:\"],[14],[0,\" \"],[1,[28,[\"foodDetails\",\"foodDetailsID\"]],false],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[11,\"strong\",[]],[13],[0,\"Name:\"],[14],[0,\" \"],[1,[28,[\"foodDetails\",\"name\"]],false],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[11,\"strong\",[]],[13],[0,\"Type:\"],[14],[0,\" \\n                    \"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodDetails\",\"type\"]],1],null]],null,{\"statements\":[[0,\"Starter\\n                    \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodDetails\",\"type\"]],2],null]],null,{\"statements\":[[0,\"Main Course\\n                    \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodDetails\",\"type\"]],3],null]],null,{\"statements\":[[0,\"Drinks\\n                    \"]],\"locals\":[]},{\"statements\":[[0,\"Unknown\\n                    \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[11,\"strong\",[]],[13],[0,\"Is Veg:\"],[14],[0,\" \"],[1,[33,[\"if\"],[[28,[\"foodDetails\",\"isVeg\"]],\"Yes\",\"No\"],null],false],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"foodDetails\"]},null]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"No food details found.\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\\n\"],[4,\" Add Food Details Modal \"],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"isAddFoodDetailModalOpen\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeAddFoodDetailModal\"]],[13],[0,\"×\"],[14],[0,\"\\n        \"],[11,\"h2\",[]],[13],[0,\"Add Food Detail\"],[14],[0,\"\\n        \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"addFoodDetail\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[0,\"Name:\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"class\",\"form-control\"],[15,\"placeholder\",\"Enter Food Name\"],[16,\"value\",[28,[null,\"newFoodDetails\",\"name\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"newFoodDetails\",\"name\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[0,\"Type:\"],[14],[0,\"\\n                \"],[11,\"select\",[]],[16,\"value\",[28,[null,\"newFoodDetails\",\"type\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"newFoodDetails\",\"type\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"Select Food Type\"],[14],[0,\" \"],[4,\" Default option \"],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"1\"],[13],[0,\"Starter\"],[14],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"2\"],[13],[0,\"Main Course\"],[14],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"3\"],[13],[0,\"Drinks\"],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[0,\"Vegetarian:\"],[14],[0,\"\\n                \"],[11,\"div\",[]],[13],[0,\"\\n                    \"],[11,\"label\",[]],[13],[0,\"\\n                        \"],[11,\"input\",[]],[15,\"type\",\"radio\"],[15,\"name\",\"vegOption\"],[15,\"value\",\"true\"],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"newFoodDetails\",\"isVeg\"]]],null],true],null],null],[13],[14],[0,\"\\n                        Veg\\n                    \"],[14],[0,\"\\n                    \"],[11,\"label\",[]],[13],[0,\"\\n                        \"],[11,\"input\",[]],[15,\"type\",\"radio\"],[15,\"name\",\"vegOption\"],[15,\"value\",\"false\"],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"newFoodDetails\",\"isVeg\"]]],null],false],null],null],[13],[14],[0,\"\\n                        Non-Veg\\n                    \"],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn-primary\"],[13],[0,\"Add Food Detail\"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/food-details.hbs" } });
});
define("tamil-kitchen-app/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "j6A9Etgp", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"login-container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"form-section\"],[13],[0,\"  \"],[4,\" Left section for the form \"],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Login\"],[14],[0,\"\\n    \"],[11,\"form\",[]],[15,\"id\",\"loginForm\"],[5,[\"action\"],[[28,[null]],\"login\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"for\",\"username\"],[13],[0,\"Username (Email)\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"email\"],[15,\"class\",\"form-control\"],[15,\"id\",\"username\"],[15,\"placeholder\",\"Enter your email\"],[15,\"required\",\"\"],[16,\"value\",[28,[null,\"username\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"setUsername\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"for\",\"password\"],[13],[0,\"Password\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"password\"],[15,\"class\",\"form-control\"],[15,\"id\",\"password\"],[15,\"placeholder\",\"Enter your password\"],[15,\"required\",\"\"],[16,\"value\",[28,[null,\"encryptedPwd\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"setPassword\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn btn-primary\"],[13],[0,\"Login\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"link\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"Don't have an account? \"],[6,[\"link-to\"],[\"signup\"],null,{\"statements\":[[0,\"Create Account\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"image-section\"],[13],[14],[0,\" \"],[4,\" Right section for the image \"],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/login.hbs" } });
});
define("tamil-kitchen-app/templates/not-found", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "TwCZoQ/Q", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"page-container\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"Page Not Found\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"The page you are looking for does not exist. Please check the URL or return to the \"],[6,[\"if\"],[[28,[\"model\"]]],null,{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"role\"]],0],null]],null,{\"statements\":[[0,\"      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"goToAdminDashboard\"]],[13],[0,\"Go to Dashboard\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"role\"]],1],null]],null,{\"statements\":[[0,\"      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"goToResOwnerDashboard\"]],[13],[0,\"Go to Dashboard\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"goToCustomerDashboard\"]],[13],[0,\"Go Home\"],[14],[0,\"\\n    \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"loading\"],[13],[0,\"Loading your access details, please wait...\"],[14],[0,\" \"],[4,\" Optional loading state \"],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/not-found.hbs" } });
});
define("tamil-kitchen-app/templates/restaurants", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "x8KnLbfs", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/restaurants.hbs" } });
});
define("tamil-kitchen-app/templates/restaurants/fooditems", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zVJrQqv4", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n    \"],[1,[33,[\"side-bar\"],null,[[\"restaurantId\",\"isFoodItemsRoute\"],[[28,[null,\"model\",\"restaurant\",\"id\"]],true]]],false],[0,\" \"],[4,\" Passing restaurantId to side-bar \"],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"left-section\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"or\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null],[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null]],null,{\"statements\":[[0,\"            \"],[11,\"button\",[]],[15,\"class\",\"back-btn\"],[5,[\"action\"],[[28,[null]],\"goBack\"]],[13],[0,\"\\n                \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                    \"],[11,\"path\",[]],[15,\"d\",\"M700-80L280-500l420-420 80 80-340 340 340 340-80 80Z\"],[13],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[11,\"h3\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Food Items\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n        \"],[6,[\"if\"],[[33,[\"or\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null],[33,[\"eq\"],[[28,[\"userData\",\"role\"]],1],null]],null]],null,{\"statements\":[[0,\" \"],[4,\"Add Button\"],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"add-btn\"],[5,[\"action\"],[[28,[null]],\"openAddFoodItemModal\"]],[13],[0,\"\\n            \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                \"],[11,\"path\",[]],[15,\"d\",\"M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\\n    \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"foodItems\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"foodItems\"]]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Name:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"foodDetails\",\"name\"]],false],[0,\"\\n                \"],[14],[0,\"\\n\"],[6,[\"unless\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Stock:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"stock\"]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Sold Quantity:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"soldQuantity\"]],false],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Price:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"price\"]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Veg:\"],[14],[0,\" \"],[1,[33,[\"if\"],[[28,[\"foodItem\",\"foodDetails\",\"isVeg\"]],\"Yes\",\"No\"],null],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Type:\"],[14],[0,\" \"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodItem\",\"foodDetails\",\"type\"]],1],null]],null,{\"statements\":[[0,\"Starter\\n                    \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodItem\",\"foodDetails\",\"type\"]],2],null]],null,{\"statements\":[[0,\"Main Course\\n                    \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodItem\",\"foodDetails\",\"type\"]],3],null]],null,{\"statements\":[[0,\"Drinks\\n                    \"]],\"locals\":[]},{\"statements\":[[0,\"Unknown\\n                    \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"                \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"foodItem\",\"quantity\"]]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Quantity in Cart:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"quantity\"]],false],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"or\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null],[33,[\"eq\"],[[28,[\"userData\",\"role\"]],1],null]],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n                \"],[11,\"button\",[]],[15,\"class\",\"edit-btn\"],[5,[\"action\"],[[28,[null]],\"openEditModal\",[28,[\"foodItem\"]]]],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                        \"],[11,\"path\",[]],[15,\"d\",\"M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z\"],[13],[14],[0,\"\\n                    \"],[14],[14],[0,\"\\n                \"],[11,\"button\",[]],[15,\"class\",\"delete-btn\"],[5,[\"action\"],[[28,[null]],\"openDeleteModal\",[28,[\"foodItem\"]]]],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                        \"],[11,\"path\",[]],[15,\"d\",\"M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720...\"],[13],[14],[0,\"\\n                    \"],[14],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n                \"],[11,\"button\",[]],[15,\"class\",\"details-btn\"],[5,[\"action\"],[[28,[null]],\"handleAddToCart\",[28,[\"foodItem\"]]]],[13],[0,\"ADD\"],[14],[0,\"\\n                \"],[11,\"button\",[]],[15,\"class\",\"details-btn\"],[5,[\"action\"],[[28,[null]],\"removeFromCart\",[28,[\"foodItem\"]]]],[13],[0,\"REMOVE\"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[\"foodItem\"]},null]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"No food items available.\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[0,\"\\n    \"],[6,[\"link-to\"],[\"users.cart\",[28,[\"userData\",\"userId\"]]],[[\"class\"],[\"full-width-btn\"]],{\"statements\":[[0,\"View Cart\"]],\"locals\":[]},null],[0,\"\\n\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[4,\" Add Food Item Modal \"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isAddModalOpen\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeAddFoodItemModal\"]],[13],[0,\"×\"],[14],[0,\"\\n        \"],[11,\"h2\",[]],[13],[0,\"Add Food Item\"],[14],[0,\"\\n\\n        \"],[4,\" Toggle for selecting existing or adding new food item \"],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"food-detail-option\"],[13],[0,\"Food Item Option:\"],[14],[0,\"\\n            \"],[11,\"select\",[]],[15,\"id\",\"food-detail-option\"],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"toggleFoodDetailOption\"],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n                \"],[11,\"option\",[]],[15,\"value\",\"false\"],[13],[0,\"Select from Existing\"],[14],[0,\"\\n                \"],[11,\"option\",[]],[15,\"value\",\"true\"],[13],[0,\"Add New Food Detail\"],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isAddingNewFoodDetail\"]]],null,{\"statements\":[[0,\"        \"],[4,\" Form to add new food details \"],[0,\"\\n        \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"addNewFoodDetail\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"food-name\"],[13],[0,\"Food Name:\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"class\",\"input\"],[15,\"id\",\"food-name\"],[15,\"placeholder\",\"Enter Food Name\"],[16,\"value\",[28,[\"newFoodDetail\",\"name\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newFoodDetail\",\"name\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"food-type\"],[13],[0,\"Type:\"],[14],[0,\"\\n                \"],[11,\"select\",[]],[15,\"id\",\"food-type\"],[16,\"value\",[28,[\"newFoodDetail\",\"type\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newFoodDetail\",\"type\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"Select Food Type\"],[14],[0,\" \"],[4,\" Default option \"],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"1\"],[13],[0,\"Starter\"],[14],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"2\"],[13],[0,\"Main Course\"],[14],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"3\"],[13],[0,\"Drinks\"],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[6,[\"unless\"],[[28,[\"isVegRestaurant\"]]],null,{\"statements\":[[0,\" \"],[4,\" Only show vegetarian options if restaurant is non-veg \"],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[0,\"Vegetarian:\"],[14],[11,\"br\",[]],[13],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"radio\"],[15,\"id\",\"is-veg\"],[15,\"name\",\"foodType\"],[15,\"value\",\"true\"],[16,\"checked\",[33,[\"eq\"],[[28,[\"newFoodDetail\",\"isVeg\"]],true],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newFoodDetail\",\"isVeg\"]]],null],true],null],null],[13],[14],[0,\"\\n                Veg\\n\\n                \"],[11,\"input\",[]],[15,\"type\",\"radio\"],[15,\"id\",\"is-non-veg\"],[15,\"name\",\"foodType\"],[15,\"value\",\"false\"],[16,\"checked\",[33,[\"eq\"],[[28,[\"newFoodDetail\",\"isVeg\"]],false],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newFoodDetail\",\"isVeg\"]]],null],false],null],null],[13],[14],[0,\"\\n                Non-Veg\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"food-stock\"],[13],[0,\"Stock:\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"class\",\"input\"],[15,\"id\",\"food-stock\"],[15,\"placeholder\",\"Stock\"],[16,\"value\",[28,[\"newFoodDetail\",\"stock\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newFoodDetail\",\"stock\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"food-price\"],[13],[0,\"Price:\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"class\",\"input\"],[15,\"id\",\"food-price\"],[15,\"placeholder\",\"Price\"],[15,\"step\",\"0.01\"],[16,\"value\",[28,[\"newFoodDetail\",\"price\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newFoodDetail\",\"price\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn-primary\"],[13],[0,\"Add Food Detail\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[4,\" Existing select food details form \"],[0,\"\\n        \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"addFoodItem\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"food-details\"],[13],[0,\"Select Food Detail\"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"search-dropdown\"],[13],[0,\"\\n                    \"],[11,\"button\",[]],[15,\"class\",\"dropdown-toggle\"],[5,[\"action\"],[[28,[null]],\"toggleFoodDetailDropdown\"]],[13],[0,\"\\n                        \"],[1,[33,[\"if\"],[[28,[\"selectedFoodDetail\",\"name\"]],[28,[\"selectedFoodDetail\",\"name\"]],\"Select Food Detail\"],null],false],[0,\"\\n                    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isFoodDetailDropdownOpen\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"div\",[]],[15,\"class\",\"dropdown-menu\"],[13],[0,\"\\n                        \"],[4,\" Search Input Inside Dropdown \"],[0,\"\\n                        \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Search food detail\"],[16,\"value\",[26,[\"foodDetailSearchQuery\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"foodDetailSearchQuery\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n                        \"],[4,\" Filtered Food Details List \"],[0,\"\\n                        \"],[11,\"div\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filteredFoodDetails\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"filteredFoodDetails\"]]],null,{\"statements\":[[0,\"                            \"],[11,\"div\",[]],[15,\"class\",\"option\"],[5,[\"action\"],[[28,[null]],\"selectFoodDetail\",[28,[\"foodDetail\"]]]],[13],[0,\"\\n                                \"],[1,[28,[\"foodDetail\",\"name\"]],false],[0,\"\\n                            \"],[14],[0,\"\\n\"]],\"locals\":[\"foodDetail\"]},null]],\"locals\":[]},{\"statements\":[[0,\"                            \"],[11,\"div\",[]],[15,\"class\",\"no-readers\"],[13],[0,\"No food details found\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                        \"],[14],[0,\"\\n                    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n\\n            \"],[4,\" Ensure stock and price are entered before form submission \"],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"food-stock\"],[13],[0,\"Stock:\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"class\",\"input\"],[15,\"id\",\"food-stock\"],[15,\"placeholder\",\"Stock\"],[16,\"value\",[28,[\"newFoodItem\",\"stock\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newFoodItem\",\"stock\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[15,\"for\",\"food-price\"],[13],[0,\"Price:\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"class\",\"input\"],[15,\"id\",\"food-price\"],[15,\"placeholder\",\"Price\"],[15,\"step\",\"0.01\"],[16,\"value\",[28,[\"newFoodItem\",\"price\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newFoodItem\",\"price\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn-primary\"],[13],[0,\"Add Food Item\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\\n\"],[4,\" Update Food Item Modal \"],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"isEditModalOpen\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeEditModal\"]],[13],[0,\"×\"],[14],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"Edit Food Item\"],[14],[0,\"\\n        \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"editFoodItem\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[0,\"Stock:\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"class\",\"input\"],[15,\"placeholder\",\"Stock\"],[16,\"value\",[28,[null,\"editedFoodItem\",\"stock\"]],null],[16,\"onInput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"editedFoodItem\",\"stock\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"label\",[]],[13],[0,\"Price:\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"class\",\"input\"],[15,\"placeholder\",\"Price\"],[16,\"value\",[28,[null,\"editedFoodItem\",\"price\"]],null],[16,\"onInput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"editedFoodItem\",\"price\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"step\",\"0.01\"],[15,\"required\",\"\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"modal-footer\"],[13],[0,\"\\n                \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn-primary\"],[13],[0,\"Update\"],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\\n\"],[4,\" Modal to delete the food item \"],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"isDeleteModalOpen\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeDeleteModal\"]],[13],[0,\"×\"],[14],[0,\"\\n        \"],[11,\"h2\",[]],[13],[0,\"Are you sure you want to permenantly delete this food item?\"],[14],[0,\"\\n        \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"deleteFoodItem\"]],[13],[0,\"Delete\"],[14],[0,\"\\n        \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"closeDeleteModal\"]],[13],[0,\"Cancel\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\\n\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/restaurants/fooditems.hbs" } });
});
define("tamil-kitchen-app/templates/restaurants/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vEywYoAS", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n  \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n  \"],[11,\"div\",[]],[15,\"id\",\"search-section\"],[15,\"class\",\"search-container\"],[13],[0,\"\\n    \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"id\",\"restaurant-search\"],[15,\"placeholder\",\"Search Restaurants by Name\"],[16,\"value\",[26,[\"restaurantName\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"restaurantName\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n    \"],[11,\"select\",[]],[15,\"id\",\"type-filter\"],[16,\"value\",[26,[\"typeFilter\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"typeFilter\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"All\"],[14],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"true\"],[13],[0,\"Veg\"],[14],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"false\"],[13],[0,\"Non-Veg\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"select\",[]],[15,\"id\",\"rating-filter\"],[16,\"value\",[26,[\"ratingFilter\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"ratingFilter\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"All Ratings\"],[14],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"1\"],[13],[0,\"1+\"],[14],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"2\"],[13],[0,\"2+\"],[14],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"3\"],[13],[0,\"3+\"],[14],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"4\"],[13],[0,\"4+\"],[14],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"5\"],[13],[0,\"5\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[4,\" Search Button \"],[0,\"\\n    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"performSearch\"]],[13],[0,\"Search\"],[14],[0,\"\\n    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"clearSearch\"]],[13],[0,\"Clear\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[11,\"div\",[]],[15,\"id\",\"food-section\"],[15,\"class\",\"food-container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"food-header\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Order our best food options\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"food-items\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"food-box\"],[5,[\"action\"],[[28,[null]],\"searchRestaurantsByFood\",\"Briyani\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/client/images/briyani.jpeg\"],[15,\"alt\",\"Briyani\"],[15,\"class\",\"food-image\"],[13],[14],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Briyani\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"food-box\"],[5,[\"action\"],[[28,[null]],\"searchRestaurantsByFood\",\"Dosa\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/client/images/dosa.jpeg\"],[15,\"alt\",\"Dosa\"],[15,\"class\",\"food-image\"],[13],[14],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Dosa\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"food-box\"],[5,[\"action\"],[[28,[null]],\"searchRestaurantsByFood\",\"Rolls\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/client/images/roll.png\"],[15,\"alt\",\"Rolls\"],[15,\"class\",\"food-image\"],[13],[14],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Rolls\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"food-box\"],[5,[\"action\"],[[28,[null]],\"searchRestaurantsByFood\",\"Ice Cream\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/client/images/icecream.png\"],[15,\"alt\",\"Ice Cream\"],[15,\"class\",\"food-image\"],[13],[14],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Ice Cream\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"food-box\"],[5,[\"action\"],[[28,[null]],\"searchRestaurantsByFood\",\"Puttu\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/client/images/puttu.png\"],[15,\"alt\",\"Puttu\"],[15,\"class\",\"food-image\"],[13],[14],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Puttu\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"food-box\"],[5,[\"action\"],[[28,[null]],\"searchRestaurantsByFood\",\"Burger\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/client/images/burger.png\"],[15,\"alt\",\"Burger\"],[15,\"class\",\"food-image\"],[13],[14],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Burger\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"food-box\"],[5,[\"action\"],[[28,[null]],\"searchRestaurantsByFood\",\"Shake\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/client/images/shake.png\"],[15,\"alt\",\"Shake\"],[15,\"class\",\"food-image\"],[13],[14],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Shake\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"food-box\"],[5,[\"action\"],[[28,[null]],\"searchRestaurantsByFood\",\"Parotta\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/client/images/parotta.png\"],[15,\"alt\",\"Parotta\"],[15,\"class\",\"food-image\"],[13],[14],[0,\"\\n      \"],[11,\"h3\",[]],[13],[0,\"Parotta\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\\n\"],[6,[\"if\"],[[28,[\"showresult\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"id\",\"search-results-section\"],[15,\"class\",\"list\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Restaurants Serving \"],[1,[26,[\"selectedFood\"]],false],[0,\":\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"searchError\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[26,[\"searchError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"restaurantResults\",\"length\"]]],null,{\"statements\":[[0,\"  \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"restaurantResults\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"name-location\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"restaurant-name\"],[13],[0,\"\\n            \"],[11,\"strong\",[]],[13],[1,[28,[\"restaurant\",\"name\"]],false],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"type\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"restaurant\",\"isVeg\"]]],null,{\"statements\":[[0,\"              \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"green\"],[13],[0,\"\\n                \"],[11,\"path\",[]],[15,\"d\",\"M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm280-80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280Z\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"red\"],[13],[0,\"\\n                \"],[11,\"path\",[]],[15,\"d\",\"M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm280-80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280Z\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"rating\"],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#0B6623\"],[13],[0,\"\\n              \"],[11,\"path\",[]],[15,\"d\",\"m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z\"],[13],[14],[0,\"\\n            \"],[14],[1,[28,[\"restaurant\",\"rating\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail restaurant-location\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"rating\"],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#0B6623\"],[13],[0,\"\\n              \"],[11,\"path\",[]],[15,\"d\",\"m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z\"],[13],[14],[0,\"\\n            \"],[14],[1,[28,[\"restaurant\",\"rating\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail restaurant-location\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"\\n            \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"black\"],[13],[0,\"\\n              \"],[11,\"path\",[]],[15,\"d\",\"M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\" \"],[1,[28,[\"restaurant\",\"location\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[11,\"strong\",[]],[13],[0,\"Owner:\"],[14],[0,\" \"],[1,[28,[\"restaurant\",\"ownerUsername\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"link-to\"],[\"restaurants.fooditems\",[28,[\"restaurant\",\"restaurantId\"]]],[[\"class\"],[\"common-link-style\"]],{\"statements\":[[0,\"        Food Items\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"edit-btn\"],[5,[\"action\"],[[28,[null]],\"openEditModal\",[28,[\"restaurant\"]]]],[13],[0,\"\\n          \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n            \"],[11,\"path\",[]],[15,\"d\",\"M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"delete-btn\"],[5,[\"action\"],[[28,[null]],\"openDeleteModal\",[28,[\"restaurant\"]]]],[13],[0,\"\\n          \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n            \"],[11,\"path\",[]],[15,\"d\",\"M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[\"restaurant\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"No restaurants found.\"],[14],[0,\"\\n  \"]],\"locals\":[]}]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Restaurants\"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[15,\"class\",\"add-btn\"],[5,[\"action\"],[[28,[null]],\"openAddModal\"]],[13],[0,\"\\n      \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n        \"],[11,\"path\",[]],[15,\"d\",\"M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"restaurants\",\"length\"]]],null,{\"statements\":[[0,\"  \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"restaurants\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"name-location\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"restaurant-name\"],[13],[0,\"\\n            \"],[11,\"strong\",[]],[13],[1,[28,[\"restaurant\",\"name\"]],false],[14],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"type\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"restaurant\",\"isVeg\"]]],null,{\"statements\":[[0,\"              \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"green\"],[13],[0,\"\\n                \"],[11,\"path\",[]],[15,\"d\",\"M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm280-80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280Z\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"red\"],[13],[0,\"\\n                \"],[11,\"path\",[]],[15,\"d\",\"M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm280-80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280Z\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"rating\"],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#0B6623\"],[13],[0,\"\\n              \"],[11,\"path\",[]],[15,\"d\",\"m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z\"],[13],[14],[0,\"\\n            \"],[14],[1,[28,[\"restaurant\",\"rating\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail restaurant-location\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"rating\"],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#0B6623\"],[13],[0,\"\\n              \"],[11,\"path\",[]],[15,\"d\",\"m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z\"],[13],[14],[0,\"\\n            \"],[14],[1,[28,[\"restaurant\",\"rating\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail restaurant-location\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"black\"],[13],[0,\"\\n              \"],[11,\"path\",[]],[15,\"d\",\"M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z\"],[13],[14],[0,\"\\n            \"],[14],[14],[0,\" \"],[1,[28,[\"restaurant\",\"location\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[11,\"strong\",[]],[13],[0,\"Owner:\"],[14],[0,\" \"],[1,[28,[\"restaurant\",\"ownerUsername\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"link-to\"],[\"restaurants.fooditems\",[28,[\"restaurant\",\"restaurantId\"]]],[[\"class\"],[\"common-link-style\"]],{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"        View\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        Food Items\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],0],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"edit-btn\"],[5,[\"action\"],[[28,[null]],\"openEditModal\",[28,[\"restaurant\"]]]],[13],[0,\"\\n          \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n            \"],[11,\"path\",[]],[15,\"d\",\"M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"delete-btn\"],[5,[\"action\"],[[28,[null]],\"openDeleteModal\",[28,[\"restaurant\"]]]],[13],[0,\"\\n          \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n            \"],[11,\"path\",[]],[15,\"d\",\"M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[\"restaurant\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"No restaurants available at the moment.\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[0,\"\\n  \"],[6,[\"link-to\"],[\"users.cart\",[28,[\"userData\",\"userId\"]]],[[\"class\"],[\"full-width-btn\"]],{\"statements\":[[0,\"View Cart\"]],\"locals\":[]},null],[0,\"\\n\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\\n\\n\\n\"],[4,\" Add Modal \"],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"isAddModalOpen\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeAddModal\"]],[13],[0,\"×\"],[14],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Add Restaurant\"],[14],[0,\"\\n    \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"createRestaurant\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"Name:\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"class\",\"input\"],[16,\"value\",[28,[\"newRestaurant\",\"name\"]],null],[15,\"placeholder\",\"Enter Restaurant Name\"],[16,\"onInput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newRestaurant\",\"name\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"Location:\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"search-dropdown\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"dropdown-toggle\"],[5,[\"action\"],[[28,[null]],\"toggleLocationDropdown\"]],[13],[0,\"\\n            \"],[1,[33,[\"if\"],[[28,[\"newRestaurant\",\"location\"]],[28,[\"newRestaurant\",\"location\"]],\"Enter location\"],null],false],[0,\"\\n          \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isLocationDropdownOpen\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"dropdown-menu\"],[13],[0,\"\\n            \"],[4,\" Search Input Inside Dropdown \"],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Search location\"],[16,\"value\",[26,[\"locationSearchQuery\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"locationSearchQuery\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n            \"],[4,\" Filtered Locations List \"],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filteredLocations\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"filteredLocations\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"option\"],[5,[\"action\"],[[28,[null]],\"selectLocation\",[28,[\"city\"]]]],[13],[0,\"\\n                \"],[1,[28,[\"city\"]],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"city\"]},null]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"no-readers\"],[13],[0,\"No locations found\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"Vegetarian:\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"label\",[]],[13],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"radio\"],[15,\"name\",\"vegOption\"],[15,\"value\",\"true\"],[16,\"checked\",[33,[\"eq\"],[[28,[null,\"newRestaurant\",\"isVeg\"]],true],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"newRestaurant\",\"isVeg\"]]],null],true],null],null],[13],[14],[0,\"\\n            Veg\\n          \"],[14],[0,\"\\n          \"],[11,\"label\",[]],[13],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"radio\"],[15,\"name\",\"vegOption\"],[15,\"value\",\"false\"],[16,\"checked\",[33,[\"eq\"],[[28,[null,\"newRestaurant\",\"isVeg\"]],false],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"newRestaurant\",\"isVeg\"]]],null],false],null],null],[13],[14],[0,\"\\n            Non-Veg\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[4,\" Owner Email Dropdown \"],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"Owner Email:\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"search-dropdown\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"dropdown-toggle\"],[5,[\"action\"],[[28,[null]],\"toggleUsernameDropdown\"]],[13],[0,\"\\n            \"],[1,[33,[\"if\"],[[28,[\"newRestaurant\",\"ownerUsername\"]],[28,[\"newRestaurant\",\"ownerUsername\"]],\"Select Owner Email\"],null],false],[0,\"\\n          \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isOwnerEmailDropdownOpen\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"dropdown-menu\"],[13],[0,\"\\n            \"],[4,\" Search Input Inside Dropdown \"],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Search owner email\"],[16,\"value\",[26,[\"ownerEmailSearchQuery\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"ownerEmailSearchQuery\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n            \"],[4,\" Filtered Usernames List \"],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filteredUsernames\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"filteredUsernames\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"option\"],[5,[\"action\"],[[28,[null]],\"selectUsername\",[28,[\"user\",\"username\"]]]],[13],[0,\"\\n                \"],[1,[28,[\"user\",\"username\"]],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"user\"]},null]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"no-readers\"],[13],[0,\"No users found\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn-primary address-btn-primary\"],[13],[0,\"Add Restaurant\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\\n\\n\\n\"],[4,\" Edit Modal \"],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"isEditModalOpen\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeEditModal\"]],[13],[0,\"×\"],[14],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Edit Restaurant\"],[14],[0,\"\\n    \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"updateRestaurant\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n      \\n      \"],[4,\" Name input \"],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"Name:\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"class\",\"input\"],[16,\"value\",[28,[null,\"editedRestaurant\",\"name\"]],null],[15,\"placeholder\",\"Enter Restaurant Name\"],[16,\"onInput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"editedRestaurant\",\"name\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"required\",\"\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[4,\" Location Dropdown \"],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"Location:\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"search-dropdown\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"dropdown-toggle\"],[5,[\"action\"],[[28,[null]],\"toggleLocationDropdown\"]],[13],[0,\"\\n            \"],[1,[33,[\"if\"],[[28,[null,\"editedRestaurant\",\"location\"]],[28,[null,\"editedRestaurant\",\"location\"]],\"Enter location\"],null],false],[0,\"\\n          \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isLocationDropdownOpen\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"dropdown-menu\"],[13],[0,\"\\n            \"],[4,\" Search Input Inside Dropdown \"],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Search location\"],[16,\"value\",[26,[\"locationSearchQuery\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"locationSearchQuery\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n            \"],[4,\" Filtered Locations List \"],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filteredLocations\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"filteredLocations\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"option\"],[5,[\"action\"],[[28,[null]],\"selectLocation\",[28,[\"city\"]]]],[13],[0,\"\\n                \"],[1,[28,[\"city\"]],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"city\"]},null]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"no-readers\"],[13],[0,\"No locations found\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[4,\" Vegetarian option \"],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"Vegetarian:\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"label\",[]],[13],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"radio\"],[15,\"name\",\"vegOption\"],[15,\"value\",\"true\"],[16,\"checked\",[33,[\"eq\"],[[28,[null,\"editedRestaurant\",\"isVeg\"]],true],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"editedRestaurant\",\"isVeg\"]]],null],true],null],null],[13],[14],[0,\"\\n            Veg\\n          \"],[14],[0,\"\\n          \"],[11,\"label\",[]],[13],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"radio\"],[15,\"name\",\"vegOption\"],[15,\"value\",\"false\"],[16,\"checked\",[33,[\"eq\"],[[28,[null,\"editedRestaurant\",\"isVeg\"]],false],null],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"editedRestaurant\",\"isVeg\"]]],null],false],null],null],[13],[14],[0,\"\\n            Non-Veg\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[4,\" Owner Email Dropdown \"],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[13],[0,\"Owner Email:\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"search-dropdown\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"dropdown-toggle\"],[5,[\"action\"],[[28,[null]],\"toggleUsernameDropdown\"]],[13],[0,\"\\n            \"],[1,[33,[\"if\"],[[28,[null,\"editedRestaurant\",\"ownerUsername\"]],[28,[null,\"editedRestaurant\",\"ownerUsername\"]],\"Select Owner Email\"],null],false],[0,\"\\n          \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isOwnerEmailDropdownOpen\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"dropdown-menu\"],[13],[0,\"\\n            \"],[4,\" Search Input Inside Dropdown \"],[0,\"\\n            \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Search owner email\"],[16,\"value\",[26,[\"ownerEmailSearchQuery\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"ownerEmailSearchQuery\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n            \"],[4,\" Filtered Usernames List \"],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filteredUsernames\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"filteredUsernames\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"option\"],[5,[\"action\"],[[28,[null]],\"selectUsername\",[28,[\"user\",\"username\"]]]],[13],[0,\"\\n                \"],[1,[28,[\"user\",\"username\"]],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"user\"]},null]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"no-readers\"],[13],[0,\"No users found\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn-primary address-btn-primary\"],[13],[0,\"Save Changes\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\\n\"],[4,\" Modal to delete the restaurant \"],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"isDeleteModalOpen\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Are you sure you want to delete this restaurant?\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[13],[11,\"strong\",[]],[13],[1,[28,[null,\"currentRestaurant\",\"name\"]],false],[14],[0,\" will be permanently deleted.\"],[14],[0,\"\\n    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"deleteRestaurant\"]],[13],[0,\"Delete\"],[14],[0,\"\\n    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"closeDeleteModal\"]],[13],[0,\"Cancel\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n  \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n  \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/restaurants/index.hbs" } });
});
define("tamil-kitchen-app/templates/restaurants/low-stock-food", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Kv0SHiym", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n  \"],[1,[33,[\"side-bar\"],null,[[\"restaurantId\",\"isFoodItemsRoute\"],[[28,[null,\"model\",\"restaurant\",\"id\"]],true]]],false],[0,\" \"],[4,\" Passing restaurantId to side-bar \"],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"left-section\"],[13],[0,\"\\n\\n      \"],[11,\"button\",[]],[15,\"class\",\"back-btn\"],[5,[\"action\"],[[28,[null]],\"goBack\"]],[13],[0,\"\\n        \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n          \"],[11,\"path\",[]],[15,\"d\",\"M700-80L280-500l420-420 80 80-340 340 340 340-80 80Z\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"h3\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Low Stock Food Items\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"restaurant\",\"foodItems\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"model\",\"restaurant\",\"foodItems\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Name:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"foodDetails\",\"name\"]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Stock:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"stock\"]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Sold Quantity:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"soldQuantity\"]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Price:\"],[14],[0,\" \"],[1,[28,[\"foodItem\",\"price\"]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Veg:\"],[14],[0,\" \"],[1,[33,[\"if\"],[[28,[\"foodItem\",\"foodDetails\",\"isVeg\"]],\"Yes\",\"No\"],null],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n          \"],[11,\"strong\",[]],[13],[0,\"Type:\"],[14],[0,\" \"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodItem\",\"foodDetails\",\"type\"]],1],null]],null,{\"statements\":[[0,\"Starter\\n          \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodItem\",\"foodDetails\",\"type\"]],2],null]],null,{\"statements\":[[0,\"Main Course\\n          \"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"foodItem\",\"foodDetails\",\"type\"]],3],null]],null,{\"statements\":[[0,\"Drinks\\n          \"]],\"locals\":[]},{\"statements\":[[0,\"Unknown\\n          \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n        \\n        \\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"placeholder\",\"Enter new stock\"],[16,\"value\",[28,[\"foodItem\",\"newStock\"]],null],[15,\"min\",\"0\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"foodItem\",\"newStock\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n        \"],[11,\"button\",[]],[15,\"class\",\"details-btn\"],[15,\"class\",\"details-btn\"],[5,[\"action\"],[[28,[null]],\"updateFoodItemStock\",[28,[\"foodItem\"]]]],[13],[0,\"\\n          Update Stock\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"foodItem\"]},null]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"No food items with stock less than 10 found.\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n  \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n  \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/restaurants/low-stock-food.hbs" } });
});
define("tamil-kitchen-app/templates/restaurants/orders-history", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "28Px1ln+", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n\"],[1,[33,[\"side-bar\"],null,[[\"restaurantId\",\"isFoodItemsRoute\"],[[28,[null,\"model\",\"restaurant\",\"id\"]],true]]],false],[0,\" \"],[4,\" Passing restaurantId to side-bar \"],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"left-section\"],[13],[0,\"\\n            \"],[11,\"button\",[]],[15,\"class\",\"back-btn\"],[5,[\"action\"],[[28,[null]],\"goBack\"]],[13],[0,\"\\n                \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                    \"],[11,\"path\",[]],[15,\"d\",\"M700-80L280-500l420-420 80 80-340 340 340 340-80 80Z\"],[13],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"h3\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Orders History\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"status-container\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[16,\"for\",[34,[\"order-status-\",[28,[\"model\",\"restaurant\",\"id\"]]]]],[13],[0,\"Order Status:\"],[14],[0,\"\\n            \"],[11,\"select\",[]],[16,\"id\",[34,[\"order-status-\",[28,[\"model\",\"restaurant\",\"id\"]]]]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"sendStatusToRoute\"],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n                \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"Select Status\"],[14],[0,\"\\n                \"],[11,\"option\",[]],[15,\"value\",\"Accepted\"],[13],[0,\"Accepted\"],[14],[0,\"\\n                \"],[11,\"option\",[]],[15,\"value\",\"Rejected\"],[13],[0,\"Rejected\"],[14],[0,\"\\n                \"],[11,\"option\",[]],[15,\"value\",\"Placed\"],[13],[0,\"Placed\"],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"orders-component\"],null,[[\"orders\",\"acceptOrder\",\"rejectOrder\",\"showActionButtons\"],[[28,[\"model\",\"restaurant\",\"orders\"]],[33,[\"action\"],[[28,[null]],\"acceptOrder\"],null],[33,[\"action\"],[[28,[null]],\"rejectOrder\"],null],true]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/restaurants/orders-history.hbs" } });
});
define("tamil-kitchen-app/templates/signup", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "o3BDrWIL", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"login-container  signup-page \"],[13],[0,\"\\n \"],[11,\"div\",[]],[15,\"class\",\"image-section\"],[13],[14],[0,\" \"],[4,\" Right section for the image \"],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"form-section\"],[13],[0,\" \"],[4,\" Left section for the form \"],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Create Account\"],[14],[0,\"\\n    \"],[11,\"form\",[]],[15,\"id\",\"signupForm\"],[5,[\"action\"],[[28,[null]],\"signup\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"for\",\"username\"],[13],[0,\"Username (Email)\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"email\"],[15,\"class\",\"form-control\"],[15,\"id\",\"username\"],[15,\"placeholder\",\"Enter your email\"],[15,\"required\",\"\"],[16,\"value\",[28,[null,\"newUsername\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"setNewUsername\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"for\",\"name\"],[13],[0,\"Name\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"class\",\"form-control\"],[15,\"id\",\"name\"],[15,\"placeholder\",\"Enter your name\"],[15,\"required\",\"\"],[16,\"value\",[28,[null,\"newName\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"setNewName\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"for\",\"mobileNo\"],[13],[0,\"Mobile Number\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"tel\"],[15,\"class\",\"form-control\"],[15,\"id\",\"mobileNo\"],[15,\"placeholder\",\"Enter your mobile number\"],[15,\"required\",\"\"],[16,\"value\",[28,[null,\"newMobileNo\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"setNewMobileNo\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n        \"],[11,\"label\",[]],[15,\"for\",\"password\"],[13],[0,\"Password\"],[14],[0,\"\\n        \"],[11,\"input\",[]],[15,\"type\",\"password\"],[15,\"class\",\"form-control\"],[15,\"id\",\"password\"],[15,\"placeholder\",\"Enter your password\"],[15,\"required\",\"\"],[16,\"value\",[28,[null,\"newPassword\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"setNewPassword\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn btn-primary\"],[13],[0,\"Sign Up\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"link\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"Already have an account? \"],[6,[\"link-to\"],[\"login\"],[[\"class\"],[\"nav-link-style\"]],{\"statements\":[[0,\"Login\"]],\"locals\":[]},null],[14],[0,\" \\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/signup.hbs" } });
});
define("tamil-kitchen-app/templates/users/addresses", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aur1ioPd", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n    \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"left-section\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Manage Addresses\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"add-btn\"],[5,[\"action\"],[[28,[null]],\"openAddModal\"]],[13],[0,\"\\n            \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                \"],[11,\"path\",[]],[15,\"d\",\"M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \\n    \"],[14],[0,\"\\n\\n    \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"addresses\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"addresses\"]]],null,{\"statements\":[[0,\"        \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"address\",\"isDefault\"]],false],null]],null,{\"statements\":[[0,\"\\n\"]],\"locals\":[]},null],[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[1,[28,[\"address\",\"address\"]],false],[0,\", \"],[1,[28,[\"address\",\"location\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"address\",\"isDefault\"]],true],null]],null,{\"statements\":[[0,\"                \"],[11,\"span\",[]],[15,\"class\",\"default-label\"],[13],[0,\"(Default)\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"unless\"],[[28,[\"address\",\"isDefault\"]]],null,{\"statements\":[[0,\"                \"],[11,\"button\",[]],[15,\"class\",\"details-btn\"],[5,[\"action\"],[[28,[null]],\"setDefaultAddress\",[28,[\"address\",\"addressId\"]]]],[13],[0,\"\\n                    \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"value\"],[\"radio\",\"defaultAddress\",[28,[\"address\",\"addressId\"]]]]],false],[0,\" Set as Default\\n                \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n\\n\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n                \"],[11,\"button\",[]],[15,\"class\",\"edit-btn\"],[5,[\"action\"],[[28,[null]],\"openEditModal\",[28,[\"address\"]]]],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                        \"],[11,\"path\",[]],[15,\"d\",\"M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z\"],[13],[14],[0,\"\\n                    \"],[14],[14],[0,\"\\n\"],[6,[\"unless\"],[[33,[\"eq\"],[[28,[\"address\",\"isDefault\"]],true],null]],null,{\"statements\":[[0,\"                \"],[11,\"button\",[]],[15,\"class\",\"delete-btn\"],[5,[\"action\"],[[28,[null]],\"openDeleteModal\",[28,[\"address\"]]]],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                        \"],[11,\"path\",[]],[15,\"d\",\"M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720...\"],[13],[14],[0,\"\\n                    \"],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"            \"],[14],[0,\"\\n\\n\\n        \"],[14],[0,\"\\n\"]],\"locals\":[\"address\"]},null],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"Address Not Found, Kindly Add Address\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\\n\\n\"],[6,[\"if\"],[[28,[\"isAddModalOpen\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeAddModal\"]],[13],[0,\"×\"],[14],[0,\"\\n            \"],[11,\"h2\",[]],[13],[0,\"Add New Address\"],[14],[0,\"\\n            \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"addNewAddress\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                    \"],[11,\"label\",[]],[13],[0,\"Address:\"],[14],[0,\"\\n                    \"],[11,\"input\",[]],[16,\"value\",[28,[\"newAddress\",\"address\"]],null],[15,\"class\",\"input\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"newAddress\",\"address\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"placeholder\",\"Enter new address\"],[15,\"required\",\"\"],[13],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n\\n                \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                    \"],[11,\"label\",[]],[13],[0,\"Location:\"],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"search-dropdown\"],[13],[0,\"\\n                        \"],[11,\"button\",[]],[15,\"class\",\"dropdown-toggle\"],[5,[\"action\"],[[28,[null]],\"toggleLocationDropdown\"]],[13],[0,\"\\n                            \"],[1,[33,[\"if\"],[[28,[\"newAddress\",\"location\"]],[28,[\"newAddress\",\"location\"]],\"Enter location\"],null],false],[0,\"\\n                        \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isLocationDropdownOpen\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"div\",[]],[15,\"class\",\"dropdown-menu\"],[13],[0,\"\\n                            \"],[4,\" Search Input Inside Dropdown \"],[0,\"\\n                            \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Search location\"],[16,\"value\",[26,[\"locationSearchQuery\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"locationSearchQuery\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n                            \"],[4,\" Filtered Locations List \"],[0,\"\\n                            \"],[11,\"div\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filteredLocations\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"filteredLocations\"]]],null,{\"statements\":[[0,\"                                \"],[11,\"div\",[]],[15,\"class\",\"option\"],[5,[\"action\"],[[28,[null]],\"selectLocation\",[28,[\"city\"]]]],[13],[0,\"\\n                                    \"],[1,[28,[\"city\"]],false],[0,\"\\n                                \"],[14],[0,\"\\n\"]],\"locals\":[\"city\"]},null]],\"locals\":[]},{\"statements\":[[0,\"                                \"],[11,\"div\",[]],[15,\"class\",\"no-readers\"],[13],[0,\"No locations found\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                            \"],[14],[0,\"\\n                        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                    \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n                \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn-primary address-btn-primary\"],[13],[0,\"Add Address\"],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n\\n\\n\\n    \"],[4,\" Edit Modal for editing addresses \"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isEditModalOpen\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"modal-overlay address-modal-overlay\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal address-modal\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"modal-content address-modal-content\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"close address-close\"],[5,[\"action\"],[[28,[null]],\"closeEditModal\"]],[13],[0,\"×\"],[14],[0,\"\\n            \"],[11,\"h2\",[]],[13],[0,\"Edit Address\"],[14],[0,\"\\n            \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"updateAddress\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"form-group address-form-group\"],[13],[0,\"\\n                    \"],[11,\"label\",[]],[13],[0,\"Address:\"],[14],[0,\"\\n                    \"],[1,[33,[\"input\"],null,[[\"value\",\"placeholder\",\"class\"],[[28,[\"editedAddress\",\"address\"]],\"Update address\",\"input\"]]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                    \"],[11,\"label\",[]],[13],[0,\"Location:\"],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"search-dropdown\"],[13],[0,\"\\n                        \"],[11,\"button\",[]],[15,\"class\",\"dropdown-toggle\"],[5,[\"action\"],[[28,[null]],\"toggleLocationDropdown\"]],[13],[0,\"\\n                            \"],[1,[33,[\"if\"],[[28,[\"editedAddress\",\"location\"]],[28,[\"editedAddress\",\"location\"]],\"Enter location\"],null],false],[0,\"\\n                        \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"isLocationDropdownOpen\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"div\",[]],[15,\"class\",\"dropdown-menu\"],[13],[0,\"\\n                            \"],[4,\" Search Input Inside Dropdown \"],[0,\"\\n                            \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"placeholder\",\"Search location\"],[16,\"value\",[26,[\"locationSearchQuery\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"locationSearchQuery\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n                            \"],[4,\" Filtered Locations List \"],[0,\"\\n                            \"],[11,\"div\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filteredLocations\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"filteredLocations\"]]],null,{\"statements\":[[0,\"                                \"],[11,\"div\",[]],[15,\"class\",\"option\"],[5,[\"action\"],[[28,[null]],\"selectLocation\",[28,[\"city\"]]]],[13],[0,\"\\n                                    \"],[1,[28,[\"city\"]],false],[0,\"\\n                                \"],[14],[0,\"\\n\"]],\"locals\":[\"city\"]},null]],\"locals\":[]},{\"statements\":[[0,\"                                \"],[11,\"div\",[]],[15,\"class\",\"no-readers\"],[13],[0,\"No locations found\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                            \"],[14],[0,\"\\n                        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                    \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n                \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn-primary address-btn-primary\"],[13],[0,\"Update Address\"],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\\n    \"],[4,\" Delete Modal for confirming address deletion \"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isDeleteModalOpen\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeDeleteModal\"]],[13],[0,\"×\"],[14],[0,\"\\n            \"],[11,\"h2\",[]],[13],[0,\"Are you sure you want to delete this address?\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                \"],[11,\"p\",[]],[13],[1,[28,[\"currentAddress\",\"address\"]],false],[0,\", \"],[1,[28,[\"currentAddress\",\"location\"]],false],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"button\",[]],[15,\"class\",\"btn-danger\"],[5,[\"action\"],[[28,[null]],\"deleteAddress\"]],[13],[0,\"Delete\"],[14],[0,\"\\n            \"],[11,\"button\",[]],[15,\"class\",\"btn-secondary\"],[5,[\"action\"],[[28,[null]],\"closeDeleteModal\"]],[13],[0,\"Cancel\"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/users/addresses.hbs" } });
});
define("tamil-kitchen-app/templates/users/cart", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1GeCmsvY", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n    \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"left-section\"],[13],[0,\"\\n            \"],[11,\"button\",[]],[15,\"class\",\"back-btn\"],[5,[\"action\"],[[28,[null]],\"goBack\"]],[13],[0,\"\\n                \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                    \"],[11,\"path\",[]],[15,\"d\",\"M700-80L280-500l420-420 80 80-340 340 340 340-80 80Z\"],[13],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"h3\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Cart\"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"orders\"],[13],[0,\"\\n\\n        \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"errorMessage\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"orders\",\"length\"]]],null,{\"statements\":[[6,[\"each\"],[[28,[\"orders\"]]],null,{\"statements\":[[0,\"            \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                        \"],[11,\"strong\",[]],[13],[0,\"Order ID:\"],[14],[0,\" \"],[1,[28,[\"order\",\"orderId\"]],false],[0,\"\\n                    \"],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                        \"],[11,\"strong\",[]],[13],[0,\"Added to cart:\"],[14],[0,\"\\n                        \"],[1,[33,[\"format-date\"],[[28,[\"order\",\"orderDate\"]]],null],false],[0,\"\\n                    \"],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                        \"],[11,\"strong\",[]],[13],[0,\"Status:\"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],0],null]],null,{\"statements\":[[0,\"                        In Cart\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                        Unknown\\n\"]],\"locals\":[]}],[0,\"                    \"],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                        \"],[11,\"strong\",[]],[13],[0,\"Restaurant Name:\"],[14],[0,\" \"],[1,[28,[\"order\",\"restaurantName\"]],false],[0,\"\\n                    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"order\",\"orderItems\",\"length\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"table\",[]],[15,\"class\",\"order-items-table\"],[13],[0,\"\\n                        \"],[11,\"thead\",[]],[13],[0,\"\\n                            \"],[11,\"tr\",[]],[13],[0,\"\\n                                \"],[11,\"th\",[]],[13],[0,\"Food Item Name\"],[14],[0,\"\\n                                \"],[11,\"th\",[]],[13],[0,\"Quantity\"],[14],[0,\"\\n                                \"],[11,\"th\",[]],[13],[0,\"Price\"],[14],[0,\"\\n                            \"],[14],[0,\"\\n                        \"],[14],[0,\"\\n                        \"],[11,\"tbody\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"order\",\"orderItems\"]]],null,{\"statements\":[[0,\"                            \"],[11,\"tr\",[]],[13],[0,\"\\n                                \"],[11,\"td\",[]],[13],[1,[28,[\"item\",\"foodItemName\"]],false],[14],[0,\"\\n                                \"],[11,\"td\",[]],[13],[0,\"\\n                                    \"],[11,\"input\",[]],[15,\"type\",\"number\"],[15,\"placeholder\",\"Enter new stock\"],[16,\"value\",[28,[\"item\",\"quantity\"]],null],[15,\"min\",\"1\"],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"item\",\"quantity\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n                                    \"],[11,\"button\",[]],[15,\"class\",\"edit-btn\"],[5,[\"action\"],[[28,[null]],\"updateOrderItem\",[28,[\"item\"]]]],[13],[0,\" \"],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                                            \"],[11,\"path\",[]],[15,\"d\",\"M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z\"],[13],[14],[0,\"\\n                                        \"],[14],[14],[0,\"\\n                                    \"],[11,\"button\",[]],[15,\"class\",\"delete-btn\"],[5,[\"action\"],[[28,[null]],\"deleteOrderItem\",[28,[\"item\"]]]],[13],[11,\"svg\",[]],[15,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[15,\"height\",\"24px\"],[15,\"viewBox\",\"0 -960 960 960\"],[15,\"width\",\"24px\"],[15,\"fill\",\"#000000\"],[13],[0,\"\\n                                            \"],[11,\"path\",[]],[15,\"d\",\"M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z\"],[13],[14],[0,\"\\n                                        \"],[14],[14],[0,\"\\n                                \"],[14],[0,\"\\n                                \"],[11,\"td\",[]],[13],[1,[33,[\"format-number\"],[[28,[\"item\",\"price\"]]],null],false],[14],[0,\"\\n                            \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"                        \"],[14],[0,\"\\n                    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                    \"],[11,\"p\",[]],[13],[0,\"No items found.\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"btn-container-end\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"and\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null],[33,[\"eq\"],[[28,[\"order\",\"isCompleted\"]],0],null]],null]],null,{\"statements\":[[0,\"                    \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"proceedToPay\",[28,[\"order\"]]]],[13],[0,\"Proceed To Pay\"],[14],[0,\"\\n                    \"],[11,\"button\",[]],[15,\"class\",\"btn\"],[5,[\"action\"],[[28,[null]],\"removeCartOrder\",[28,[\"order\"]]]],[13],[0,\"Remove\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[\"order\"]},null]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"No orders found.\"],[14],[0,\"\\n            \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showCheckoutModal\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[5,[\"action\"],[[28,[null]],\"closeModal\"]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal checkout-modal shadow-lg rounded p-4\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeModal\"]],[13],[0,\"×\"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"and\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null],[33,[\"eq\"],[[28,[\"selectedOrder\",\"isCompleted\"]],0],null]],null]],null,{\"statements\":[[0,\"            \"],[11,\"h2\",[]],[15,\"class\",\"text-center mb-4\"],[13],[0,\"Checkout\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null]],null,{\"statements\":[[6,[\"unless\"],[[33,[\"eq\"],[[28,[\"selectedOrder\",\"isCompleted\"]],0],null]],null,{\"statements\":[[0,\"            \"],[11,\"h2\",[]],[15,\"class\",\"text-center mb-4\"],[13],[0,\"Payment Details\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\\n\\n            \"],[11,\"div\",[]],[15,\"class\",\"order-summary p-3 border mb-4 rounded\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Total Amount:\"],[14],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"value text-primary\"],[13],[1,[33,[\"format-number\"],[[28,[\"totalAmount\"]]],null],false],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"gt\"],[[28,[\"totalAmount\"]],500],null]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Discount (30%):\"],[14],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"value text-success\"],[13],[0,\"- \"],[1,[33,[\"format-number\"],[[28,[\"discount\"]]],null],false],[14],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Discounted Price:\"],[14],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"value text-primary\"],[13],[1,[33,[\"format-number\"],[[28,[\"discountedPrice\"]]],null],false],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n                \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n                \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Service Tax (10%):\"],[14],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"value text-danger\"],[13],[0,\"+ \"],[1,[33,[\"format-number\"],[[28,[\"serviceTax\"]]],null],false],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n                \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold\"],[13],[0,\"Delivery Fee:\"],[14],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"value text-danger\"],[13],[0,\"+ \"],[1,[33,[\"format-number\"],[[28,[\"deliveryFee\"]]],null],false],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n                \"],[11,\"hr\",[]],[13],[14],[0,\"\\n\\n                \"],[11,\"div\",[]],[15,\"class\",\"summary-row mb-2\"],[13],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"label font-weight-bold h4\"],[13],[0,\"Final Price:\"],[14],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"value font-weight-bold h4 text-success\"],[13],[1,[33,[\"format-number\"],[[28,[\"finalPrice\"]]],null],false],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"and\"],[[33,[\"eq\"],[[28,[\"userData\",\"role\"]],2],null],[33,[\"eq\"],[[28,[\"selectedOrder\",\"isCompleted\"]],0],null]],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"text-center\"],[13],[0,\"\\n                \"],[11,\"button\",[]],[15,\"class\",\"btn btn-primary btn-lg px-5\"],[5,[\"action\"],[[28,[null]],\"confirmPayment\",[28,[\"selectedOrder\"]]]],[13],[0,\"Confirm\\n                    Payment\"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/users/cart.hbs" } });
});
define("tamil-kitchen-app/templates/users/order-history", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ocH5Z2VA", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n\"],[1,[26,[\"side-bar\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"left-section\"],[13],[0,\"\\n        \"],[11,\"h3\",[]],[15,\"class\",\"list-title\"],[13],[0,\"Order History\"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"orders-component\"],null,[[\"orders\",\"submitRating\"],[[28,[\"model\",\"user\",\"orders\"]],[33,[\"action\"],[[28,[null]],\"submitRating\"],null]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n    \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/users/order-history.hbs" } });
});
define("tamil-kitchen-app/templates/users/profile", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "62rwjWaF", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"background-container\"],[13],[0,\"\\n\"],[1,[26,[\"side-bar\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"list\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"list-header\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"left-section\"],[13],[0,\"\\n        \"],[11,\"h1\",[]],[15,\"class\",\"list-title\"],[13],[0,\"User Profile\"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"profile\"]]],null,{\"statements\":[[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"item-list\"],[13],[0,\"\\n        \"],[11,\"li\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"details-container\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Name:\"],[14],[0,\" \"],[1,[28,[\"model\",\"profile\",\"name\"]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Username:\"],[14],[0,\" \"],[1,[28,[\"model\",\"profile\",\"username\"]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Mobile No:\"],[14],[0,\" \"],[1,[28,[\"model\",\"profile\",\"mobileNo\"]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"detail\"],[13],[0,\"\\n                    \"],[11,\"strong\",[]],[13],[0,\"Default Address:\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"defaultAddress\"]]],null,{\"statements\":[[0,\"                        \"],[1,[28,[\"model\",\"defaultAddress\",\"address\"]],false],[0,\", \"],[1,[28,[\"model\",\"defaultAddress\",\"location\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                    \"],[11,\"em\",[]],[13],[0,\"No default address.\\n                        \"],[11,\"span\",[]],[13],[6,[\"link-to\"],[\"users.addresses\",[28,[\"model\",\"profile\",\"userId\"]]],null,{\"statements\":[[0,\"Add Default\\n                            Addresses\"]],\"locals\":[]},null],[14],[0,\"\\n                    \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                \"],[14],[0,\"\\n                 \"],[11,\"button\",[]],[15,\"class\",\"password-btn\"],[5,[\"action\"],[[28,[null]],\"openChangePasswordModal\"]],[13],[0,\"Change Password\"],[14],[0,\"\\n            \"],[14],[0,\"\\n               \\n            \\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"p\",[]],[15,\"class\",\"no-items\"],[13],[0,\"No user profile found.\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n\\n    \"],[4,\" Change Password Modal \"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isChangePasswordModalOpen\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"modal-content\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"close\"],[5,[\"action\"],[[28,[null]],\"closeChangePasswordModal\"]],[13],[0,\"×\"],[14],[0,\"\\n            \"],[11,\"h2\",[]],[13],[0,\"Change Password\"],[14],[0,\"\\n            \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"changePassword\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                    \"],[11,\"label\",[]],[13],[0,\"Old Password:\"],[14],[0,\"\\n                    \"],[1,[33,[\"input\"],null,[[\"value\",\"type\",\"placeholder\",\"class\"],[[28,[\"oldPassword\"]],\"password\",\"Enter old password\",\"input\"]]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n                    \"],[11,\"label\",[]],[13],[0,\"New Password:\"],[14],[0,\"\\n                    \"],[1,[33,[\"input\"],null,[[\"value\",\"type\",\"placeholder\",\"class\"],[[28,[\"newPassword\"]],\"password\",\"Enter new password\",\"input\"]]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[13],[0,\"Change Password\"],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\\n\\n\"],[6,[\"if\"],[[28,[\"showSuccessMessage\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"success-popup\"],[13],[0,\"\\n        \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showErrorMessage\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"error-popup\"],[13],[0,\"\\n        \"],[1,[26,[\"responseMessage\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "tamil-kitchen-app/templates/users/profile.hbs" } });
});


define('tamil-kitchen-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'tamil-kitchen-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("tamil-kitchen-app/app")["default"].create({"name":"tamil-kitchen-app","version":"0.0.0+08f9c3bc"});
}
//# sourceMappingURL=tamil-kitchen-app.map
