window.addEventListener('DOMContentLoaded', ()=> {
    //Tabs
    const content = document.querySelectorAll('.tabcontent'),
            itemParent = document.querySelector('.tabheader__items'),
            item = document.querySelectorAll('.tabheader__item');

    function hide () {
        content.forEach ((item) => item.classList.add('hide'));
        content.forEach ((item) => item.classList.remove('show', 'fade'));
        item.forEach((i)=> i.classList.remove('tabheader__item_active'));
    }

    function show (i=0) {
       content[i].classList.add('show', 'fade');
       content[i].classList.remove('hide');
       item[i].classList.add('tabheader__item_active');
    }
    hide();
    show();

    itemParent.addEventListener('click', (event) => {
       event.preventDefault();
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            item.forEach((item,i)=> {
               if (target == item) {
                    hide();
                    show(i);
               } 
            });
        }
    });
    //Timer
    const deadline = '2023-10-01';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t/(1000*60*60*24)),
              hours = Math.floor((t/(1000*60*60)%24)),
              minutes = Math.floor((t/(1000*60))%60),
              seconds = Math.floor((t/1000)%60);
        return {
            'total':t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock () {
              const t = getTimeRemaining(endtime);
              days.innerHTML = t.days;
              hours.innerHTML = t.hours;
              minutes.innerHTML = t.minutes;
              seconds.innerHTML = t.seconds;
              }
    }
    setClock('.timer', deadline);
    
    // <<<<<<<<< Модальное окно >>>>>>>>>>>
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    
    function showModal() {
        modal.classList.add('show', 'fast_Fade'); //1-й вариант
        modal.classList.remove('hide'); //1-й вариант
        // modal.classList.toggle('show'); // 2-йварриант
        document.body.style.overflow = 'hidden'; // блокирует прокрутку страницы с активным модальным окном
        clearInterval(modalTimerId); // делается для того чтобы, если пользователь сам открыл модалку, не выскакивала скриптовая модалка
    }
    function closeModal() {
        modal.classList.add('hide'); //1-й вариант
        modal.classList.remove('show', 'fast_Fade'); //1-й вариант
        // modal.classList.toggle('show'); // 2-йварриант
        document.body.style.overflow = ''; // восстанавливает прокрутку
    } // т.к. переиспользуем данный текст много раз, заключаем его в ф-ю.


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', showModal);
    });

    modalCloseBtn.addEventListener('click', closeModal); // достаточно
    //просто передать closeModal и это будет работать, но не вызывать 

    modal.addEventListener('click', (e)=>{
        if(e.target === modal) { // при клике за пределы модалки, в серую область, закрывается модалка
            closeModal(); 
        }
   });
   document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
   }); //при клике на escape закрывается модалка 

   // задачи: 1 через опред. кол-во врем появ-ся мод. окно
   //2 мод-е о. появ-я когда стр. долистана до конца 1 раз, после чего соб-е уд-ся
   const modalTimerId = setTimeout(showModal, 5000);
   function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
   }
   window.addEventListener('scroll', showModalByScroll);

   // <<<<<<<<< Используем Классы для карточек Lesson 48, 49 >>>>>>>>>>>
class MenuCard {
    constructor (src, alt, title, descr, price, parentSelector, ...classes) {
        this.title=title;
        this.src=src;
        this.alt=alt;
        this.descr=descr;
        this.price=price;
        this.classes=classes;
        this.parent=document.querySelector(parentSelector);
        this.transfer = 27; // это к примету курс валюты пришедший с сервера
        this.changeToUSD();
    }
    changeToUSD(){
        this.price=+this.price*this.transfer; // + преобразует строку в число,
        // на всякий случай.
    }
    
    render () {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            this.element = 'menu__item'; // объявляем класс по умолчанию
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className=>element.classList.add(className));
        } // тут className это аргумент, просто такое название аргумента, и это соот-ет логике
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`; 
       this.parent.append(element);

    }
}
    new MenuCard (
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
        ).render();
    new MenuCard (
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard (
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        '.menu .container',
        'menu__item'
    ).render();
    
        //53 Реализация скрипта отправки данных на сервер

        const forms = document.querySelectorAll('form');
        
        const message = {
            loading: 'Загруска...',
            success: 'Спасибо! Мы с вами свяжемся.',
            failure: 'Что-то пошло не так.'
        };
        
        forms.forEach(item=>{
            postData(item);
        });

        function postData (form) {
            form.addEventListener('submit', e=>{
                e.preventDefault();

                const statusMesage = document.createElement('div');
                statusMesage.classList.add('status');
                statusMesage.textContent = message.loading;
                form.append(statusMesage);
            
                const request = new XMLHttpRequest();

                request.open('POST', 'server.php');

                request.setRequestHeader('Content-type', 'application/json');
                const formData = new FormData(form);
                
                const object = {};
                formData.forEach((value,key)=>object[key]=value);
                const json = JSON.stringify(object);
                request.send(json);

                request.addEventListener('load', ()=> {
                    if (request.status === 200) {
                        console.log(request.response);
                        statusMesage.textContent = message.success;
                    } else {
                        statusMesage.textContent = message.failure;
                    } form.reset();
                    setTimeout(()=>{
                        statusMesage.remove();
                    }, 3000);
                });
            });
        }
    // Урок 58. Работа с мини имитацией бекенд сервера, Json-Server - ом. Необходимо запустить сайт с Open Server или Mamp
    fetch('http://localhost:3000/menu')
    .then(data=>data.json())
    .then(res=>console.log(res));
});