import Ember from 'ember';

export default Ember.Service.extend({
  user: Ember.inject.service(), 

  accessControl: {
    foodDetails: [0],
    login: [0, 1, 2],
    signup: [0, 1, 2],
    'restaurants.index':[0, 2],
    'restaurants.fooditems': [0, 1, 2],
    'restaurants.orders-history': [0, 1],
    'restaurants.low-stock-food': [0, 1],
    users: [2],
    'users.addresses': [2],
    'users.profile': [2],
    'users.cart': [2],
    'users.order-history': [2],
  },

  canAccessRoute(routeName) {
    
    this.get('user').loadToken();
    const userRole = this.get('user').getUserRole();
    const allowedRoles = this.get('accessControl'); 
    const rolesForRoute = allowedRoles[routeName]; 
    return rolesForRoute.includes(userRole);
}
});
