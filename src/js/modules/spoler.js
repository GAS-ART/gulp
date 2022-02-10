//Добавить класс .toggle-block - в блок в котором будет нажатие

function windowSize() {
   if ($(window).width() > '768') {
      $('.toggle-block').siblings('.nextblock').slideDown();
      $('.toggle-block').removeClass('active');
   }
   else {
      $('.toggle-block').siblings('.nextblock').slideUp()
   }
}

$(window).on('load resize', windowSize);

$('.toggle-block').click(function (event) {
   if ($(window).width() <= '768') {
      $('.toggle-block').not($(event.target)).removeClass('active');
      $('.toggle-block').not($(event.target)).next().slideUp(300);
      $(event.target).toggleClass('active').next().slideToggle(300);
   }

})

windowSize();
