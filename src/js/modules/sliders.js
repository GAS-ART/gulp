import Swiper from "swiper"; // npm i swiper


function initSliders() {
   // Перечень слайдеров
   if (document.querySelector('.swiper')) {
      new Swiper('.swiper', {
         // Подключаем модули слайдера
         // для конкретного случая
         //modules: [Navigation, Pagination],
         /*
         effect: 'fade',
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         */
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 0,
         autoHeight: true,
         speed: 800,
         //touchRatio: 0,
         //simulateTouch: false,
         //loop: true,
         //preloadImages: false,
         //lazy: true,
         // Dotts
         //pagination: {
         //	el: '.slider-quality__pagging',
         //	clickable: true,
         //},
         // Arrows
         navigation: {
            nextEl: '.about__more .more__item_next',
            prevEl: '.about__more .more__item_prev',
         },
         /*
         breakpoints: {
            320: {
               slidesPerView: 1,
               spaceBetween: 0,
               autoHeight: true,
            },
            768: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            992: {
               slidesPerView: 3,
               spaceBetween: 20,
            },
            1268: {
               slidesPerView: 4,
               spaceBetween: 30,
            },
         },
         */
         on: {

         }
      });
   }
}



window.addEventListener("load", function (e) {
   // Запуск инициализации слайдеров
   initSliders();
   // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
   //initSlidersScroll();
});