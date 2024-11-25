import Ember from 'ember';

export default Ember.Controller.extend({
  newUsername: '',
  newName: '',
  newMobileNo: '',
  newPassword: '',
  responseMessage: '', 

  actions: {
    setNewUsername(value) {
      this.set('newUsername', value);
    },
    setNewName(value) {
      this.set('newName', value);
    },
    setNewMobileNo(value) {
      this.set('newMobileNo', value);
    },
    setNewPassword(value) {
      this.set('newPassword', value);
    },
    signup(event) {
      if (event) {
        event.preventDefault();
      }

      // Input validation
      if (!this.get('newUsername') || !this.get('newPassword') || !this.get('newName') || !this.get('newMobileNo')) {
        this.set('responseMessage', 'All fields are required.');
        return; 
      }

      const password = this.get('newPassword');
      if (password && password.includes(' ')) {
        this.set('showErrorMessage', true);
        this.set('responseMessage', 'Password cannot contain spaces.');
        return;
      }

      const payload = {
        username: this.get('newUsername'),
        encryptedPwd: this.get('newPassword'),
        name: this.get('newName'),
        mobileno: this.get('newMobileNo'),
      };

      fetch('http://localhost:8080/api/v1/users/signup', {
        method: 'POST',
        headers: {},
        body: JSON.stringify(payload),
      })
        .then((response) => {
          return response.json().then((parsedResponse) => {
            if (!response.ok) {
              throw parsedResponse;
            }
            return parsedResponse;
          });
        })
        .then((parsedResponse) => {
          if (parsedResponse.message) {
            this.set('showSuccessMessage', true);
            this.set('responseMessage', parsedResponse.message);
            setTimeout(() => this.set('showSuccessMessage', false), 1000);
          }
          this.set('newUsername', '');
          this.set('newPassword', '');
          this.set('newMobileNo', '');
          this.set('newName', '');
          this.transitionToRoute('login');
        })
        .catch((error) => {
          const errorMessage = error.error || 'Unknown error'; 
          const value = error.value || ''; 
          this.set('showErrorMessage', true);
          this.set('responseMessage', `${errorMessage} ${value}`);
          setTimeout(() => this.set('showErrorMessage', false), 1000);
        });
      }      
  }
});
