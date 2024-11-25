import Ember from 'ember';
import FetchAuthMixin from '../../mixins/Authmixin';

export default Ember.Controller.extend(FetchAuthMixin, {
    isChangePasswordModalOpen: false,
    responseMessage: null,
    showSuccessMessage: false,
    showErrorMessage: false,
    oldPassword: '',
    newPassword: '',

    actions: {
        openChangePasswordModal() {
            this.set('isChangePasswordModalOpen', true);
        },

        closeChangePasswordModal() {
            this.set('isChangePasswordModalOpen', false);
            this.set('oldPassword', '');
            this.set('newPassword', '');
        },

        changePassword(event) {
            if (event) {
                event.preventDefault();
            }

            const payload = {
                oldPassword: this.get('oldPassword'),
                newPassword: this.get('newPassword')
            };

            const userId = this.get('model.profile.userId');
            const url = `http://localhost:8080/api/v1/users/${userId}`;

            this.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(payload), headers: {}
            })
            .then((parsedResponse) => {
                if (parsedResponse.message) {
                    this.set('responseMessage', parsedResponse.message);
                    this.set('showSuccessMessage', true);
                }
                setTimeout(() => {
                    this.set('showSuccessMessage', false);
                    this.send('closeChangePasswordModal');
                }, 1000);
            })
            .catch((error) => {
                this.set('responseMessage', error);
                this.set('showErrorMessage', true);
                setTimeout(() => {
                    this.set('showErrorMessage', false);
                }, 1500);
            });
        },
    }
});
