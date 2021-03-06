var navMain = document.querySelector('.main-nav');
var pageHeader = document.querySelector('.page-header');
var hamburger = document.querySelector('.hamburger');
var orderButtons = document.querySelectorAll(".button.product-item__button");

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


//===================Order==========================//

for (var i = 0; i < orderButtons.length; i++) {
  orderButtons[i].addEventListener("click", function (ev) {
    ev.preventDefault();
  })
}
