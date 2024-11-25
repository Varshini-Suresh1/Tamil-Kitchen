import Route from '@ember/routing/route';
import FetchAuthMixin from '../../mixins/Authmixin';

export default Route.extend(FetchAuthMixin, {
  user: Ember.inject.service(),
  accessControl: Ember.inject.service(),
  beforeModel(transition) {
    const routeName = this.routeName;

    if (routeName && !this.get('accessControl').canAccessRoute(routeName)) {
      this.transitionTo('access-denied'); // Redirect to login if access is denied
    }
  },  
  model(params) {
    const { userid } = params;
    const role = this.get('user').getUserRole();

    console.log('Fetching cart orders for userid:', userid);

    return this.getOrdersForUser(userid, role)
      .then(orders => {
        console.log("Fetched Orders:", orders);
        return {
          user: {
            id: userid,
            orders: orders || [], 
          },
        };
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        return {
          user: {
            id: userid,
            orders: [],
            error: error.message 
          },
        };
      });
  },

  getOrdersForUser(userid, role) {
    const url = `http://localhost:8080/api/v1/users/${userid}/orders?isCompleted=cart`;
    const options = { method: 'GET' , headers: {} };

    return this.fetchWithAuth(url, options)
      .then(data => {
        return data;
      })
      .catch(error => {
        throw error;
      });
  },
  setupController(controller, model) {
    this._super(controller, model); 
    controller.set('orders', model.user.orders);
    controller.set('orderItems', model.user.orders.orderItems);
  },

});
