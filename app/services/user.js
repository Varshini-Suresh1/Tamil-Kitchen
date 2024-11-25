import Ember from 'ember';

export default Ember.Service.extend({
  jwtToken: null,
  tokenLoaded: Ember.computed.alias('jwtToken'),  // Alias to detect changes

  loadToken() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.set('jwtToken', token);
    } else {
      this.set('jwtToken', null);
    }
  },

  decodeJWT(token) {
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)); 
  },

  getUserId() {
    const token = this.get('jwtToken');
    const decoded = this.decodeJWT(token);
    return decoded ? decoded.userId : null;
  },

  getUserRole() {
    const token = this.get('jwtToken');
    const decoded = this.decodeJWT(token);
    return decoded ? decoded.role : null;
  },

  getRestaurantId() {
    const token = this.get('jwtToken');
    const decoded = this.decodeJWT(token);
    return decoded ? decoded.restaurantId : null;
  },

  getUserData() {
    this.loadToken();  // Ensure token is loaded
    const token = this.get('jwtToken');
    return this.decodeJWT(token);
  }
});
