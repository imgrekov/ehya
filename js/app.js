const headerBurger = document.querySelector('.header__burger')
const headerClose = document.querySelector('.header__close')
const nav = document.querySelector('.header__right')
const body = document.querySelector('body')

// Навигация
headerBurger.addEventListener('click', () => {
  nav.classList.add('header__right--active')
  body.classList.add('overflow--hidden')
})
headerClose.addEventListener('click', () => {
  nav.classList.remove('header__right--active')
  body.classList.remove('overflow--hidden')
})

// Слайдер с отзывами
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

// Слайдер с историями
const storiesSlider = new Swiper('.stories-slider', {
  spaceBetween: 24,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerColumn: 2,
  navigation: {
    prevEl: '.stories-left__nav--prev',
    nextEl: '.stories-left__nav--next',
  },
  breakpoints: {
    577: {
      spaceBetween: 18,
      slidesPerView: 2,
      slidesPerGroup: 2,
      slidesPerColumn: 1,
    },
  },
})

// Всё, что связано с модалкой
const modalButtons = document.querySelectorAll('[data-target=modal]')
modalButtons.forEach(target => {
  target.addEventListener('click', modalOpen)
})

document.querySelector('.modal__close').addEventListener('click', modalClose)
document.querySelector('.modal-overlay').addEventListener('click', modalClose)

document.addEventListener('keyup', e => {
  if (e.code === 'Escape') modalClose()
})

function modalOpen() {
  document.querySelector('.modal-overlay').classList.add('modal-overlay--active')
  document.querySelector('.modal__wrapper').classList.add('modal__wrapper--active')
  body.classList.add('overflow--hidden')
}
function modalClose() {
  document.querySelector('.modal-overlay').classList.remove('modal-overlay--active')
  document.querySelector('.modal__wrapper').classList.remove('modal__wrapper--active')
  if (!document.querySelector('.header__right').classList.contains('header__right--active'))
    body.classList.remove('overflow--hidden')
}

// Пароль в инпуте в модалке
const iconPw = document.querySelector('.modal-form__icon-pw')
const pwInput = document.querySelector('.modal-form__input--pw')
iconPw.addEventListener('click', () => {
  if (pwInput.type === 'text') {
    pwInput.type = 'password'
  } else {
    pwInput.type = 'text'
  }
  iconPw.classList.toggle('modal-form__icon-pw--visible')
})

// Соритровка трендов по категориям
const trendsButtons = document.querySelectorAll('.trends__button')
const trendsCards = document.querySelectorAll('.trends-card')

trendsButtons.forEach(button => {
  button.addEventListener('click', () => {
    trendsButtons.forEach(btn => btn.classList.remove('trends__button--active'))
    button.classList.add('trends__button--active')
    trendsCardsSort(button.dataset.sort, trendsCards)
  })
})

function trendsCardsSort(category, cards) {
  trendsCards.forEach(card => {
    const isSorted = card.dataset.sortType === category
    const isShowAll = category.toLowerCase() === 'all'
    const isEmptyCard = card.classList.contains('trends-card--empty')
    if (!isSorted && !isShowAll && !isEmptyCard) {
      card.classList.add('trends-card--sorted')
    } else {
      card.classList.remove('trends-card--sorted')
    }
  })
}
