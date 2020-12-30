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

export default toggleMenu;
