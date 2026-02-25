import { Cart } from '../models/Cart.js';
import { User } from '../models/User.js';

export const renderNavbar = (activePage = 'home') => {
  const container = document.getElementById('navbar-container');
  if (!container) return;

  const user = User.getLoggedInUser();
  const cart = new Cart();
  const cartCount = cart.getCount();
  const userName = user ? user.name : 'Guest';

  container.innerHTML = `
    <nav class="navbar">
      <a href="home.html" class="navbar__logo">Sport<span>Zone</span></a>
      <div class="navbar__links">
        <a href="home.html" class="${activePage === 'home' ? 'active' : ''}" id="nav-home">Home</a>
        <a href="#contact" class="${activePage === 'contact' ? 'active' : ''}" id="nav-contact">Contact</a>
        <a href="cart.html" class="navbar__cart" id="nav-cart">
          <i class="fa-solid fa-cart-shopping"></i>
          ${cartCount > 0 ? `<span class="navbar__cart-badge" id="cart-badge">${cartCount}</span>` : ''}
        </a>
        <span class="navbar__user" id="nav-username"><i class="fa-solid fa-user"></i> ${userName}</span>
        <button class="navbar__logout" id="logout-btn">Logout</button>
      </div>
    </nav>
  `;

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      User.logout();
      window.location.href = 'login.html';
    });
  }
};

export const updateCartBadge = () => {
  const cart = new Cart();
  const badge = document.getElementById('cart-badge');
  const cartLink = document.getElementById('nav-cart');
  const count = cart.getCount();

  if (badge) {
    if (count > 0) {
      badge.textContent = count;
    } else {
      badge.remove();
    }
  } else if (count > 0 && cartLink) {
    const span = document.createElement('span');
    span.className = 'navbar__cart-badge';
    span.id = 'cart-badge';
    span.textContent = count;
    cartLink.appendChild(span);
  }
};
