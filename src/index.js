'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import SliderCarousel from './modules/slider2';
// import slider from './modules/slider';
import changeImage from './modules/changeImage';
import validation from './modules/validation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import scrolltoContent from './modules/scrolltoContent';
import scrollMenuLinks from './modules/scrollMenuLinks';

//timer
countTimer('13 january 2021');

//меню
toggleMenu();

//popup
togglePopup();

//табы
tabs();

//слайдер
const carousel = new SliderCarousel({
    main: '.portfolio-slider',
    wrap: '.portfolio-content',
    slides: '.portfolio-item',
    prev: '#arrow-left',
    next: '#arrow-right',
    infinity: true
});
carousel.init();
// slider();

//image attribute change
changeImage();

//regexp
validation();

//калькулятор
calc(100);

//send-ajax-form
sendForm();

//smooth-scroll
scrolltoContent();

scrollMenuLinks();