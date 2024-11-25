// app/mixins/fetch-auth.js
import Ember from 'ember';
import Router from '@ember/routing/router';

export default Ember.Mixin.create({
  user: Ember.inject.service(),
  isSessionExpired: false,


  fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('jwtToken');
    const refreshToken = localStorage.getItem('refreshToken');

    options.headers = Object.assign({}, options.headers || {}, {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Refresh-Token': refreshToken,
    });


    return fetch(url, options)
      .then(response => this.handleResponse(response))
      .catch(error => {
        throw error;
      });
  },

  handleResponse(response) {
    if (response.ok) {
      const newAccessToken = response.headers.get('New-Access-Token');

      if (newAccessToken) {
        localStorage.setItem('jwtToken', newAccessToken);
      }
      return response.json();
    }

    if (response.status === 401 && !this.isSessionExpired) {
      this.isSessionExpired = true; // Set flag to true to prevent further alerts
      const router = Ember.getOwner(this).lookup('router:main');
      alert("Session Expired. Kindly Login to Proceed");
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      router.transitionTo('login');

    }

    if (response.status === 403) {
      const router = Ember.getOwner(this).lookup('router:main');
      router.transitionTo('access-denied');

      throw new Error('forbidden');
    }

    return response.json().then((errorData) => {
      console.log(errorData);
      if(errorData.value){
        const errorMessage =`${errorData.error}${errorData.value}` || "Error fetching data";
        throw new Error(errorMessage);
      }
      const errorMessage = errorData.error || "Error fetching data";
      throw new Error(errorMessage);
    });
  },
});
