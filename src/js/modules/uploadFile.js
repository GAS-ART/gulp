function uploadFile(file) {
   if (file?.size > 2.5e+7 && bookingForm.classList.contains('ru')) {
      alert("Максимум 25 мегабайт");
      formPreview.classList.remove('load');
      $(".send-load").removeClass('active');
      return
   } else if (file?.size > 2.5e+7 && bookingForm.classList.contains('es')) {
      alert("el tamaño maximo 25");
      formPreview.classList.remove('load');
      return
   }
   let reader = new FileReader();
   reader.onload = function (e) {
      if (file.type.match('image.*')) {
         formPreview.innerHTML = `<img src="${e.target.result}" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.type.match('video.*')) {
         formPreview.innerHTML = `<video src="${e.target.result}" controls></video>`;
         formPreview.classList.remove('load');
      } else if (file.type.match('application/pdf')) {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/pdf.svg" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.type.match('application/msword')) {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/word.png" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.type.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/word.png" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.type.match('application/vnd.ms-excel')) {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/excel.svg" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/excel.svg" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.name.slice(-4) == ".rar") {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/rar.png" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.name.slice(-4) == ".zip") {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/zip.png" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.name.slice(-4) == ".psd") {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/psd.png" alt="">`;
         formPreview.classList.remove('load');
      } else if (file.type.match('text/plain')) {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/txt.svg" alt="">`;
         formPreview.classList.remove('load');
      } else {
         formPreview.innerHTML = `<img src="https://colorit.agency/public/img/form/file.svg" alt="">`;
         formPreview.classList.remove('load');
      }
   }
   reader.onerror = function (e) {
      if (bookingForm.classList.contains('ru')) {
         alert("Ошибка загрузки файла");
      } else if (bookingForm.classList.contains('es')) {
         alert("Error al cargar el archivo");
      }
   };
   if (file?.size) {
      reader.readAsDataURL(file);
   }

}