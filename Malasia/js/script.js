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
const TEXT = document.querySelector('.image__text');
const STR_TEXT = TEXT.textContent;
const SPLIT_TEXT = STR_TEXT.split('');

TEXT.textContent = '';

for (let i = 0; i < SPLIT_TEXT.length; i++) {
	TEXT.innerHTML += `<span>${SPLIT_TEXT[i]}</span>`;
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
	const span = TEXT.querySelectorAll('span')[char];
	span.classList.add('fade');
	char++;
	if (char === SPLIT_TEXT.length) {
		complete();
		return;
	}
}

function complete() {
	clearInterval(timer);
	timer = null;
};
function scrollAppear(target) {
	var block = document.querySelector(target);

	var blockPosition = block.getBoundingClientRect().top;
	var screenPosition = window.innerHeight / 2;

	if (blockPosition < screenPosition) {
		block.classList.add('appear');
	}
}

window.addEventListener('scroll', () => {
	scrollAppear('.fact-block__text');
	scrollAppear('.fact-block__text-study');
	scrollAppear('.fact-block__text-food');
	scrollAppear('.fact-block__image');
	scrollAppear('.fact-block__image-study');
	scrollAppear('.fact-block__image-food');
});
;


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