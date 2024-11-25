import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
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

export default Router;
