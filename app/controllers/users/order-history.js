import Ember from 'ember';
import FetchAuthMixin from '../../mixins/Authmixin';

export default Ember.Controller.extend(FetchAuthMixin, {
    user: Ember.inject.service(),

    userData: Ember.computed('user.userData', function () {
        return this.get('user').getUserData();
    }),

    actions: {

        submitRating(order) {
            let newRating = parseFloat(document.getElementById(`rating-${order.orderId}`).value);
            newRating = parseFloat(newRating.toFixed(1));

            if (newRating && newRating >= 1 && newRating <= 5) {
                let payload = {
                    rating: newRating
                };
                let userId = this.get('userData.userId');
                let orderId = order.orderId;

                let url = `http://localhost:8080/api/v1/users/${userId}/orders/${orderId}`;
                this.fetchWithAuth(url, {
                    method: 'PUT',
                    body: JSON.stringify(payload), headers: {}
                })
                    .then(data => {
                        Ember.set(order, 'rating', newRating);
                        Ember.set(order, 'newRating', null);
                        this.set('responseMessage', "Rating Submitted successfully");
                        this.set('showSuccessMessage', true);
                        setTimeout(() => {
                            this.set('showSuccessMessage', false);
                        }, 1000);
                    })
                    .catch(error => {
                        this.set('errorMessage', error || 'Failed to submit rating. Please try again.');
                    });
            } else {
                this.set('errorMessage', 'Please enter a valid rating between 1 and 5.');
            }
        }
    }
});
