export const renderFooter = () => {
  const container = document.getElementById('footer-container');
  if (!container) return;

  container.innerHTML = `
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__brand">
          <h3>Sport<span>Zone</span></h3>
          <p>Your one-stop shop for premium sports gear, jerseys, and equipment. Quality products for every athlete.</p>
        </div>
        <div class="footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="home.html">Home</a></li>
            <li><a href="cart.html">Cart</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="footer__social">
          <h4>Follow Us</h4>
          <div class="footer__social-icons">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        &copy; ${new Date().getFullYear()} SportZone. All rights reserved.
      </div>
    </footer>
  `;
};
