import Ember from 'ember';
import FetchAuthMixin from '../../mixins/Authmixin';

export default Ember.Controller.extend(FetchAuthMixin, {
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


  actions: {
    toggleDropdown() {
      this.toggleProperty('isDropdownOpen');
    },
    toggleLocationDropdown() {
      this.toggleProperty('isLocationDropdownOpen');
    },
    selectLocation(city) {
      if (this.isEditModalOpen) {
        this.set('editedAddress.location', city);
      } else {
        this.set('newAddress.location', city);
      }
      this.set('isLocationDropdownOpen', false); // Close dropdown after selection
    },    


    openAddModal() {
      this.set('newAddress', {
        address: '',
        location: ''
      });
      this.set('isAddModalOpen', true);
    },


    closeAddModal() {
      this.set('isAddModalOpen', false);
      this.set('newAddress', {});
    },

    openEditModal(address) {
      this.set('currentAddress', address);
      this.set('editedAddress', Object.assign({}, address));
      this.set('isEditModalOpen', true);
    },

    closeEditModal() {
      this.set('isEditModalOpen', false);
      this.set('editedAddress', null);
    },

    openDeleteModal(address) {
      this.set('currentAddress', address);
      this.set('isDeleteModalOpen', true);
    },

    closeDeleteModal() {
      this.set('isDeleteModalOpen', false);
      this.set('currentAddress', null);
    },

    addNewAddress(event) {
      if (event) {
        event.preventDefault();
      }

      const newAddress = this.get('newAddress');
      const userId = this.get('model.user.id');
      const defaultAddressExists = this.get('addresses').some(address => address.isDefault);

      // If no default address exists, set the new address as default
      newAddress.isDefault = !defaultAddressExists;

      this.fetchWithAuth(`http://localhost:8080/api/v1/users/${userId}/addresses`, {
        method: 'POST',
        body: JSON.stringify(newAddress), headers: {}
      })
        .then((parsedResponse) => {
          this.set('responseMessage', parsedResponse.message);
          this.set('showSuccessMessage', true);

          const addressId = parsedResponse.value;
          const addedAddress = {
            addressId: addressId,
            address: newAddress.address,
            location: newAddress.location,
            isDefault: newAddress.isDefault
          };

          this.get('addresses').pushObject(addedAddress);
          this.set('newAddress', {});

          setTimeout(() => {
            this.set('showSuccessMessage', false);
            this.send('closeAddModal');
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



    updateAddress(event) {
      if (event) {
        event.preventDefault();
      }

      const userId = this.get('model.user.id');
      const address = this.get('editedAddress');
      const payload = {
        address: address.address,
        location: address.location,
        isDefault: address.isDefault,
      };
      const addressId = address.addressId;

      this.fetchWithAuth(`http://localhost:8080/api/v1/users/${userId}/addresses/${addressId}`, {
        method: 'PUT',
        body: JSON.stringify(payload), headers: {}
      })
        .then((parsedResponse) => {
          this.set('responseMessage', parsedResponse.message);
          this.set('showSuccessMessage', true);

          this.set('currentAddress.addressId', parsedResponse.value);
          this.set('currentAddress.address', payload.address);
          this.set('currentAddress.location', payload.location);
          this.set('currentAddress.isDefault', payload.isDefault);

          setTimeout(() => {
            this.set('showSuccessMessage', false);
            this.send('closeEditModal');
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

    deleteAddress() {
      const address = this.get('currentAddress');
      const addressId = address.addressId;
      const userId = this.get('model.user.id');

      this.fetchWithAuth(`http://localhost:8080/api/v1/users/${userId}/addresses/${addressId}`, {
        method: 'DELETE', headers: {}
      })
        .then((parsedResponse) => {
          const addresses = this.get('addresses');
          const updatedAddresses = addresses.filter(a => String(a.addressId) !== String(addressId));
          this.set('addresses', updatedAddresses);

          this.set('currentAddress', null);
          this.set('responseMessage', parsedResponse.message);
          this.set('showSuccessMessage', true);

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

    setDefaultAddress(addressId) {
      const address = this.addresses.find(addr => addr.addressId === addressId);

      if (address) {
        Ember.set(address, 'isDefault', true);
        this.get('addresses').forEach(addr => {
          if (addr.addressId !== addressId) {
            Ember.set(addr, 'isDefault', false);
          }
        })

        const payload = {
          address: address.address,
          location: address.location,
          isDefault: true,
        };
        const userId = this.get('model.user.id');

        this.fetchWithAuth(`http://localhost:8080/api/v1/users/${userId}/addresses/${addressId}`, {
          method: 'PUT',
          body: JSON.stringify(payload), headers: {}
        })
          .then((parsedResponse) => {
            this.set('responseMessage', parsedResponse.message);
            this.set('showSuccessMessage', true);

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
      } else {
        console.error('Address not found');
      }
    },
  },
});
