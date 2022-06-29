$("#bookingform").submit(function (event) {
   event.preventDefault();
   $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/feedback',
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function () {
         $(".email-error").html('');
         $(".name-error").html('');
         $(".phone-error").html('');
         $(".file-error").html('');
         $(".service-error").html('');
         $(".popup").addClass("send");
         const formBooking = document.querySelector('#bookingform');
         formBooking.reset();
         $(".select-form").select2("destroy");
         $('.select-form').select2({
            placeholder: 'Выберету услугу',
            minimumResultsForSearch: -1,
         });
      },
      error: function (err) {
         console.log($("#bookingform").hasClass())
         if (err.responseJSON.errors?.email) {
            $(".email-error").html(err.responseJSON.errors.email[0]);
         } else {
            $(".email-error").html('');
         }
         if (err.responseJSON.errors?.name) {
            $(".name-error").html(err.responseJSON.errors.name[0]);
         } else {
            $(".name-error").html('');
         }
         if (err.responseJSON.errors?.phone) {
            $(".phone-error").html(err.responseJSON.errors.phone[0]);
         } else {
            $(".phone-error").html('');;
         }
         if (err.responseJSON.errors?.filename) {
            $(".file-error").html(err.responseJSON.errors.filename[0]);
         } else {
            $(".file-error").html('');
         }
         if (err.responseJSON.errors?.service) {
            $(".service-error").html(err.responseJSON.errors.service[0]);
         } else {
            $(".service-error").html('');
         }
      }
   });
});

//For language es and ru
$("#bookingform").submit(function (event) {
   event.preventDefault();
   $(".send-load").addClass('active');
   $.ajax({
      type: 'POST',
      url: 'https://colorit.agency/public/feedback',
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function () {
         $(".email-error").html('');
         $(".name-error").html('');
         $(".phone-error").html('');
         $(".file-error").html('');
         $(".service-error").html('');
         $(".popup").addClass("send");
         bookingForm.reset();
         $(".select-form").select2("destroy");
         $('.select-form').select2({
            placeholder: 'Выберету услугу',
            minimumResultsForSearch: -1,
         });
         $(".send-load").removeClass('active');
      },
      error: function (err) {
         $(".send-load").removeClass('active');
         if (bookingForm.classList.contains('es')) {
            if (err?.responseJSON?.errors?.email) {
               let text = err.responseJSON.errors.email[0]
               if (text == 'Не заполнено поле "email"') {
                  $(".email-error").html('El campo no esta rellenado "email"');
               } else if (text == 'Указан не корректный email адрес') {
                  $(".email-error").html('Introduce un email válido');
               }
            } else {
               $(".email-error").html('');
            }
            if (err?.responseJSON?.errors?.name) {
               let text = err.responseJSON.errors.name[0]
               if (text == 'Не заполнено поле "Имя"') {
                  $(".name-error").html('El campo Nombre no esta rellenado');
               } else if (text == 'Поле "Имя" не должно содержать цифр') {
                  $(".name-error").html('Campo "Nombre" no puede contener los números');
               }
               else if (text == 'Поле "Имя" должно содержать 2 или больше символов') {
                  $(".name-error").html('Campo "Nombre" Debe contener 2 o mas simbolos');
               }
               else if (text == 'Поле "Имя" должно содержать не больше 80 символов') {
                  $(".name-error").html('Campo "Nombre" no puede contener mas de 80 simbolos');
               }
            } else {
               $(".name-error").html('');
            }
            if (err?.responseJSON?.errors?.phone) {
               let text = err.responseJSON.errors.phone[0]
               if (text == 'Не заполнено поле "Номер телефона"') {
                  $(".phone-error").html('El campo no esta rellenado telefono');
               } else if (text == 'Не верный формат номера телефона') {
                  $(".phone-error").html('Introduce un telefono válido');
               }
            } else {
               $(".phone-error").html('');
            } if (err?.responseJSON?.errors?.service) {
               let text = err.responseJSON.errors.service[0]
               if (text == 'Пожалуйста выберете тип услуги из списка') {
                  $(".service-error").html('Por favor, elige el servicio');
               }
            } else {
               $(".service-error").html('');
            }
            if (!err?.responseJSON && err.statusText) {
               alert("Error al cargar el archivo");
               formPreview.innerHTML = '';
            }
         } else {
            if (err?.responseJSON?.errors?.email) {
               $(".email-error").html(err.responseJSON.errors.email[0]);
            } else {
               $(".email-error").html('');
            }
            if (err?.responseJSON?.errors?.name) {
               $(".name-error").html(err.responseJSON.errors.name[0]);
            } else {
               $(".name-error").html('');
            }
            if (err?.responseJSON?.errors?.phone) {
               $(".phone-error").html(err.responseJSON.errors.phone[0]);
            } else {
               $(".phone-error").html('');;
            }
            if (err?.responseJSON?.errors?.filename) {
               $(".file-error").html(err.responseJSON.errors.filename[0]);
            } else {
               $(".file-error").html('');
            }
            if (err?.responseJSON?.errors?.service) {
               $(".service-error").html(err.responseJSON.errors.service[0]);
            } else {
               $(".service-error").html('');
            }
            if (!err?.responseJSON && err.statusText) {
               alert("Ошибка загрузки файла");
               formPreview.innerHTML = '';
            }
         }
      }
   });
});

