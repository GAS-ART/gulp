//Подгрузка товаров
const productsBlock = document.querySelector('.products__items');
const loadMoreBtn = document.querySelector('.products__footer--link');
loadMoreBtn.addEventListener('click', function (e) {
   getProducts(e.target);
   e.preventDefault();
});
async function getProducts(btn) {
   if (!btn.classList.contains('_hold')) {
      btn.classList.add('_hold');
   }
   const file = "json/products.json";
   let responce = await fetch(file, {
      method: 'GET',
   });
   if (responce.ok) {
      let result = await responce.json();
      loadProducts(result);
      btn.classList.remove('_hold');
   } else {
      alert('Ошибка при загрузке товаров');
   }
}
function loadProducts(data) {
   let currentLastProductBlockId = productsBlock.lastElementChild.dataset.id;
   data.products.forEach((product) => {
      if (product.id > +currentLastProductBlockId && product.id < +currentLastProductBlockId + 5) {
         let productCard = `<div data-id="${product.id}" class="products__item item-product">
            <a href="${product.linkUrl}" class="item-product__img">
            <picture><source srcset="img/products/${product.image}.webp" type="image/webp"><img src="img/products/${product.image}.jpg" alt="${product.name}"></picture>
            </a>
            <div class="item-product__description description-product">
            <h5 class="description-product__tittle">${product.name}</h5>
            <div class="description-product__text">${product.description}</div>
            <div class="description-product__price price-product">
            <div class="price-product__current">${product.price}</div>
            <div class="price-product__old">${product.oldPrice}</div>
            </div>
            </div>`;
         if (product.label) {
            productCard += `<div class="item-product__label label-product">`;
            product.label.forEach((item) => {
               productCard += `<div class="label-product__${item.type} active">${item.value}</div>`
            });
            productCard += '</div>';
         }
         productCard += `<div class="item-product__hover hover-product">
         <div class="hover-product__actions">
            <div class="hover-product__btn">Add to cart</div>
            <div class="hover-product__social">
               <a data-popup-id="linkPopup" href="${product.shareUrl}" class="hover-product__share link-on-popup _icon-share">Share</a>
               <a data-popup-id="linkPopup" href="${product.likeUrl}" class="hover-product__like link-on-popup _icon-favorite">Like</a>
            </div>
         </div>
         <a data-popup-id="linkPopup" href="${product.linkUrl}" class="hover-product__look link-on-popup">
            <p>Learn more</p>
            <div class="_icon-arrow-link"></div>
         </a>
      </div>
   </div>`;
         productsBlock.insertAdjacentHTML('beforeend', productCard);
         if (data.products.length == product.id) {
            loadMoreBtn.remove();
         }
      }
   });
   linksPopup = document.querySelectorAll('.link-on-popup');
   popupLinkClick();
}