import { renderNavbar, updateCartBadge } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { Slider } from './components/slider.js';
import { initScrollToTop } from './components/scrollTop.js';
import { createProductList } from './models/Product.js';
import { Cart } from './models/Cart.js';
import { requireAuth, $, $$ } from './utils/helpers.js';

const currentUser = requireAuth();

let allProducts = [];
let activeCategory = 'All';
let priceSort = 'default';
let sizeFilter = 'all';

const init = async () => {
    renderNavbar('home');
    renderFooter();
    initScrollToTop();

    new Slider('#slider-container');

    try {
        const response = await fetch('../products.json');
        const data = await response.json();
        allProducts = createProductList(data);
        renderProducts();
    } catch (error) {
        console.error('Failed to load products:', error);
        $('#products-grid').innerHTML = '<p style="text-align:center;color:#e74c3c;">Failed to load products. Please try again.</p>';
    }

    bindFilters();
};

const renderProducts = () => {
    const grid = $('#products-grid');

    let filtered = activeCategory === 'All'
        ? [...allProducts]
        : allProducts.filter((p) => p.category === activeCategory);

    if (sizeFilter !== 'all') {
        filtered = filtered.filter((p) => p.size === sizeFilter);
    }

    if (priceSort === 'low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px 0;">No products found matching your filters.</p>';
        return;
    }

    grid.innerHTML = filtered
        .map(
            ({ id, name, price, category, image }) => `
      <div class="product-card" data-id="${id}" id="product-${id}">
        <img src="${image}" alt="${name}" class="product-card__image" loading="lazy">
        <div class="product-card__info">
          <h3 class="product-card__name">${name}</h3>
          <p class="product-card__category">${category}</p>
          <div class="product-card__bottom">
            <span class="product-card__price">$${price.toFixed(2)}</span>
            <button class="product-card__add-btn" data-id="${id}" title="Add to cart">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `
        )
        .join('');

    grid.querySelectorAll('.product-card').forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.product-card__add-btn')) return;
            const productId = card.dataset.id;
            window.location.href = `product-details.html?id=${productId}`;
        });
    });

    grid.querySelectorAll('.product-card__add-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.id, 10);
            const product = allProducts.find((p) => p.id === productId);
            if (product) {
                const cart = new Cart();
                cart.addItem(product);
                updateCartBadge();
                btn.style.background = '#2ecc71';
                btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    btn.style.background = '';
                    btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
                }, 800);
            }
        });
    });
};

const bindFilters = () => {
    $$('.filters__category-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            $$('.filters__category-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            renderProducts();
        });
    });

    $('#price-filter').addEventListener('change', (e) => {
        priceSort = e.target.value;
        renderProducts();
    });

    $('#size-filter').addEventListener('change', (e) => {
        sizeFilter = e.target.value;
        renderProducts();
    });
};

init();
