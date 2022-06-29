const baner = document.querySelector('.baner');
if (baner) {
   const banerStart = document.querySelector('.baner__start');
   let banerText = banerStart.innerHTML;
   const banerSpanStart = `<span class="baner__start">${banerText}</span>`;
   function animationBanerText() {
      let screenWidth = 0;
      let textWidth = 0;
      let spanQuantity = 0;
      let banerWidth = 0;
      let textMarginRight = +getComputedStyle(banerStart).marginRight.replace("px", "");
      screenWidth = document.documentElement.clientWidth
      textWidth = banerStart.clientWidth + textMarginRight;
      spanQuantity = Math.ceil(screenWidth / textWidth);
      if (spanQuantity > 1) {
         banerWidth = spanQuantity * textWidth + textWidth + 10;
      } else {
         banerWidth = (spanQuantity + 1) * textWidth + textWidth;
      }
      baner.style.width = banerWidth + "px";
      for (let i = 0; i < spanQuantity; i++) {
         banerStart.insertAdjacentHTML('afterEnd', banerSpanStart);
      }

      document.querySelectorAll('.baner__start').forEach((item) => {
         item.animate([
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-' + `${(textWidth)}` + 'px, 0)' }
         ], {
            duration: 10000,
            iterations: Infinity
         })
      });
   }
   animationBanerText();
}