document.addEventListener('DOMContentLoaded', () => {

//tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items'),
          tabsContent = document.querySelectorAll('.tabcontent');

    function hide () {
        tabsContent.forEach(item => {
            item.classList.remove("show");
            item.classList.add("hide");

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function show (i=0) {
        hide();
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');

        tabs[i].classList.add('tabheader__item_active');
    }

    show();

    tabsParent.addEventListener ('click', (event) => {
        let target = event.target;
        if (target&&target.classList.contains('tabheader__item')) {
            tabs.forEach((item,i) => {
                if (item == target) {
                    show(i);
                }
            });
        }
    });



// timer
    const deadline = '2021-04-11';

    function getTimeRemaining (endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 *24)),
            hours = Math.floor(t / (1000*60 *60) %24),
            minutes = Math.floor(t / (1000*60) % 60),
            seconds = Math.floor((t / 1000) %60);


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        
    }

    function getZero (num) {
        if (num >= 0 && num < 10) {
            num = `0${num}`;
        }
        return num;
    }

    function setClock (selector, endtime) {
        
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();      

        function updateClock () {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        
            if (t <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock ('.timer', deadline);

    

     // Modal

    const modalShow = document.querySelectorAll('[data-modal'),
          modalHide = document.querySelector('[data-close'),
          modalWindow = document.querySelector('.modal');
    

    function showModal () {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerShow);
    }
    
    modalShow.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal();
        });
    });

    function hideModal () {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    
    }

    modalHide.addEventListener('click', hideModal);
    
    

    modalWindow.addEventListener ('click', (e) => {
        if (e.target === modalWindow) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && !modalWindow.classList.contains('hide')) {
            hideModal();
        }
    });

    const modalTimerShow = setTimeout(showModal, 5000);


    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
        
    }
    window.addEventListener('scroll', showModalByScroll);


    // add cards

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }   
            
        changeToUAH() {
            this.price = this.price * this.transfer;
        }


        addCards () {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(div);
        }
    }

    new MenuCard (
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).addCards();

    new MenuCard (
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        11,
        ".menu .container"
    ).addCards();

    new MenuCard (
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков`,
        8,
        ".menu .container"
    ).addCards();


});


