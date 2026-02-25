export class Slider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.slides = [
            {
                image: 'https://images.unsplash.com/photo-1461896836934-bd45ba7b5f15?w=1400&h=500&fit=crop',
                title: 'Gear Up for <span>Victory</span>',
                subtitle: 'Premium sports equipment for champions. Shop the latest jerseys and gear.'
            },
            {
                image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1400&h=500&fit=crop',
                title: 'Play Like a <span>Pro</span>',
                subtitle: 'Official match balls, training gear, and everything you need to dominate.'
            },
            {
                image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&h=500&fit=crop',
                title: 'Train <span>Harder</span>',
                subtitle: 'High-performance sports clothing designed for maximum comfort and style.'
            }
        ];

        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.intervalDuration = 3500;

        this.#render();
        this.#bindEvents();
        this.#startAutoPlay();
    }

    #render() {
        const slidesHTML = this.slides
            .map(
                ({ image, title, subtitle }) => `
        <div class="slider__slide">
          <img src="${image}" alt="SportZone Banner" loading="lazy">
          <div class="slider__overlay">
            <h2>${title}</h2>
            <p>${subtitle}</p>
          </div>
        </div>
      `
            )
            .join('');

        const dotsHTML = this.slides
            .map(
                (_, i) =>
                    `<button class="slider__dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
            )
            .join('');

        this.container.innerHTML = `
      <div class="slider">
        <div class="slider__track">${slidesHTML}</div>
        <button class="slider__arrow slider__arrow--prev" aria-label="Previous slide">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="slider__arrow slider__arrow--next" aria-label="Next slide">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <div class="slider__dots">${dotsHTML}</div>
      </div>
    `;

        this.track = this.container.querySelector('.slider__track');
        this.dots = this.container.querySelectorAll('.slider__dot');
        this.sliderEl = this.container.querySelector('.slider');
    }

    #bindEvents() {
        const prevBtn = this.container.querySelector('.slider__arrow--prev');
        const nextBtn = this.container.querySelector('.slider__arrow--next');

        prevBtn.addEventListener('click', () => this.prev());
        nextBtn.addEventListener('click', () => this.next());

        this.dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index, 10);
                this.goTo(index);
            });
        });

        this.sliderEl.addEventListener('mouseenter', () => this.#stopAutoPlay());
        this.sliderEl.addEventListener('mouseleave', () => this.#startAutoPlay());
    }

    goTo(index) {
        this.currentIndex = index;
        const offset = -(this.currentIndex * 100);
        this.track.style.transform = `translateX(${offset}%)`;
        this.#updateDots();
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goTo(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goTo(prevIndex);
    }

    #updateDots() {
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    #startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), this.intervalDuration);
    }

    #stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}
