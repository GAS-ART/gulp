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

/*если 1 элемент
function callback(entries) {
   if (entries[0].isIntersecting) {
      entries[0].target.classList.remove('_scroll')
   } else {
      entries[0].target.classList.add('_scroll')
   }

}
*/