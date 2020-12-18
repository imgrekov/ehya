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

const reviewsSlider = new Swiper('.reviews__container', {
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: '.reviews__pagination',
    clickable: true,
  },
  breakpoints: {
    576: {
      spaceBetween: 30,
    },
  },
  autoplay: {
    delay: 7000,
  },
})

const reviewsContainer = document.querySelector('.reviews__container')
reviewsContainer.addEventListener('mouseover', () => reviewsSlider.autoplay.stop())
reviewsContainer.addEventListener('mouseout', () => reviewsSlider.autoplay.start())
