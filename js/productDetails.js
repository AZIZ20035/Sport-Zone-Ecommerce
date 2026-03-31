import { renderNavbar, updateCartBadge } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { Cart } from './models/Cart.js';
import { Product } from './models/Product.js';
import { requireAuth, $, getUrlParam, formatPrice } from './utils/helpers.js';

const currentUser = requireAuth();

const init = async () => {
  renderNavbar('');
  renderFooter();

  const productId = parseInt(getUrlParam('id'), 10);

  if (!productId) {
    $('#product-details').innerHTML = '<p style="text-align:center;padding:60px;color:var(--text-muted);">Product not found.</p>';
    return;
  }

  try {
    const response = await fetch('../products.json');
    const data = await response.json();

    const rawProduct = data.find((p) => p.id === productId);

    if (!rawProduct) {
      $('#product-details').innerHTML = '<p style="text-align:center;padding:60px;color:var(--text-muted);">Product not found.</p>';
      return;
    }

    const product = new Product(rawProduct);
    const { name, price, category, image, quantity, size } = product;

    $('#product-details').innerHTML = `
      <img src="${image}" alt="${name}" class="product-details__image">
      <div class="product-details__info">
        <h1 class="product-details__name">${name}</h1>
        <p class="product-details__category">${category}</p>
        <p class="product-details__price">${formatPrice(price)}</p>
        <div class="product-details__meta">
          <div class="product-details__meta-item">
            <i class="fa-solid fa-box"></i>
            <span>In Stock: ${quantity} units</span>
          </div>
          <div class="product-details__meta-item">
            <i class="fa-solid fa-ruler"></i>
            <span>Size: ${size}</span>
          </div>
          <div class="product-details__meta-item">
            <i class="fa-solid fa-tag"></i>
            <span>Category: ${category}</span>
          </div>
        </div>
        <button class="btn btn--yellow product-details__add-btn" id="add-to-cart-btn">
          <i class="fa-solid fa-cart-plus"></i> Add To Cart
        </button>
      </div>
    `;

    $('#add-to-cart-btn').addEventListener('click', () => {
      const cart = new Cart();
      cart.addItem(product);
      updateCartBadge();

      const btn = $('#add-to-cart-btn');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
      btn.style.background = '#2ecc71';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add To Cart';
        btn.style.background = '';
        btn.style.color = '';
      }, 1200);
    });
  } catch (error) {
    console.error('Error loading product:', error);
    $('#product-details').innerHTML = '<p style="text-align:center;padding:60px;color:#e74c3c;">Failed to load product.</p>';
  }
};

init();
