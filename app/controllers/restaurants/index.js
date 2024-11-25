import Ember from 'ember';
import FetchAuthMixin from '../../mixins/Authmixin';
import { computed } from '@ember/object';

export default Ember.Controller.extend(FetchAuthMixin, {
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

  tamilnaduCities: [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
    'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi',
    'Dindigul', 'Thanjavur', 'Ranipet', 'Virudhunagar', 'Karur',
    'Nilgiris', 'Sivaganga', 'Tirupathur', 'Nagapattinam',
    'Krishnagiri', 'Kanchipuram', 'Ariyalur', 'Perambalur',
    'Ramanathapuram', 'Namakkal', 'Cuddalore'
  ],
  filteredLocations: Ember.computed('locationSearchQuery', function () {
    let searchQuery = this.get('locationSearchQuery').trim().toLowerCase();
    return searchQuery === '' ? this.tamilnaduCities :
      this.tamilnaduCities.filter(city =>
        city.toLowerCase().includes(searchQuery)
      );
  }),

  usernames: [],
  filteredUsernames: computed('ownerEmailSearchQuery', function () {
    let searchQuery = this.get('ownerEmailSearchQuery').trim().toLowerCase();
    return this.get('usernames')
      .filter(user => user.role === 2) // Filter only users with role 2
      .filter(user => searchQuery === '' || user.username.toLowerCase().includes(searchQuery)); // Apply search query if available
  }),



  init() {
    this._super(...arguments);
    this.clearSearchState();
  },


  actions: {
    toggleLocationDropdown() {
      this.set('isLocationDropdownOpen', !this.isLocationDropdownOpen);
      this.set('isOwnerEmailDropdownOpen', false);
    },
    toggleUsernameDropdown() {
      this.set('isOwnerEmailDropdownOpen', !this.isOwnerEmailDropdownOpen);
      this.set('isLocationDropdownOpen', false);
    },

    selectLocation(city) {
      this.set('newRestaurant.location', city);
      this.set('editedRestaurant.location', city);
      this.set('isLocationDropdownOpen', false); // Close dropdown after selection
    },
    selectUsername(username) {
      this.set('newRestaurant.ownerUsername', username);
      this.set('editedRestaurant.ownerUsername', username);
      this.set('isOwnerEmailDropdownOpen', false); // Close dropdown after selection
    },


    navigateToFoodItems(restaurantId) {
      this.controllerFor('application').set('restaurantId', restaurantId);
      this.transitionTo('restaurants.fooditems', restaurantId);
    },

    togglePopup(restaurantId) {
      if (this.get('selectedRestaurantId') === restaurantId) {
        this.set('selectedRestaurantId', null);
      } else {
        this.set('selectedRestaurantId', restaurantId);
      }
    },

    openAddModal() {
      this.set('newRestaurant', {});
      this.set('isAddModalOpen', true);
    },

    closeAddModal() {
      this.set('isAddModalOpen', false);
      this.set('isLocationDropdownOpen', false);
      this.set('isOwnerEmailDropdownOpen', false);
      this.set('newRestaurant', {});
      this.set('ownerEmailSearchQuery','');
      this.set('locationSearchQuery','');
    },

    openEditModal(restaurant) {
      this.set('currentRestaurant', restaurant);
      this.set('editedRestaurant', Object.assign({}, restaurant));
      this.set('newRestaurant', Object.assign({}, restaurant));
      this.set('isEditModalOpen', true);
      this.set('originalOwnerUsername', restaurant.ownerUsername);

    },

    closeEditModal() {
      this.set('isEditModalOpen', false);
      this.set('editedRestaurant', null);
      this.set('ownerEmailSearchQuery','');
      this.set('locationSearchQuery','');
      this.set('isLocationDropdownOpen', false);
      this.set('isOwnerEmailDropdownOpen', false);
      this.set('originalOwnerUsername', null);
    },

    openDeleteModal(restaurant) {
      this.set('currentRestaurant', restaurant);
      this.set('isDeleteModalOpen', true);
    },

    closeDeleteModal() {
      this.set('isDeleteModalOpen', false);
      this.set('currentRestaurant', null);
      this.set('responseMessage', null);
    },



    createRestaurant(event) {

      if (event) {
        event.preventDefault();
      }

      const newRestaurant = this.get('newRestaurant');
      const payload = {
        name: newRestaurant.name,
        location: newRestaurant.location,
        isVeg: newRestaurant.isVeg,
        ownerUsername: newRestaurant.ownerUsername,
      };
      this.fetchWithAuth(
        'http://localhost:8080/api/v1/restaurants',
        { method: 'POST', body: JSON.stringify(payload), headers: {} }
      )
        .then((parsedResponse) => {
          if (parsedResponse.message) {
            this.set('responseMessage', parsedResponse.message);
            this.set('showSuccessMessage', true);

            const restaurantId = parsedResponse.value;
            const addedRestaurant = {
              restaurantId: restaurantId,
              name: newRestaurant.name,
              location: newRestaurant.location,
              isVeg: newRestaurant.isVeg,
              rating: 0,
              ownerUsername: newRestaurant.ownerUsername
            };
            const restaurants = this.get('restaurants');
            if (Ember.isArray(restaurants)) {
              restaurants.pushObject(addedRestaurant); // Add new restaurant to the array
            } else {
              console.error('restaurants is not an Ember Array:', restaurants);
            }
            const usernames = this.get('usernames');
            const filteredUsernames = usernames.filter(user => user.username !== newRestaurant.ownerUsername);
            this.set('usernames', filteredUsernames); // Update usernames model

            this.set('currentRestaurant', 'restaurants')
            this.set('newRestaurant', {});
            

            setTimeout(() => {
              this.set('showSuccessMessage', false);
              this.send('closeAddModal');
            }, 1000);
          }
        })
        .catch((error) => {
          this.set('responseMessage', error);
          this.set('showErrorMessage', true);
          setTimeout(() => this.set('showErrorMessage', false), 1000);
        });
    },



    updateRestaurant(event) {
      if (event) {
        event.preventDefault();
      }

      console.log("Edited Restaurant:", this.get('editedRestaurant')); // Debug
      const restaurant = this.get('editedRestaurant');
      const oldUsername = this.get('originalOwnerUsername');

      // If changing to a veg restaurant, ensure all food items are veg
      if (restaurant.isVeg) {
        this.getFoodItemsForRestaurant(restaurant.restaurantId)
          .then((foodItems) => {
            // Check if there are any non-veg food items
            const nonVegFoodItems = foodItems.filter(item => !item.foodDetails.isVeg);
            if (nonVegFoodItems.length > 0) {
              throw new Error('Cannot change to a Veg restaurant. There are non-veg food items.');
            } else {
              this.saveRestaurantUpdate(restaurant);
            }
          })
          .catch((error) => {
            this.set('responseMessage', error);
            this.set('showErrorMessage', true);

            setTimeout(() => {
              this.set('showErrorMessage', false);
            }, 3000);
          });
      } else {
        // If it's not a Veg restaurant, directly proceed with the update
        this.saveRestaurantUpdate(restaurant, oldUsername);
      }
    },



    deleteRestaurant() {
      const restaurantId = this.get('currentRestaurant.restaurantId');

      this.fetchWithAuth(
        `http://localhost:8080/api/v1/restaurants/${restaurantId}`,
        { method: 'DELETE', headers: {} }
      )
        .then((parsedResponse) => {
          const restaurants = this.get('restaurants');
          const updatedRestaurants = restaurants.filter(r => String(r.restaurantId) !== String(restaurantId));

          const usernames = this.get('usernames');
          usernames.pushObject({username: this.get('currentRestaurant.ownerUsername'), role: 2 });

          this.set('restaurants', updatedRestaurants);
          this.set('currentRestaurant', null);
          this.set('responseMessage', parsedResponse.message);
          this.set('showSuccessMessage', true);
          setTimeout(() => this.set('showSuccessMessage', false), this.send('closeDeleteModal'), 1000);
        })
        .catch((error) => {
          this.set('responseMessage', error);
          this.set('showErrorMessage', true);
          setTimeout(() => this.set('showErrorMessage', false), 1000);
        });
    },

    performSearch() {
      const restaurantName = this.get('restaurantName') || null;
      const type = this.get('typeFilter') || null;
      const rating = this.get('ratingFilter') || null;
      const role = this.get('userData').role;
      console.log("Role:", role);

      if (!restaurantName && !type && !rating) {
        this.set('restaurantResults', null);
        this.set('showresult', false);
        return;
      }

      const queryParams = new URLSearchParams();

      if (role === 0) {
        // Role 0: Execute search without default address
        if (restaurantName) queryParams.append('restaurantName', restaurantName);
        if (type) queryParams.append('type', type);
        if (rating) queryParams.append('ratingThreshold', rating);

        this.fetchWithAuth(
          `http://localhost:8080/api/v1/restaurants?${queryParams.toString()}`,
          { method: 'GET', headers: {} }
        )
          .then((data) => {
            this.set('restaurantResults', data.length > 0 ? data : []);
            this.set('showresult', true);
          })
          .catch((error) => {
            this.set('restaurantResults', []);
            this.set('showresult', true);
          });
      } else if (role === 2) {
        // Role 2: Fetch and use the default address
        this.getUserDefaultAddress()
          .then((userLocation) => {
            if (!userLocation) {
              throw new Error('Default address is required.');
            }
            if (restaurantName) queryParams.append('restaurantName', restaurantName);
            if (type) queryParams.append('type', type);
            if (rating) queryParams.append('ratingThreshold', rating);
            queryParams.append('location', userLocation);

            const apiUrl = `http://localhost:8080/api/v1/restaurants?${queryParams.toString()}`;
            return this.fetchWithAuth(apiUrl, { method: 'GET', headers: {} });
          })
          .then((data) => {
            this.set('restaurantResults', data.length > 0 ? data : []);
            this.set('showresult', true);
          })
          .catch((error) => {
            this.set('restaurantResults', []);
            this.set('showresult', true);
          });
      }
    },


    clearSearch() {
      this.clearSearchState();
    },


    searchRestaurantsByFood(foodName) {
      this.getUserDefaultAddress()
        .then((userLocation) => {
          const queryParams = new URLSearchParams();
          if (foodName) queryParams.append('foodName', foodName);
          if (userLocation) queryParams.append('location', userLocation);

          const apiUrl = `http://localhost:8080/api/v1/restaurants?${queryParams.toString()}`;

          return this.fetchWithAuth(apiUrl, {
            method: 'GET'
          })
            .then((data) => {
              this.set('restaurantResults', data.length > 0 ? data : []);
              this.set('showresult', true);
            })
            .catch((error) => {
              this.set('restaurantResults', []);
              this.set('showresult', true);
            });
        })
        .catch((error) => {
          this.set('searchError', 'Error fetching user default address.');
        });
    },
  },


  saveRestaurantUpdate(restaurant, oldUsername) {
    const payload = {
      name: restaurant.name,
      location: restaurant.location,
      isVeg: restaurant.isVeg,
      ownerUsername: restaurant.ownerUsername
    };

    this.fetchWithAuth(
      `http://localhost:8080/api/v1/restaurants/${restaurant.restaurantId}`,
      { method: 'PUT', body: JSON.stringify(payload), headers: {} }
    )
      .then((parsedResponse) => {
        if (parsedResponse.message) {
          this.set('responseMessage', parsedResponse.message);
          this.set('showSuccessMessage', true);
        }

        this.set('currentRestaurant.name', payload.name);
        this.set('currentRestaurant.location', payload.location);
        this.set('currentRestaurant.isVeg', payload.isVeg);
        this.set('currentRestaurant.ownerUsername', payload.ownerUsername);

        if (oldUsername !== restaurant.ownerUsername) {
          // Update usernames array: add old username back, remove the new one
          let usernames = this.get('usernames');

          // Add old username back if it's not already in the list
          if (!usernames.find(user => user.username === oldUsername)) {
            usernames.pushObject({ username: oldUsername, role: 2 });
          }
          this.set('usernames', usernames.filter(user => user.username !== restaurant.ownerUsername));
        }
        setTimeout(() => {
          this.set('showSuccessMessage', false);
          this.send('closeEditModal');
        }, 1000);
      })
      .catch((error) => {
        this.set('responseMessage', error);
        this.set('showErrorMessage', true);
        setTimeout(() => this.set('showErrorMessage', false), 1000);
      });
  },



  getFoodItemsForRestaurant(restaurantId) {
    return this.fetchWithAuth(
      `http://localhost:8080/api/v1/restaurants/${restaurantId}/fooditems`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((data) => data || [])
      .catch((error) => {
        console.error('Error fetching food items:', error);
        return [];
      });
  },



  getUserDefaultAddress() {
    const userId = this.get('user').getUserId();
    const apiUrl = `http://localhost:8080/api/v1/users/${userId}/addresses?isDefault=true`;

    return this.fetchWithAuth(apiUrl, {
      method: 'GET',
      headers: {}
    })
      .then(data => {
        if (data && data.isDefault) {
          return data.location;
        } else {
          alert('No default address found. Kindly add a default address to proceed.');
          this.get('router').transitionTo('users.addresses', userId);
        }
      })
      .catch(error => {
        console.error('Error fetching user default address:', error);
        alert('An error occurred while fetching the default address.');
        throw error;
      });
  }
  ,
  clearSearchState() {
    this.set('restaurantName', null);
    this.set('typeFilter', "");
    this.set('ratingFilter', "");
    this.set('searchError', "");
    this.set('restaurantResults', []);
    this.set('showresult', false);
  }

});
