export const cleanPage = () => {
  document.querySelector('#root').innerHTML = '';
}

export const showError = (errorMessage) => {
  const errorBlock = document.querySelector('.error');
  errorBlock.textContent = errorMessage;
  errorBlock.classList.remove('hidden');
}