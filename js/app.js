const headerBurger = document.querySelector('.header__burger')
const nav = document.querySelector('.header__right')
const headerClose = document.querySelector('.header__close')
const body = document.querySelector('body')

headerBurger.addEventListener('click', () => {
  nav.classList.toggle('active')
  body.classList.toggle('overflow--hidden')
})
headerClose.addEventListener('click', () => {
  nav.classList.toggle('active')
  body.classList.toggle('overflow--hidden')
})
