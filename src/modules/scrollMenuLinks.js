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
export default scrollMenuLinks;

