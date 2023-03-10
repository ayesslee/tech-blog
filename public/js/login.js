// function to connect to login handlebar
const loginFormHandler = async (event) => {
  event.preventDefault();

  // get data from login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          // if successful, go to profile page
          document.location.replace('/profile');
      } else {
          alert(response.statusText);
      }
  }
};

// function to connect to signup handlebar
const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const name = document.querySelector('#name-signup').value.trim();

  if (name && email && password) {
      const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/profile');
      } else {
          alert(response.statusText);
      }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);