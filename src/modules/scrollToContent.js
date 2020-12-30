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
export default scrolltoContent;