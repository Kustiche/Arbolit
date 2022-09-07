// Меню бургер
const menuBurger = document.querySelector(".menu__burger");
const menuBody = document.querySelector(".menu__body");
if (menuBurger) {
  menuBurger.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    menuBurger.classList.toggle("active");
    menuBody.classList.toggle("active");
  });
}

// Прокрутка при клике
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top;

      if (menuBurger.classList.contains("active")) {
        document.body.classList.remove("lock");
        menuBurger.classList.remove("active");
        menuBody.classList.remove("active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

// inputMask
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask("+7 (999) 999-99-99");
im.mask(inputs);

const modalLinks = document.querySelectorAll(".modal-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (modalLinks.length > 0) {
  for (let index = 0; index < modalLinks.length; index++) {
    const modalLink = modalLinks[index];
    modalLink.addEventListener("click", function (e) {
      const modalName = modalLink.getAttribute("href").replace("#", "");
      const curentmodal = document.getElementById(modalName);
      modalOpen(curentmodal);
      e.preventDefault();
    });
  }
}
const modalCloseIcon = document.querySelectorAll(".close-modal");
if (modalCloseIcon.length > 0) {
  for (let index = 0; index < modalCloseIcon.length; index++) {
    const el = modalCloseIcon[index];
    el.addEventListener("click", function (e) {
      modalClose(el.closest(".modal"));
      e.preventDefault();
    });
  }
}

function modalOpen(curentmodal) {
  if (curentmodal && unlock) {
    const modalActive = document.querySelector(".modal.open");
    if (modalActive) {
      modalClose(modalActive, false);
    } else {
      bodyLock();
    }
    curentmodal.classList.add("open");
    curentmodal.addEventListener("click", function (e) {
      if (!e.target.closest(".modal__content")) {
        modalClose(e.target.closest(".modal"));
      }
    });
  }
}

function modalClose(modalActive, doUnlock = true) {
  if (unlock) {
    modalActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth -
    document.querySelector(".site-container").offsetWidth +
    "px";

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const modalActive = document.querySelector(".modal.open");
    modalClose(modalActive);
  }
});

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

// Валидация
new window.JustValidate(".form", {
  rules: {
    tel: {
      required: true,
      function: () => {
        const phone = telSelector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
    },
  },
  colorWrong: "#ff6767",
  messages: {
    name: {
      required: "Введите имя:",
      minLength: "Введите 3 и более символов",
      maxLength: "Запрещено вводить более 15 символов",
    },
    tel: {
      required: "Введите телефон:",
      function: "Здесь должно быть 10 символов без +7",
    },
  },
  submitHandler: function (thisForm) {
    let formData = new FormData(thisForm);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    thisForm.reset();
  },
});

new window.JustValidate(".contacts__form", {
  rules: {
    tel: {
      required: true,
      function: () => {
        const phone = telSelector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
    },
  },
  colorWrong: "#ff6767",
  messages: {
    name: {
      required: "Введите имя:",
      minLength: "Введите 3 и более символов",
      maxLength: "Запрещено вводить более 15 символов",
    },
    tel: {
      required: "Введите телефон:",
      function: "Здесь должно быть 10 символов без +7",
    },
  },
  submitHandler: function (thisForm) {
    let formData = new FormData(thisForm);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    thisForm.reset();
  },
});

new window.JustValidate(".modal__form", {
  rules: {
    tel: {
      required: true,
      function: () => {
        const phone = telSelector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
    },
  },
  colorWrong: "#ff6767",
  messages: {
    name: {
      required: "Введите имя:",
      minLength: "Введите 3 и более символов",
      maxLength: "Запрещено вводить более 15 символов",
    },
    email: {
      email: "Введите корректный E-mail",
      required: "Введите E-mail:",
    },
    tel: {
      required: "Введите телефон:",
      function: "Здесь должно быть 10 символов без +7",
    },
  },
  submitHandler: function (thisForm) {
    let formData = new FormData(thisForm);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    thisForm.reset();
  },
});
