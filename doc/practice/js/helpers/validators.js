const signInValidators = {
  login: {
    regExp: /^\w{5,10}$/,
    errorMessage: 'Login is incorrect',
    errorElementSelector: '.login-error',
  },
  password: {
    regExp: /^.{5,10}$/,
    errorMessage: 'Password is incorrect',
    errorElementSelector: '.password-error',
  },
};

const carsValidators = {
  brand: {
    regExp: /^[A-Za-z ]{2,10}$/,
    errorMessage: 'Brand is incorrect',
    errorElementSelector: '.brand-error'
  },
  model: {
    regExp: /^[A-Za-z0-9 ]{2,20}$/,
    errorMessage: 'Model is incorrect',
    errorElementSelector: '.model-error'
  },
  type: {
    regExp: /^[A-Za-z ]{2,10}$/,
    errorMessage: 'Complectation is incorrect',
    errorElementSelector: '.type-error'
  },
  description: {
    regExp: /^.{5,50}$/,
    errorMessage: 'Description is incorrect',
    errorElementSelector: '.description-error'
  },
  price: {
    regExp: /^\d{4,7}$/,
    errorMessage: 'Price is incorrect',
    errorElementSelector: '.price-error'
  }
};

function isValid(data, validator) {
  let errors = false;

  for (let key in data) {
    if (!validator[key].regExp.test(data[key])) {
      errors = true;
      const errorElement = document.querySelector(validator[key].errorElementSelector);
      errorElement.classList.remove('hidden');
      errorElement.textContent = validator[key].errorMessage;
    }
  }

  return !errors;
}

/**
 * 
 * @param {login, password} data 
 * @returns boolean
 */

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const isSignInFormValid = (data) => {
  return isValid(data, signInValidators);
  // const passwordRegExp = /^.{5,10}$/;

  // const isLoginValid = loginRegExp.test(login);
  // const isPasswordValid = passwordRegExp.test(password);
  // if (!isLoginValid || !isPasswordValid) {
  //   return false;
  // }

  // return true;
};

export const isCarEditFormValid = (data) => {
  return isValid(data, carsValidators);
}