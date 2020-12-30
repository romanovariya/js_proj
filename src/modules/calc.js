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
		animateValue(totalValue, 0, total, 1000);

	};

	calcBlock.addEventListener('input', event => {
		const target = event.target;
		if (target === calcType || target === calcSquare ||
			target === calcDay || target === calcCount) {
			countSum();
		}


	});

};
export default calc;
