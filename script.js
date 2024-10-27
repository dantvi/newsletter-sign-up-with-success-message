const signUpFormEl = document.getElementById('sign-up-form');
const form = document.getElementById('form');
const userInputEl = document.getElementById('email-input-field');
const userEmailEl = document.getElementById('userEmail');
const dismissButton = document.getElementById('dismiss-button');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const imageEl = document.getElementById('sign-up-image');
const mediaQuery = window.matchMedia("(max-width: 780px)");

let showingErrorMessage = false;
let userEmail = '';

function updateImageSrc(e) {
  if (e.matches) {
    imageEl.src = './images/illustration-sign-up-mobile.svg';
  } else {
    imageEl.src = './images/illustration-sign-up-desktop.svg';
  }
}

function sendEmailToServer(email) {
  fetch('http://localhost:3000/register', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function validateEmail(email) {
  userEmail = email;
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    // Send email to server
    sendEmailToServer(userEmail);
    // Set User Email to Success Page
    userEmailEl.textContent = userEmail;
    // Show Success Page
    successMessage.classList.remove('hidden');
    // Hide Sign Up Form
    signUpFormEl.classList.add('hidden');
    if (showingErrorMessage) {
      errorMessage.classList.add('hidden');
      userInputEl.classList.remove('email-input-error');
      showingErrorMessage = false;
    }
    // Remove user mail from input field
    userInputEl.value = '';
  } else {
    // Show error message
    errorMessage.classList.remove('hidden');
    userInputEl.classList.add('email-input-error');
    showingErrorMessage = true;
  }
}

const validateForm = () => {
  const inputValue = userInputEl.value;
  // If input field is empty
  if (inputValue === '') {
    // Show error message
    errorMessage.classList.remove('hidden');
    userInputEl.classList.add('email-input-error');
    showingErrorMessage = true;
    return;
  }
  validateEmail(inputValue);
}

const processFormData = (e) => {
  e.preventDefault();
  validateForm();
}

const showLandingPage = () => {
  // Show Sign Up Form
  signUpFormEl.classList.remove('hidden');
  // Hide Success Page
  successMessage.classList.add('hidden');
}

// On Load
updateImageSrc(mediaQuery);

// Event listeners
form.addEventListener('submit', processFormData);
dismissButton.addEventListener('click', showLandingPage);
mediaQuery.addEventListener("change", updateImageSrc);
