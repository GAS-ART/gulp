//Прокрутка
const containerBtn = querySelector('.container__btn');
const btn = document.querySelectorAll('.btn');

function callback(entries, observe) {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         const el = entry.target;
         el.classList.remove('scroll');
      } else {
         el.classList.add('scroll');
      }
   });
}

const options = {
   root: null, // может быть containerBtn или любой html элемент на сайте
   rootMargin: "0px",
   threshold: 0, // Может быть 0,2 или 1. Это % видимости элемента на экране и тогда активация. Может быть массив [0.2, 04, 08] тогда анимация сработает на каждом элементе массива
}


const observer = new IntersectionObserver(callback, options);
btn.forEach(element => observer.observe(element)); //observer.observe(btn); - если 1 элемент


//Прокрутка header
const headerElement = document.querySelector('.header');

function watchHeader(entries) {
   if (entries[0].isIntersecting) {
      entries[0].target.classList.remove('_scroll')
   } else {
      entries[0].target.classList.add('_scroll')
   }

}

const headerObserver = new IntersectionObserver(watchHeader);
headerObserver.observe(headerElement);

/*если 1 элемент
function callback(entries) {
   if (entries[0].isIntersecting) {
      entries[0].target.classList.remove('_scroll')
   } else {
      entries[0].target.classList.add('_scroll')
   }

}
*/

// Scroll to image
let targetScrollTop = 0;
let headerCorrectHeight = 0;
if ($(window).width() < '768') {
   targetScrollTop = shadowTextMobile.getBoundingClientRect().top;
} else {
   targetScrollTop = shadowText.getBoundingClientRect().top;
}
let headerWraperHeight = headerWraper.getBoundingClientRect().height;
if (headerWraperHeight == 120) {
   headerCorrectHeight = 40
} else if (headerWraperHeight == 100) {
   headerCorrectHeight = 20
} else {
   headerCorrectHeight = 0
}
window.scrollTo({
   top: targetScrollTop + headerCorrectHeight + window.pageYOffset - headerWraperHeight,
   behavior: 'smooth'
});

//Загрузка картинок при прокрутке страницы
const portfolioImages = document.querySelectorAll('.portfolio__images');
if (portfolioImages.length > 0) {
   function loadImage(tag, src) {
      const newImage = new Image();
      newImage.addEventListener('load', function () {
         tag.src = src;
      });
      newImage.src = src;
   }
   function observePortfolioImages(entries) {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const el = entry.target;
            const img = el.querySelectorAll('img');
            img.forEach(item => loadImage(item, item.dataset.src));
         }
      });
   }
   const observer = new IntersectionObserver(observePortfolioImages);
   portfolioImages.forEach(image => observer.observe(image));
};