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
if (document.querySelector('.reviews__container')) {
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
}

// Слайдер с историями
if (document.querySelector('.stories-slider')) {
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
}

// Всё, что связано с модалкой
const modalButtons = document.querySelectorAll('[data-target=modal]')
const modalOpen = () => {
  document.querySelector('.modal-overlay').classList.add('modal-overlay--active')
  document.querySelector('.modal__wrapper').classList.add('modal__wrapper--active')
  body.classList.add('overflow--hidden')
}
const modalClose = () => {
  document.querySelector('.modal-overlay').classList.remove('modal-overlay--active')
  document.querySelector('.modal__wrapper').classList.remove('modal__wrapper--active')
  if (!document.querySelector('.header__right').classList.contains('header__right--active'))
    body.classList.remove('overflow--hidden')
}

modalButtons.forEach(target => {
  target.addEventListener('click', modalOpen)
})

document.querySelector('.modal__close').addEventListener('click', modalClose)
document.querySelector('.modal-overlay').addEventListener('click', modalClose)

document.addEventListener('keyup', e => {
  if (e.code === 'Escape') modalClose()
})

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
if (document.querySelector('.trends-card') && document.querySelector('.trends__button')) {
  const trendsButtons = document.querySelectorAll('.trends__button')
  const trendsCards = document.querySelectorAll('.trends-card')
  const trendsCardsSort = (category, cards) => {
    trendsCards.forEach(card => {
      const isSorted = card.dataset.sortType === category
      const isEmptyCard = card.classList.contains('trends-card--empty')
      if (!isSorted && !isEmptyCard) {
        card.classList.add('trends-card--sorted')
      } else {
        card.classList.remove('trends-card--sorted')
      }
    })
  }

  trendsButtons.forEach(button => {
    button.addEventListener('click', () => {
      trendsButtons.forEach(btn => btn.classList.remove('trends__button--active'))
      button.classList.add('trends__button--active')
      trendsCardsSort(button.dataset.sort, trendsCards)
    })
  })
}

// Валидация форм
const loginInput = document.querySelector('input[name="login"]')
const passwordInput = document.querySelector('input[name="password"]')
loginInput.addEventListener('input', () => (loginInput.value = loginInput.value.replace(/[^a-z\d]/i, '')))
passwordInput.addEventListener('input', () => (passwordInput.value = passwordInput.value.replace(/\s/g, '')))

new Bouncer('form', {
  fieldClass: 'form-error',
  errorClass: 'form-error-message',
  messages: {
    missingValue: {
      checkbox: 'Это обязательно.',
      radio: 'Выберите значение.',
      select: 'Выберите значение.',
      'select-multiple': 'Выберите предложеное значение.',
      default: 'Заполните это поле.',
    },
    patternMismatch: {
      email: 'Введите email адрес: mail@example.ru',
      url: 'Введите URL.',
      number: 'Введите число',
      color: 'Введите цвет в формате hex: #rrggbb',
      date: 'Please use the YYYY-MM-DD format',
      time: 'Please use the 24-hour time format. Ex. 23:00',
      month: 'Please use the YYYY-MM format',
      default: 'Следуйте формату записи данных.',
    },
    wrongLength: {
      over: 'Пожалуйста сократите текст до {maxLength} символов(-а). Сейчас {length} символ(-а)(-ов).',
      under: 'Пожалуйста введите {minLength} символов или больше. Сейчас {length} символ(-а)(-ов).',
    },
  },
})
