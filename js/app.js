const headerBurger = document.querySelector('.header__burger'),
  nav = document.querySelector('.header__right'),
  headerClose = document.querySelector('.header__close')

headerBurger.addEventListener('click', () => nav.classList.toggle('active'))
headerClose.addEventListener('click', () => nav.classList.toggle('active'))
