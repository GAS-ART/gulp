//"use strict"
/*-------------------FORM-VALIDATE-JS----------------------------*/
function validate(form) {
   if (form == document.forms.mainform) {
      fail = validateName(form.name.value)
      fail += validateProfessions(form.professions.value)
      fail += validateGroup(form.group.value)
      fail += validatePhone(form.phone.value)
      fail += validateEmail(form.email.value)
      if (fail == false) {
         //popupForm()
         formSend(form);
         return false
      } else { return false }
   } else if (form == document.forms.popupform) {
      fail = validatePopupName(form.name.value);
      fail += validatePopupPhone(form.phone.value);
      if (fail == false) {
         formSend(form);
         return false
      } else { return false }
   } else if (form == document.forms.pagecontactsform) {
      fail = validateName(form.name.value)
      fail += validateDocs(form.docs.value)
      fail += validatePhone(form.phone.value)
      fail += validateEmail(form.email.value)
      if (fail == false) {
         formSend(form);
         return false
      } else { return false }
   }
}

async function formSend(form) {
   let formData = new FormData(form)
   let response = await fetch('/fpg/Skip/sendmail.php', {
      method: 'POST',
      body: formData
   });
   if (response.ok) {
      document.querySelector('.popup').classList.add("open");
      document.querySelector('.confirm').classList.add("send");
      document.querySelector('.popup__title').classList.add("send");
      document.querySelector('.popup__text').classList.add("send");
      form.reset();
   } else {
      alert("Ошибка HTTP: " + response.status);
   }
}

function validateName(field) {
   //let space = field.trim();
   let space = field.replace(/\s+/g, '');
   if (space == "") {
      document.querySelector('.text-field-name').classList.add("error");// text-field-name -> visibility: hidden; / .error -> visibility: visible;
      document.querySelector('.text-field-name.error').innerHTML = "Это поле не должно быть пусты!";
   } else if (/[^a-z A-Zа-я А-я]/.test(space)) {
      document.querySelector('.text-field-name').classList.add("error");
      document.querySelector('.text-field-name.error').innerHTML = "Нужно использовать только буквы!";
   }
   else if (space.length < 5) {
      document.querySelector('.text-field-name').classList.add("error");
      document.querySelector('.text-field-name.error').innerHTML = "Нужно использовать больше 4 символов!";
   }
   else {
      document.querySelector('.text-field-name').classList.remove("error");
      return false;
   }
}

function validateProfessions(field) {
   space = field.replace(/\s+/g, '');
   if (space == "") {
      document.querySelector('.text-field-professions').classList.add("error");// text-field-name -> visibility: hidden; / .error -> visibility: visible;
      document.querySelector('.text-field-professions.error').innerHTML = "Это поле не должно быть пусты!";
   }
   else if (space.length < 5) {
      document.querySelector('.text-field-professions').classList.add("error");
      document.querySelector('.text-field-professions.error').innerHTML = "Нужно использовать больше 4 символов!";
   }
   else {
      document.querySelector('.text-field-professions').classList.remove("error");
      return false;
   }
}

function validateGroup(field) {
   space = field.replace(/\s+/g, '');
   if (space == "") {
      document.querySelector('.text-field-group').classList.add("error");// text-field-name -> visibility: hidden; / .error -> visibility: visible;
      document.querySelector('.text-field-group.error').innerHTML = "Это поле не должно быть пусты!";
   }
   else if ((isNaN(space)) || (space < 2 || space > 5)) {
      document.querySelector('.text-field-group').classList.add("error");
      document.querySelector('.text-field-group.error').innerHTML = "Нужно указать цифру 2,3,4 или 5!";
   }
   else {
      document.querySelector('.text-field-group').classList.remove("error");
      return false;
   }
}

