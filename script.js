const form = document.getElementById('form');
const email = document.getElementById('email-input-field');
const button = document.getElementById('submit-button');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');


// Prevent default behaviour for the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
});
