window.addEventListener('DOMContentLoaded', function () { 
    'use strict';


    //timer
    function countTimer(deadline) { 
        let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() { 
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            
            if (timeRemaining <= 0) {
                hours = '00';
                minutes = '00';
                seconds = '00';
            }

            function checkLength(num) { 
                if (num < 10) {
                    num = `0${num}`;
                } else {
                    num = num;
                }
                return num;
            }
            seconds = checkLength(seconds);
            hours = checkLength(hours);
            minutes = checkLength(minutes);
            
            return {timeRemaining, hours, minutes, seconds};
        }

        function updateclock() { 
            let timer = getTimeRemaining(),
                timerId;
            
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
            if(timer.timeRemaining > 0) {
                timerId = setInterval(updateclock, 1000);
            } else {
                clearInterval(timerId);
            }
        }
        updateclock();
    }

    countTimer('16 december 2020');
 });