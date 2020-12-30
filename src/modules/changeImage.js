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
export default changeImage;
