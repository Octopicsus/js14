import { showCarsPage } from './carsPage.js';
import {users} from '../data.js';
import { isSignInFormValid } from '../helpers/validators.js';
import { showError } from '../helpers/domHelpers.js';

export const showSignInForm = () => {
  const parent = document.querySelector('#root');
  const signInFormContent = `
    <form>
      <div class="hidden error"></div>
      <div>
        <input type="text" name="login" placeholder="Login" />
        <span class="hidden error login-error"></span>
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" />
        <span class="hidden error password-error"></span>
      </div>
      <button type="button">Sign In</button>
    </form>
  `;

  const signInForm = document.createElement('div');
  signInForm.classList.add('sign-in');
  signInForm.innerHTML = signInFormContent;
  signInForm.addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON') {
      handleSignInButton();
    }
  })
  parent.appendChild(signInForm);
}

function handleSignInButton() {
  const form = document.forms[0];

  const login = form.login.value;
  const password = form.password.value;

  
  if (!isSignInFormValid({ login, password })) {
    showError('Incorrect data');
  } else {
    const isUserReal = users.findIndex(user => user.login === login && user.password === password);
    
    if (isUserReal === -1) {
      showError('Incorrect login or password');
    } else {
      // IF FORM IS VALID
      localStorage.setItem('userToken', 'ok')
      showCarsPage();
    }
  }
}

