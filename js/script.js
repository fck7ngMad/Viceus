function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});;
const LOGO = document.querySelector('.menu__logo');
const MENU = document.querySelector('.menu');
const MENU_LIST = document.querySelector('.menu__list-body');
const FULL_SCREEN_BACK = document.querySelector('.fullscreen__back');
const FULL_SCREEN_TITLE = document.querySelector('.fullscreen__title');
const FULL_SCREEN_TEXT = document.querySelector('.fullscreen__text');
const SMOOTH_LINKS_BODY = document.querySelector('.smooth-links-body');

const TL = new TimelineMax();

TL.fromTo(FULL_SCREEN_BACK, 1, { height: '0%' }, { height: '100%', ease: Power2.easeInOut })
	.fromTo(FULL_SCREEN_BACK, 1.2, { width: '30%' }, { width: '100%', ease: Power2.easeInOut })
	.fromTo(MENU, 1.2, { x: '-100%' }, { x: '0%', ease: Power2.easeInOut }, "-=1.2")
	.fromTo(LOGO, 1.8, { opacity: 0, x: 30 }, { opacity: 1, x: 0 })
	.fromTo(FULL_SCREEN_TITLE, 1.4, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=1.2')
	.fromTo(FULL_SCREEN_TEXT, 1.6, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=1.2')
	.fromTo(SMOOTH_LINKS_BODY, 1.8, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=1.2');
// Функция для проевления блока во время скролла
function scrollAppear() {
	var aboutUsBlock = document.querySelectorAll('.about-us__block');
	var aboutUsPositionOne = aboutUsBlock[0].getBoundingClientRect().top;
	var aboutUsPositionTwo = aboutUsBlock[1].getBoundingClientRect().top;
	var screenPosition = window.innerHeight / 2;
	console.log("1");

	if (aboutUsPositionOne < screenPosition && aboutUsPositionTwo < screenPosition) {
		aboutUsBlock[0].classList.add('about-us-appear');
		aboutUsBlock[1].classList.add('about-us-appear');
	}
}

window.addEventListener('scroll', scrollAppear);


;
function smoothScroll(target, duration) {
	var target = document.querySelector(target); 				// На кокой блок хотим пролистать
	var targetPosition = target.getBoundingClientRect().top; // Позиция относительна вверха экрана монитора
	var startPosition = window.pageYOffset;						// Начальная позиция экрана
	var distance = targetPosition - startPosition;				// Дистанция между кнопкой и блоком
	var startTime = null;												// Это протсто для requestAnimationFrame

	function animation(currentTime) {
		if (startTime === null) startTime = currentTime;
		var timeElapsed = currentTime - startTime;
		var run = ease(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation);
	}

	function ease(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}

	requestAnimationFrame(animation);
}

const LINK_1 = document.querySelector('#link-1');
const LINK_2 = document.querySelector('#link-2');
const LINK_3 = document.querySelector('#link-3');

LINK_1.addEventListener('click', () => {
	smoothScroll('.service', 1000);
});

LINK_2.addEventListener('click', () => {
	smoothScroll('.about-us', 1000);
});

LINK_3.addEventListener('click', () => {
	smoothScroll('.review', 1000);
});
;




// Чтобы менюшка проевлялась и изчезала
let lastScrolltop = 0;
let menu = document.querySelector('.menu');
let menu_dropdown_content_study = document.querySelector('.menu__dropdown-content-study');
let menu_dropdown_content_country = document.querySelector('.menu__dropdown-content-country');

window.addEventListener('scroll', () => {
	let scrollTop = window.pageXOffset || document.documentElement.scrollTop;
	if (scrollTop > lastScrolltop) {
		menu.style.top = '-60px';
		menu_dropdown_content_country.id = 'menu__link-close';
		menu_dropdown_content_study.id = 'menu__link-close';
	} else {
		menu.style.top = '0';
		menu_dropdown_content_country.removeAttribute('id');
		menu_dropdown_content_study.removeAttribute('id');
	}
	lastScrolltop = scrollTop;
});

// Код слайдера
const CAROUSEL_SLIDE = document.querySelector('.carousel__slider');
const CAROUSEL_CONTENT = document.querySelectorAll('.carousel__slider-content');

// Кнопки
const PREV__BUTTON = document.querySelector('#prevButton');
const NEXT__BUTTON = document.querySelector('#nextButton');

// Счетчик
let counter = 0;
const SIZE = CAROUSEL_CONTENT[0].clientWidth;


// Слушатели

NEXT__BUTTON.addEventListener('click', () => {
	if (counter >= CAROUSEL_CONTENT.length - 1) return;
	CAROUSEL_SLIDE.style.transition = 'transform 0.8s ease-in-out';
	counter++;
	CAROUSEL_SLIDE.style.transform = `translateX(${-SIZE * counter}px)`;
});

PREV__BUTTON.addEventListener('click', () => {
	if (counter <= 0) return;
	CAROUSEL_SLIDE.style.transition = 'transform 0.8s ease-in-out';
	counter--;
	CAROUSEL_SLIDE.style.transform = `translateX(${-SIZE * counter}px)`;
});


