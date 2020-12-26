window.addEventListener('DOMContentLoaded', () => {
	'use strict';


	//timer
	const countTimer = deadline => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000;

			let seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);

			if (timeRemaining <= 0) {
				hours = '00';
				minutes = '00';
				seconds = '00';
			}

			const checkLength = num => num < 10 ? `0${num}` : num;
			seconds = checkLength(seconds);
			hours = checkLength(hours);
			minutes = checkLength(minutes);

			return { timeRemaining, hours, minutes, seconds };
		}

		const updateclock = () => {
			const timer = getTimeRemaining();
			let timerId;

			timerHours.textContent = timer.hours;
			timerMinutes.textContent = timer.minutes;
			timerSeconds.textContent = timer.seconds;
			if (timer.timeRemaining > 0) {
				timerId = setInterval(updateclock, 1000);
			} else {
				clearInterval(timerId);
			}
		};

		updateclock();
	};

	countTimer('30 december 2020');

	//меню

	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		menu.addEventListener('click', event => {
			const target = event.target;
			if (target.matches('a')) {
				handlerMenu();
			}
		});

		btnMenu.addEventListener('click', handlerMenu);

	};

	toggleMenu();

	//popup

	const togglePopup = () => {

		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content');

		popupContent.style.position = 'absolute';
		popupContent.style.left = '50%';
		popupContent.style.transform = 'translateX(-50%)';
		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				if (document.body.clientWidth > 768) {
					popupContent.animate([
						{ left: '-38%' },
						{ left: '50%' }
					], {
						duration: 700,
						easing: 'ease-in-out',
						iterations: 1
					});
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					popup.style.display = 'none';
				}
			}


		});

	};

	togglePopup();


	//табы

	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};
		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {

				tab.forEach((item, index) => {
					if (item === target) {
						toggleTabContent(index);
					}
				});

			}
		});
	};

	tabs();

	//слайдер

	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			slider = document.querySelector('.portfolio-content'),
			ulDots = document.querySelector('.portfolio-dots');

		for (let i = 0; i < slide.length; i++) {
			const li = document.createElement('li');
			li.classList.add('dot');
			if (i === 0) {
				li.classList.add('dot-active');
			}
			ulDots.appendChild(li);
		}

		const dot = document.querySelectorAll('.dot');
		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {

			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				stopSlide();
			}

		});

		slider.addEventListener('mouseout', event => {

			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				startSlide();
			}
		});


		startSlide(1500);
	};

	slider();


	//image attribute change

	const changeImage = () => {
		const command = document.getElementById('command');
		let srcAttr;

		command.addEventListener('mouseover', e => {
			if (e.target.matches('.command__photo')) {
				srcAttr = e.target.getAttribute('src');
				e.target.src = e.target.dataset.img;
			}
		});
		command.addEventListener('mouseout', e => {
			if (e.target.matches('.command__photo')) {
				e.target.src = srcAttr;
			}
		});
	};

	changeImage();


	//regexp

	const validation = () => {
		const calcBlock = document.querySelector('.calc-block');

		calcBlock.addEventListener('input', e => {
			if (e.target.matches('input')) {
				e.target.value = e.target.value.replace(/[\D]/, '');
			}
		});
	};

	validation();

	//калькулятор

	const calc = (price = 100) => {

		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');


		const countSum = () => {

			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}

			totalValue.textContent = total;
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;

			if (target === calcType || target === calcSquare ||
				target === calcDay || target === calcCount) {
				countSum();
			}

		});

	};

	calc(100);

	//send-ajax-form

	const sendForm = () => {
		const errorMessage = 'Что-то пошло не так',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const form = document.getElementById('form1'),
			form2 = document.getElementById('form2'),
			form3 = document.getElementById('form3');


		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem;';
		form.appendChild(statusMessage);

		const postData = (body, outputData, errorData) => {
			const xhr = new XMLHttpRequest();
			xhr.addEventListener('readystatechange', () => {

				if (xhr.readyState !== 4) {
					return;
				}
				if (xhr.status === 200) {
					outputData();
				} else {
					errorData((xhr.status));
				}

			});
			xhr.open('POST', './server.php');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(body));
		};

		const body = document.querySelector('body');
		body.addEventListener('submit', event => {
			event.preventDefault();
			const target = event.target;

			if (target.closest('#form1') || target.closest('#form2') || target.closest('#form3')) {
				target.appendChild(statusMessage);
				const inputs = target.querySelectorAll('input');
				statusMessage.textContent = loadMessage;
				const formData = new FormData(target);
				const body = {};
				formData.forEach((val, key) => {
					body[key] = val;
				});
				postData(body, () => {
					statusMessage.textContent = successMessage;
					inputs.forEach(elem => {
						elem.value = '';
					});
					setTimeout(() => {
						target.removeChild(statusMessage);
					}, 5000);
				}, error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
			}

		});


		const validateInput = target => {

			if (target.classList.contains('form-phone')) {
				target.value = target.value.replace(/[^0-9+]/ig, '');
			} else if (target.classList.contains('top-form') || target.classList.contains('form-name')) {
				target.value = target.value.replace(/([^А-Яа-яёЁ ])/, '');
			} else if (target.classList.contains('mess')) {
				target.value = target.value.replace(/([^А-Яа-яёЁ ,.!?])/, '');
			}

		};

		const checkEmpty = form => {
			const inputs = form.querySelectorAll('input');
			const formBtn = form.querySelector('button');
			let empty = false;
			formBtn.disabled = false;

			inputs.forEach(elem => {
				if (elem.value.trim() === '') {
					formBtn.disabled = true;
					empty = true;
				}
			});

			if (empty === false) {
				formBtn.disabled = false;
			}
		};

		form.addEventListener('input', event => {
			const target = event.target;
			validateInput(target);
			checkEmpty(form);
		});
		form2.addEventListener('input', event => {
			const target = event.target;
			validateInput(target);
			checkEmpty(form2);
		});
		form3.addEventListener('input', event => {
			const target = event.target;
			validateInput(target);
			checkEmpty(form3);
		});

	};

	sendForm();

});
