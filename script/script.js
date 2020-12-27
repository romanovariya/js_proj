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
		const body = document.querySelector('body'),
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		body.addEventListener('click', event => {
			const target = event.target;

			if (target.closest('.menu') || target.closest('menu')) {
				handlerMenu();
			} else if (menu.classList.contains('active-menu')) {
				handlerMenu();
			}
		});
	};

	toggleMenu();

	//popup

	const togglePopup = () => {

		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content');

		popupContent.style.position = 'absolute';
		popupContent.style.left = '-38%';
		popupContent.style.transform = 'translateX(-50%)';

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				const position = parseFloat(popupContent.style.left);

				const startTime = new Date().getTime();
				const movePopup = () => {
					const now = new Date().getTime();
					const newPosition = (position + ((now - startTime) / 1000) * 100);
					popupContent.style.left = newPosition + "%";

					if (newPosition < 50) {
						requestAnimationFrame(movePopup);
					}
				};
				movePopup();
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
				popupContent.style.left = '-38%';
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					popup.style.display = 'none';
					popupContent.style.left = '-38%';
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
			totalValue = document.getElementById('total'),
			calcCount = document.querySelector('.calc-count');


		const countSum = () => {

			let total = 0,
				countValue = 1,
				dayValue = 1,
				interval;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;
			clearInterval(interval);
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
			const animateValue = (obj, start, end, duration) => {
				let startTimestamp = null;
				const step = timestamp => {
					if (!startTimestamp) {
						startTimestamp = timestamp;
					}
					const progress = Math.min((timestamp - startTimestamp) / duration, 1);
					obj.innerHTML = Math.floor(progress * (end - start) + start);
					if (progress < 1) {
						window.requestAnimationFrame(step);
					}
				};
				window.requestAnimationFrame(step);
			};
			animateValue(totalValue, 0, total, 2000);

		};

		calcBlock.addEventListener('input', event => {
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

			target.appendChild(statusMessage);
			const inputs = target.querySelectorAll('input');
			const preloader = document.createElement('div');
			preloader.classList.add('sk-rotating-plane');
			preloader.style.cssText = `width: 4em; height: 4em; margin: auto; background-color: #337ab7; 
			-webkit-animation: sk-rotating-plane 1.2s infinite ease-in-out;
			animation: sk-rotating-plane 1.2s infinite ease-in-out;`;
			preloader.animate([
				{ transform: 'perspective(120px) rotateX(0deg) rotateY(0deg)' },
				{ transform: 'perspective(120px) rotateX(-180.1deg) rotateY(0deg)' },
				{ transform: 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)' }
			], {
				duration: 2000,
				iterations: Infinity
			});
			statusMessage.appendChild(preloader);
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


	//smooth-scroll

	const scrollMenuLinks = () => {
		const menu = document.querySelector('menu');

		menu.addEventListener('click', event => {
			event.preventDefault();
			const target = event.target;

			if (target.closest('a')) {
				const blockID = target.getAttribute('href').substr(1);
				document.getElementById(blockID).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});

	};
	scrollMenuLinks();

	const scrolltoContent = () => {
		const scrollBtn = document.querySelector('a[href="#service-block"]');
		scrollBtn.addEventListener('click', event => {
			event.preventDefault();
			document.getElementById('service-block').scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};

	scrolltoContent();

});
