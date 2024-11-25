import Ember from 'ember';
import FetchAuthMixin from '../../mixins/Authmixin';
import { computed, action } from '@ember/object';

export default Ember.Controller.extend(FetchAuthMixin, {
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

    restaurantId: computed('model.restaurant.id', function () {
        return this.get('model.restaurant.id');
    }),

    user: Ember.inject.service(),

    userData: computed('user.userData', function () {
        return this.get('user').getUserData();
    }),

    actions: {
        goBack() {
            window.history.back();
        },
        closeModal() {
            this.set('showCheckoutModal', false);
        },

        proceedToPay(order) {
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

        confirmPayment(order) {
            let orderItems = order.orderItems.map(item => {
                return {
                    foodItemId: item.foodItemId,
                    quantity: item.quantity
                };
            });

            let payload = {
                restaurantId: order.restaurantId,
                orderItems: orderItems
            };

            const userId = this.get('userData.userId');
            const restaurantId = order.restaurantId;

            // Step 1:  Fetch user's default address
            this.fetchWithAuth(`http://localhost:8080/api/v1/users/${userId}/addresses?isDefault=true`, {
                method: 'GET', headers: {}
            }).then(userAddress => {
                // Step 3: Fetch restaurant details
                return this.fetchWithAuth(`http://localhost:8080/api/v1/restaurants/${restaurantId}`, {
                    method: 'GET', headers: {}
                }).then(restaurantData => {
                    // Step 4: Compare locations
                    if (userAddress.location === restaurantData.location) {
                        // Proceed with payment if locations match
                        let updatePayload = { isCompleted: 1 };

                        this.fetchWithAuth(`http://localhost:8080/api/v1/users/${userId}/orders/${order.orderId}`, {
                            method: 'PUT',
                            body: JSON.stringify(updatePayload), headers: {}
                        })
                            .then((data) => {
                                if (data.message === "Order updated successfully") {
                                    const orders = this.get('orders');
                                    const updatedOrders = orders.filter(a => String(a.orderId) !== String(order.orderId));
                                    this.set('orders', updatedOrders);
                                    this.set('responseMessage', data.message);
                                    this.set('showSuccessMessage', "Order placed successfully!");
                                }
                                setTimeout(() => {
                                    this.set('showSuccessMessage', false);
                                    this.set('showCheckoutModal', false);
                                }, 1000);
                            })
                            .catch((error) => {
                                this.set('responseMessage', error);
                                this.set('showErrorMessage', true);
                                setTimeout(() => {
                                    this.set('showErrorMessage', false);
                                }, 3000);
                            });
                    } else {
                        alert("Restaurant unavailable in your current location.");
                    }
                });
            });
        },


        removeCartOrder(order) {
            const userId = this.get('userData.userId');
            const orderId = order.orderId;

            this.fetchWithAuth(`http://localhost:8080/api/v1/users/${userId}/orders/${orderId}`, {
                method: 'DELETE', headers: {}
            })
                .then(response => {
                    if (response.message === "Cart deleted successfully.") {
                        const orders = this.get('orders');
                        const updatedOrders = orders.filter(a => String(a.orderId) !== String(orderId));
                        this.set('orders', updatedOrders);

                        this.set('responseMessage', response.message);
                        this.set('showSuccessMessage', true);
                        setTimeout(() => {
                            this.set('showSuccessMessage', false);
                        }, 1000);
                    } else {
                        this.set('responseMessage', response.error || "Failed to delete cart.");
                        this.set('showErrorMessage', true);
                    }
                })
                .catch(error => {
                    this.set('responseMessage', "Failed to delete cart.");
                    this.set('showErrorMessage', true);
                    setTimeout(() => {
                        this.set('showErrorMessage', false);
                    }, 3000);
                });
        },



        updateOrderItem(item) {
            const userId = this.get('userData.userId');
            const orderId = item.orderId;
            const orderItemId = item.orderItemId;

            if (!item.quantity || item.quantity <= 0) {
                alert('Please enter a valid quatity!');
                return;
            }

            const payload = { quantity: parseInt(item.quantity) };
            const url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}/orderitems/${orderItemId}`;
            const options = {
                method: 'PUT',
                headers: {},
                body: JSON.stringify(payload),
            };

            this.fetchWithAuth(url, options)
                .then(parsedResponse => {
                    if (parsedResponse.message) {
                        this.set('responseMessage', parsedResponse.message);
                        this.set('showSuccessMessage', true);
                    }
                    setTimeout(() => {
                        this.set('showSuccessMessage', false);
                    }, 1000);
                })
                .catch(error => {
                    this.set('responseMessage', error);
                    this.set('showErrorMessage', true);
                    setTimeout(() => {
                        this.set('showErrorMessage', false);
                    }, 1000);
                });
        },



        deleteOrderItem(item) {
            var userId = this.get('userData.userId');
            var orderId = item.orderId;
            var orderItemId = item.orderItemId;

            var url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}/orderitems/${orderItemId}`;

            this.fetchWithAuth(url, { method: 'DELETE', headers: {} })
                .then(response => {
                    if (response.message === "Cart item deleted successfully.") {
                        var orders = this.get('orders');

                        var updatedOrders = orders.map(order => {
                            if (order.orderId === orderId) {
                                return Object.assign({}, order, {
                                    orderItems: order.orderItems.filter(i => i.orderItemId !== orderItemId)
                                });
                            }
                            return order;
                        });
                        // Filter out the order if it has no items left
                        updatedOrders = updatedOrders.filter(order => order.orderItems.length > 0);
                        this.set('orders', updatedOrders);

                        this.set('responseMessage', response.message);
                        this.set('showSuccessMessage', true);
                        setTimeout(() => {
                            this.set('showSuccessMessage', false);
                        }, 1000);
                    } else {
                        this.set('responseMessage', response.error || "Failed to delete item.");
                        this.set('showErrorMessage', true);
                        setTimeout(() => {
                            this.set('showErrorMessage', false);
                        }, 3000);
                    }
                })
                .catch(error => {
                    console.error("Error deleting order item:", error);
                    this.set('responseMessage', "Failed to delete item.");
                    this.set('showErrorMessage', true);
                    setTimeout(() => {
                        this.set('showErrorMessage', false);
                    }, 3000);
                });
        }

    }
});
