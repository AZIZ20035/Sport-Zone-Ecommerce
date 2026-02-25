import { User } from './models/User.js';
import { $ } from './utils/helpers.js';

const form = $('#register-form');
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

const clearAllErrors = () => {
    const fields = ['name', 'email', 'password', 'confirmPassword'];
    fields.forEach((field) => clearError(field));
    generalError.textContent = '';
    generalError.classList.remove('visible');
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors();

    const name = $('#name').value;
    const email = $('#email').value;
    const password = $('#password').value;
    const confirmPassword = $('#confirm-password').value;

    const user = new User({ name, email, password });

    const { valid, errors } = user.validate(confirmPassword);

    if (!valid) {
        for (const field in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, field)) {
                showError(field, errors[field]);
            }
        }
        return;
    }

    const result = user.save();

    if (!result.success) {
        generalError.textContent = result.message;
        generalError.classList.add('visible');
        return;
    }

    window.location.href = 'login.html';
});

const inputFields = ['name', 'email', 'password', 'confirm-password'];
inputFields.forEach((id) => {
    const input = $(`#${id}`);
    if (input) {
        input.addEventListener('blur', () => {
            const fieldName = id === 'confirm-password' ? 'confirmPassword' : id;
            clearError(fieldName);
        });
    }
});
