window.addEventListener('DOMContentLoaded', function () { 
    'use strict';


    //timer
    const countTimer = (deadline) => {
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

            const checkLength = num => num < 10 ? `0${num}` : num;
            seconds = checkLength(seconds);
            hours = checkLength(hours);
            minutes = checkLength(minutes);
            
            return {timeRemaining, hours, minutes, seconds};
        }

        const updateclock = () => {
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
        };
        
        updateclock();
    };

    countTimer('30 december 2020');

    //меню

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        menu.addEventListener('click', (event) => {
            let target = event.target;
                if(target.matches('a')) {
                    handlerMenu();
                }
        });
            
        btnMenu.addEventListener('click', handlerMenu);

    };

    toggleMenu();

    //popup
 
    const togglePopup = () => {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        popupContent.style.position = 'absolute';
        popupContent.style.left = '50%';
        popupContent.style.transform = 'translateX(-50%)';
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (document.body.clientWidth > 768) {
                    popupContent.animate([
                    { left: '-38%' }, 
                    { left: '50%' }
                ], {
                    duration: 700,
                    easing: 'ease-in-out',
                    iterations: 1
                });
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popup.style.display = 'none'; 
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none'; 
            }
            }

            
        });

    };

    togglePopup();


    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');

            if(target) {

                tab.forEach((item, index) => {
                    if(item === target) {
                        toggleTabContent(index);
                    }
                });

            }
        });
    };

    tabs();
});

 