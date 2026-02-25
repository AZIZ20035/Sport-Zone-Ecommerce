export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const createElement = (tag, attributes = {}, textContent = '') => {
    const el = document.createElement(tag);
    for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            el.setAttribute(key, attributes[key]);
        }
    }
    if (textContent) el.textContent = textContent;
    return el;
};

export const requireAuth = () => {
    const data = localStorage.getItem('sportzone_loggedIn');
    if (!data) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(data);
};

export const getUrlParam = (key) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
};

export const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

export const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};
