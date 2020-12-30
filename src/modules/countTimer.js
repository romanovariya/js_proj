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

		const checkLength = num => num < 10 ? `0${num}` : num;
		seconds = checkLength(seconds);
		hours = checkLength(hours);
		minutes = checkLength(minutes);

		if (timeRemaining <= 0) {
			hours = '00';
			minutes = '00';
			seconds = '00';
		}


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

export default countTimer;