function validatePhone(field) {
   if (field.length < 17) {
      document.querySelector('.text-field-phone').classList.add("error");
   }
   else {
      document.querySelector('.text-field-phone').classList.remove("error");
      return false;
   }
}
function validateEmail(field) {
   space = field.replace(/\s+/g, '');
   if (space == "") {
      document.querySelector('.text-field-email').classList.add("error");// text-field-name -> visibility: hidden; / .error -> visibility: visible;
      document.querySelector('.text-field-email.error').innerHTML = "Это поле не должно быть пусты!";
   }

   else if (!((space.indexOf(".") > 0) && (space.indexOf("@") > 0)) || /[^a-zA-Z0-9.@_-]/.test(space) || space.length < 6) {
      document.querySelector('.text-field-email').classList.add("error");
      document.querySelector('.text-field-email.error').innerHTML = "Не корректный Email адрес!";
   }
   else {
      document.querySelector('.text-field-email').classList.remove("error");
      return false;
   }
}
/*Форма на странице contacts*/
function validateDocs(field) {
   //let space = field.trim();
   let space = field.replace(/\s+/g, '');
   console.log(space);
   if (space == "") {
      document.querySelector('.text-field-docs').classList.add("error");// text-field-name -> visibility: hidden; / .error -> visibility: visible;
      document.querySelector('.text-field-docs.error').innerHTML = "Это поле не должно быть пусты!";
   } else if (/[^a-z A-Zа-я А-я]/.test(space)) {
      document.querySelector('.text-field-docs').classList.add("error");
      document.querySelector('.text-field-docs.error').innerHTML = "Нужно использовать только буквы!";
   }
   else if (space.length < 5) {
      document.querySelector('.text-field-docs').classList.add("error");
      document.querySelector('.text-field-docs.error').innerHTML = "Нужно использовать больше 4 символов!";
   }
   else {
      document.querySelector('.text-field-docs').classList.remove("error");
      return false;
   }
}
/*Форма на странице contacts*/

function validatePopupName(field) {
   let space = field.replace(/\s+/g, '');
   if (space == "") {
      document.querySelector('.text-field-name-popup').classList.add("error");// text-field-name -> visibility: hidden; / .error -> visibility: visible;
      document.querySelector('.text-field-name-popup.error').innerHTML = "Это поле не должно быть пусты!";
   } else if (/[^a-z A-Zа-я А-я]/.test(space)) {
      document.querySelector('.text-field-name-popup').classList.add("error");
      document.querySelector('.text-field-name-popup.error').innerHTML = "Нужно использовать только буквы!";
   }
   else if (space.length < 5) {
      document.querySelector('.text-field-name-popup').classList.add("error");
      document.querySelector('.text-field-name-popup.error').innerHTML = "Нужно использовать больше 4 символов!";
   }
   else {
      document.querySelector('.text-field-name-popup').classList.remove("error");
      return false;
   }
}

function validatePopupPhone(field) {
   if (field.length < 17) {
      document.querySelector('.text-field-phone-popup').classList.add("error");
   }
   else {
      document.querySelector('.text-field-phone-popup').classList.remove("error");
      return false;
   }
}

/*-------------------FORM-VALIDATE-JS----------------------------*/


/*-------------------POPUP-FOR-FORM-JS----------------------------*/
function popupForm() {
   const popUp = document.querySelector('.popup');
   const bodyLock = document.getElementById('body');
   const popupCloseIcon = document.querySelector('.close-popup');

   popUp.classList.add('open');
   bodyLock.classList.add('lock');
   const popupLink = document.querySelector('.popup-link');
   popupLink.classList.add('open');

   popupCloseIcon.addEventListener('click', function (e) {
      popupClose(popupCloseIcon.closest('.popup'));
      e.preventDefault();
   });

   function popupClose(popupActive) {
      console.log(popupActive);
      popupActive.classList.remove('open');
      let bodyLock = document.getElementById('body');
      bodyLock.classList.remove("lock");
   }

   document.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
         popupClose(popUp);
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
         Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
      }
   })();
};


//ЗАПУСК ФОРМЫ

/*
const form = document.getElementById('form');

form.addEventListener('submit', formSend);

   function formSend(e) {
      validate(form)
      e.preventDefault();
   }*/