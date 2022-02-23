const hover = document.querySelectorAll(".hover");
hover.forEach((item) => {
   if (window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(hover: hover)").matches && !item.classList.contains('active')) {
      item.addEventListener('mouseover', function (e) {
         if (!item.classList.contains('active')) {
            item.classList.add("hover-active");
         } else {
            item.classList.remove("hover-active");
         }
      });
      item.addEventListener('mouseout', function (e) {
         item.classList.remove("hover-active");
      });
      item.addEventListener('click', function (e) {
         // код для клика на объект который сработает только на мобилке
      });
   } else if (window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(hover: hover)").matches) {
      item.addEventListener('click', function (e) {
         // код для клика на объект который сработает только на мобилке
      });
   }
});