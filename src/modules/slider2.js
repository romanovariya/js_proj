'use strict';

export default class SliderCarousel{
    constructor({
        main,
        wrap, 
        slides,
        next,
        prev, 
        infinity = false,
        position = 0,
        slidesToShow = 1
    }) {
        if(!main || !wrap) {
            console.warn('sider-carousel: Необходимо двасвойства: "main" и "wrap"');
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelectorAll(slides);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            maxPosition: this.slides.length - this.slidesToShow,
            slideWidth: Math.floor(100 / this.slidesToShow)
        };
    }
    init() {

        
        this.addGloClass();
        this.addStyles();

        if (this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrapper');

        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    addStyles() {

        const style = document.createElement('style');
        style.id = 'sliderCarousel-style';
        style.textContent = `
           .glo-slider {
               overflow: hidden !important;
           }
           .glo-slider__wrapper {
               display: flex !important;
               transition: transform 0.5s !important;
               will-change: transform !important;
           }
           .glo-slider__item {
               flex: 0 0 ${this.options.slideWidth}% !important;
               margin: auto 0 !important;
           }
        `;
        document.head.appendChild(style);
    }

    controlSlider() {
        this.prev.addEventListener('click', (e) => {
            e.preventDefault();
            this.prevSlider();
        });
        this.next.addEventListener('click', (e) => {
            e.preventDefault();
            this.nextSlider();
        });
    }

    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            console.log(this.options.position);
            if (this.options.position < 0) {
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
        }
    }

    nextSlider() {  
        if (this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position;
            console.log(this.options.position);
            if (this.options.position > this.options.maxPosition) {
                this.options.position = 0;
            }

            this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');

        style.textContent = `
            .glo-slider__prev,
            .glo-slider__next {
                margin: 0;
                border: 20px solid transparent;
                background: transparent;
            }
            .glo-slider__next {
                border-left-color: #19b5fe;
            }
            .glo-slider__prev {
                border-right-color: #19b5fe;
            }
            .glo-slider__prev:hover,
            .glo-slider__next:hover,
            .glo-slider__prev:focus,
            .glo-slider__next:focus {
                background: transparent;
                outline: transparent;
            }
        `;
        document.head.appendChild(style);
    }
}

