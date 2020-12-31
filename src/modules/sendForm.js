const sendForm = () => {
	const errorMessage = 'Что-то пошло не так',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const form = document.getElementById('form1'),
		form2 = document.getElementById('form2'),
		form3 = document.getElementById('form3');


	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = `font-size: 2rem; color: #d7d7d7`;
	form.appendChild(statusMessage);

	const postData = body =>  fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	const body = document.querySelector('body');
	body.addEventListener('submit', event => {
		event.preventDefault();
		const target = event.target;

		target.appendChild(statusMessage);
		statusMessage.textContent = '';
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
		postData(body)
			.then(response => {
				if (response.status !== 200) {
					throw new Error('status network not 200');
				} else {
					statusMessage.removeChild(preloader);
					statusMessage.textContent = successMessage;
					inputs.forEach(elem => {
						elem.value = '';
					});
					setTimeout(() => {
						target.removeChild(statusMessage);
					}, 3000);
				}

			})
			.catch(error => {
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
export default sendForm;
