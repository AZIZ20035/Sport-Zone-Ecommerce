export const initScrollToTop = () => {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.id = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    document.body.appendChild(btn);

    const toggleVisibility = () => {
        const scrolled = window.scrollY > 300;
        btn.classList.toggle('visible', scrolled);
    };

    window.addEventListener('scroll', toggleVisibility);

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};
