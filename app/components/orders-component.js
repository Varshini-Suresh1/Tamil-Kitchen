import Component from '@ember/component';
import { computed, action } from '@ember/object';

export default Component.extend({
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
  
    restaurantId: computed('model.restaurant.id', function() {
        return this.get('model.restaurant.id');
    }),
    
    user: Ember.inject.service(),
  
    userData: computed('user.userData', function() {
        return this.get('user').getUserData();
    }),
  
    actions: {
        acceptOrder(order) {
            this.get('acceptOrder')(order);
        },
        
        rejectOrder(order) {
            this.get('rejectOrder')(order);
        },
        
        submitRating(order) {
            this.get('submitRating')(order);
        },
        closeModal() {
            this.set('showCheckoutModal', false);
        },
        paymentDetails(order) {
            let totalAmount = 0;
            order.orderItems.forEach(item => {
                totalAmount += item.quantity * item.price;
            });

            let discount = totalAmount > 500 ? totalAmount * 0.30 : 0;
            let discountedPrice = totalAmount - discount;
            let serviceTax = discountedPrice * 0.10;
            let deliveryFee = 30;
            let finalPrice = discountedPrice + serviceTax + deliveryFee;

            this.setProperties({
                selectedOrder: order,
                showCheckoutModal: true,
                finalPrice,
                totalAmount,
                discountedPrice,
                discount,
                serviceTax,
                deliveryFee
            });
        },
    }
});
