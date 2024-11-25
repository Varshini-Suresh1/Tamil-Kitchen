import Ember from 'ember';
import FetchAuthMixin from '../mixins/Authmixin';

export default Ember.Controller.extend(FetchAuthMixin, {
  username: '',
  encryptedPwd: '',
  responseMessage: '',
  user: Ember.inject.service(), 

  actions: {
    login(event) {
      if (event) {
        event.preventDefault();
      }
    
      const payload = {
        username: this.get('username'),
        encryptedPwd: this.get('encryptedPwd'),
      };
    
      fetch('http://localhost:8080/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }

        // Get tokens from response headers
        const accessToken = response.headers.get('Access-Token');
        const refreshToken = response.headers.get('Refresh-Token');
        
        if (!accessToken || !refreshToken) {
          throw new Error('Tokens not received');
        }

        localStorage.setItem('jwtToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken); 
        
        this.get('user').loadToken();

        const userData = this.get('user').getUserData();
        const userId = userData.userId;
        const role = userData.role;
        const restaurantId = userData.restaurantId;

        this.set('username', ''); 
        this.set('encryptedPwd', ''); 

        this.transitionToRole(role, restaurantId, userId);
      })
      .catch(error => {
        this.set('showErrorMessage', true);
        this.set('responseMessage', error.message);
        setTimeout(() => this.set('showErrorMessage', false), 1000);
      });
  },
    setUsername(value) {
      this.set('username', value);
    },

    setPassword(value) {
      this.set('encryptedPwd', value);
    }
  },

  transitionToRole(role, restaurantId, userId) {
    if (role === 0) {
      this.get('target').transitionTo('restaurants');
    } else if (role === 1) {
      this.get('target').transitionTo('restaurants.fooditems', restaurantId);
    } else if (role === 2) {
      this.getUserDefaultAddress(userId).then((defaultAddress) => {
        if (defaultAddress) {
          this.get('target').transitionTo('restaurants');
        } else {
          this.get('target').transitionTo('users.addresses', userId);
        }
      });
    } else {
      this.get('target').transitionTo('login');
    }
  },

  getUserDefaultAddress(userid) {
    console.log("UserId:", userid);
    const url = `http://localhost:8080/api/v1/users/${userid}/addresses?isDefault=true`;
    return this.fetchWithAuth(url)
      .then(data => {
        return data ? data.location : null;  
      })
      .catch(error => {
        console.error("Error fetching default address:", error);
        return null;  
      });  
},
});