//For language ua, en and ru
$("#bookingform").submit(function (event) {
   event.preventDefault();
   $(".popup__send-load").addClass('active');
   $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/feedback',
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function () {
         $(".email-error").html('');
         $(".name-error").html('');
         $(".phone-error").html('');
         $(".file-error").html('');
         $(".popup").addClass("send");
         bookingForm.reset();
         $(".popup__send-load").removeClass('active');
      },
      error: function (err) {
         $(".popup__send-load").removeClass('active');
         if (bookingForm.classList.contains('ua')) {
            if (err?.responseJSON?.errors?.email) {
               let text = err.responseJSON.errors.email[0];
               if (text == 'Не заполнено поле "email"') {
                  $(".email-error").html('Не заповнено поле "email"');
               } else if (text == 'Указан некорректный email адрес') {
                  $(".email-error").html('Вказана не коректна email адреса');
               }
            } else {
               $(".email-error").html('');
            }
            if (err?.responseJSON?.errors?.name) {
               let text = err.responseJSON.errors.name[0];
               if (text == 'Не заполнено поле "Имя"') {
                  $(".name-error").html('Не заповнено поле "Ім\'я"');
               } else if (text == 'Поле "Имя" не должно содержать цифр') {
                  $(".name-error").html('Поле "Ім\'я" не повинно містити цифр');
               }
               else if (text == 'Поле "Имя" должно содержать 2 или больше символов') {
                  $(".name-error").html('Поле "Ім\'я" має містити 2 або більше символів');
               }
               else if (text == 'Поле "Имя" должно содержать не больше 80 символов') {
                  $(".name-error").html('Поле Ім\'я має містити не більше 80 символів');
               }
            } else {
               $(".name-error").html('');
            }
            if (err?.responseJSON?.errors?.phone) {
               let text = err.responseJSON.errors.phone[0];
               if (text == 'Не заполнено поле "Номер телефона"') {
                  $(".phone-error").html('Не заповнено поле "Номер телефону"');
               } else if (text == 'Неверный формат номера телефона') {
                  $(".phone-error").html('Невірний формат номера телефону');
               }
            } else {
               $(".phone-error").html('');
            }
            if (err?.responseJSON?.errors?.text) {
               $(".text-error").html('У полі "Повідомлення" надто багато символів');
            }
            if (!err?.responseJSON && err.statusText) {
               alert("Помилка завантаження файлу");
               formPreview.innerHTML = '';
            }
         } else if (bookingForm.classList.contains('en')) {
            if (err?.responseJSON?.errors?.email) {
               let text = err.responseJSON.errors.email[0];
               if (text == 'Не заполнено поле "email"') {
                  $(".email-error").html('Field "email" is not filled');
               } else if (text == 'Указан некорректный email адрес') {
                  $(".email-error").html('Incorrect e-mail address specified');
               }
            } else {
               $(".email-error").html('');
            }
            if (err?.responseJSON?.errors?.name) {
               let text = err.responseJSON.errors.name[0];
               if (text == 'Не заполнено поле "Имя"') {
                  $(".name-error").html('Field "Name" is not filled');
               } else if (text == 'Поле "Имя" не должно содержать цифр') {
                  $(".name-error").html('The "Name" field must not contain numbers');
               }
               else if (text == 'Поле "Имя" должно содержать 2 или больше символов') {
                  $(".name-error").html('The "Name" field must contain 2 or more characters');
               }
               else if (text == 'Поле "Имя" должно содержать не больше 80 символов') {
                  $(".name-error").html('The "Name" field must contain no more than 80 characters');
               }
            } else {
               $(".name-error").html('');
            }
            if (err?.responseJSON?.errors?.phone) {
               let text = err.responseJSON.errors.phone[0];
               if (text == 'Не заполнено поле "Номер телефона"') {
                  $(".phone-error").html('Phone number field not filled');
               } else if (text == 'Неверный формат номера телефона') {
                  $(".phone-error").html('Invalid phone number format');
               }
            } else {
               $(".phone-error").html('');
            }
            if (err?.responseJSON?.errors?.text) {
               $(".text-error").html('There are too many characters in the Message field');
            }
            if (!err?.responseJSON && err.statusText) {
               alert("Error loading file");
               formPreview.innerHTML = '';
            }
         } else {
            if (err?.responseJSON?.errors?.email) {
               $(".email-error").html(err.responseJSON.errors.email[0]);
            } else {
               $(".email-error").html('');
            }
            if (err?.responseJSON?.errors?.name) {
               $(".name-error").html(err.responseJSON.errors.name[0]);
            } else {
               $(".name-error").html('');
            }
            if (err?.responseJSON?.errors?.phone) {
               $(".phone-error").html(err.responseJSON.errors.phone[0]);
            } else {
               $(".phone-error").html('');;
            }
            if (err?.responseJSON?.errors?.text) {
               $(".text-error").html(err.responseJSON.errors.text[0]);
            }
            if (!err?.responseJSON && err.statusText) {
               alert("Ошибка загрузки файла");
               formPreview.innerHTML = '';
            }
         }
      }
   });
});
