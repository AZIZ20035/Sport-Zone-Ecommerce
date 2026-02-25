import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { initScrollToTop } from './components/scrollTop.js';
import { requireAuth } from './utils/helpers.js';

const currentUser = requireAuth();

renderNavbar('');
renderFooter();
initScrollToTop();
