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