import { showCarsPage } from "./pages/carsPage.js";
import { showSignInForm } from "./pages/signInForm.js";

document.addEventListener('DOMContentLoaded', () => {
  const isUserSignedIn = !!localStorage.getItem('userToken');

  isUserSignedIn ? showCarsPage() : showSignInForm();
});