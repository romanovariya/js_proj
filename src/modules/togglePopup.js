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

	const clearInput = () => {
		const inputs = popupContent.querySelectorAll('input');
		inputs.forEach(elem => {
			elem.value = '';
		});

	};

	popup.addEventListener('click', event => {
		let target = event.target;

		if (target.classList.contains('popup-close')) {
			popup.style.display = 'none';
			popupContent.style.left = '-38%';
			clearInput();
		} else {
			target = target.closest('.popup-content');
			if (!target) {
				popup.style.display = 'none';
				popupContent.style.left = '-38%';
				clearInput();
			}
		}
	});

};

export default togglePopup;
