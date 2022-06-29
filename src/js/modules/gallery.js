
//Сдвиг галереии в лево/право при движении мыши
const gallery = document.querySelector('.gallery-furniture');

if (gallery && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
   const galeryBody = gallery.querySelector('.gallery-furniture__body');
   const galeryRows = gallery.querySelectorAll('.gallery-furniture__row');

   //Скорость
   const speed = galeryBody.dataset.speed;

   //Переменные
   let positionX = 0;
   let coordXprocent = 0;

   function setMouseGalleryStyle() {
      let galleryRowsWidth = 0;
      galeryRows.forEach(row => {
         galleryRowsWidth += row.offsetWidth;
      });
      const galleryDifferent = galleryRowsWidth - galeryBody.offsetWidth;
      const distX = Math.floor(coordXprocent - positionX);

      positionX = positionX + (distX * speed);
      let position = galleryDifferent / 200 * positionX;

      galeryBody.style.cssText = `transform: translate3d(${-position}px, 0, 0);`;

      if (Math.abs(distX) > 0) {
         requestAnimationFrame(setMouseGalleryStyle);
      } else {
         galeryBody.classList.remove('_init');
      }
   }
   galeryBody.addEventListener('mousemove', function (e) {
      //Получение ширины
      const galeryBodyWidth = galeryBody.offsetWidth;

      //Ноль по середине
      const coordX = e.pageX - galeryBodyWidth / 2;

      //Получаем проценты
      coordXprocent = coordX / galeryBodyWidth * 200;

      if (!galeryBody.classList.contains('_init')) {
         requestAnimationFrame(setMouseGalleryStyle);
         galeryBody.classList.add('_init');
      }
   });
   galeryBody.addEventListener('mouseleave', function (e) {
      //Получение ширины
      const galeryBodyWidth = galeryBody.offsetWidth;

      //Ноль по середине
      const coordX = galeryBodyWidth / 2;

      //Получаем проценты
      coordXprocent = -(coordX / galeryBodyWidth);

      requestAnimationFrame(setMouseGalleryStyle);
      galeryBody.classList.remove('_init');
   });
}