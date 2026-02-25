import { User } from './models/User.js';
import { $ } from './utils/helpers.js';

const form = $('#login-form');
const generalError = $('#general-error');

const showError = (fieldName, message) => {
    const input = $(`#${fieldName}`);
    const errorEl = $(`#${fieldName}-error`);
    if (input) input.classList.add('error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
    }
};

const clearError = (fieldName) => {
    const input = $(`#${fieldName}`);
    const errorEl = $(`#${fieldName}-error`);
    if (input) input.classList.remove('error');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    ['email', 'password'].forEach((f) => clearError(f));
    generalError.textContent = '';
    generalError.classList.remove('visible');

    const email = $('#email').value.trim();
    const password = $('#password').value;

    let hasError = false;

    if (!email) {
        showError('email', 'Email is required');
        hasError = true;
    }

    if (!password) {
        showError('password', 'Password is required');
        hasError = true;
    }

    if (hasError) return;

    const { success, message } = User.authenticate(email, password);

    if (!success) {
        generalError.textContent = message;
        generalError.classList.add('visible');
        return;
    }

    window.location.href = 'home.html';
});
