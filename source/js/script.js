var navMain = document.querySelector('.main-nav');
var pageHeader = document.querySelector('.page-header');
var hamburger = document.querySelector('.hamburger');

pageHeader.classList.remove('page-header--nojs');

hamburger.addEventListener('click', function () {

  if (navMain.classList.contains('main-nav--close')) {
    navMain.classList.remove('main-nav--close');
    navMain.classList.add('main-nav--open');
    hamburger.classList.remove('hamburger--close');
    hamburger.classList.add('hamburger--open');

  } else {
    navMain.classList.add('main-nav--close');
    navMain.classList.remove('main-nav--open');
    hamburger.classList.add('hamburger--close');
    hamburger.classList.remove('hamburger--open');
  }

});

//==================  CatProgress =================

var toggle = document.querySelector('.cat-progress__toggle');

toggle.onmousedown = function (evt) {
  // toggle.style.zIndex = 1000;
  // toggle.style.left = evt.pageX - toggle.offsetWidth / 2 + 'px';

  console.log(evt.pageX);
  console.log(getComputedStyle(toggle).left)
};
