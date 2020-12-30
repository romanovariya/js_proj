const validation = () => {
	const calcBlock = document.querySelector('.calc-block');

	calcBlock.addEventListener('input', e => {
		if (e.target.matches('input')) {
			e.target.value = e.target.value.replace(/[\D]/, '');
		}
	});
};
export default validation;
