const headerBurger = document.querySelector('.header__burger')
const headerClose = document.querySelector('.header__close')
const nav = document.querySelector('.header__right')
const body = document.querySelector('body')
const navLinks = document.querySelectorAll('.nav__link')
const menuOpen = () => {
  nav.classList.add('header__right--active')
  body.classList.add('overflow--hidden')
}
const menuClose = () => {
  nav.classList.remove('header__right--active')
  body.classList.remove('overflow--hidden')
}
const scrollToCurrentSection = to => {
  const currentSection = document.querySelector(to)
  const currentSectionTop = currentSection.offsetTop - 50

  window.scrollTo({
    top: currentSectionTop,
    behavior: 'smooth',
  })
}

// Навигация
navLinks.forEach(link => link.addEventListener('click', menuClose))
navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    scrollToCurrentSection(link.dataset.to)
  })
})
headerBurger.addEventListener('click', menuOpen)
headerClose.addEventListener('click', menuClose)

// Кнопка для скрола вверх
const scrollUpButton = document.querySelector('.scroll-up')
const offset = 300
const getTop = () => window.pageYOffset || document.documentElement.scrollTop

window.addEventListener('scroll', () => {
  if (getTop() > offset) {
    scrollUpButton.classList.add('scroll-up--active')
  } else {
    scrollUpButton.classList.remove('scroll-up--active')
  }
})

scrollUpButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
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
  const trendsButtonActive = document.querySelector('.trends__button--active')
  const trendsCards = document.querySelectorAll('.trends-card')

  if (trendsButtonActive) {
    const virginSort = (activeButton, cards) => {
      cards.forEach(card => {
        const isSorted = card.dataset.sortType === activeButton.dataset.sort
        const isEmptyCard = card.classList.contains('trends-card--empty')
        if (!isSorted && !isEmptyCard) {
          card.classList.add('trends-card--sorted')
        } else {
          card.classList.remove('trends-card--sorted')
        }
      })
    }

    virginSort(trendsButtonActive, trendsCards)
  }

  const trendsCardsSort = (category, cards) => {
    cards.forEach(card => {
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

  // trendsCards.forEach(card => {
  //   trendsButtons.forEach(button => {
  //     button.dataset.sort
  //   })
  //   virginSort()
  // })
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
