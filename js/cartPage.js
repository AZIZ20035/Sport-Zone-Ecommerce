import { renderNavbar, updateCartBadge } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { initScrollToTop } from './components/scrollTop.js';
import { Cart } from './models/Cart.js';
import { requireAuth, $, formatPrice } from './utils/helpers.js';

const currentUser = requireAuth();
const cart = new Cart();

const init = () => {
  renderNavbar('cart');
  renderFooter();
  initScrollToTop();
  renderCart();
};

const renderCart = () => {
  const itemsContainer = $('#cart-items');
  const summaryContainer = $('#cart-summary');

  if (!cart.hasItems()) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Your cart is empty</p>
        <a href="home.html" class="btn btn--primary" style="display:inline-flex;width:auto;">
          <i class="fa-solid fa-arrow-left"></i> Continue Shopping
        </a>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  itemsContainer.innerHTML = cart.items
    .map(
      ({ id, name, price, image, qty }) => `
      <div class="cart-item" id="cart-item-${id}">
        <img src="${image}" alt="${name}" class="cart-item__image">
        <div class="cart-item__info">
          <h3 class="cart-item__name">${name}</h3>
          <p class="cart-item__price">${formatPrice(price)}</p>
        </div>
        <div class="cart-item__qty">
          <button class="cart-item__qty-btn" data-action="decrease" data-id="${id}">-</button>
          <span class="cart-item__qty-value">${qty}</span>
          <button class="cart-item__qty-btn" data-action="increase" data-id="${id}">+</button>
        </div>
        <button class="cart-item__remove" data-id="${id}" title="Remove item">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `
    )
    .join('');

  const total = cart.getTotal();
  summaryContainer.innerHTML = `
    <div class="cart-summary">
      <div class="cart-summary__total">
        Total: <span>${formatPrice(total)}</span>
      </div>
      <button class="btn btn--blue" id="buy-now-btn">
        <i class="fa-solid fa-bag-shopping"></i> Buy Now
      </button>
    </div>
  `;

  itemsContainer.querySelectorAll('.cart-item__qty-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id, 10);
      const action = btn.dataset.action;
      const item = cart.items.find((i) => i.id === productId);

      if (item) {
        const newQty = action === 'increase' ? item.qty + 1 : item.qty - 1;
        cart.updateQuantity(productId, newQty);
        updateCartBadge();
        renderCart();
      }
    });
  });

  itemsContainer.querySelectorAll('.cart-item__remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id, 10);
      cart.removeItem(productId);
      updateCartBadge();
      renderCart();
    });
  });

  $('#buy-now-btn').addEventListener('click', () => {
    cart.clear();
    window.location.href = 'order-shipped.html';
  });
};

init();
