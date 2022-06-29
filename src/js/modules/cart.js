/*===================================================КОРЗИНА===================================================*/
const cart = document.querySelector('.cart-header');
const cartBtn = document.querySelector('.cart-header__icon');
const cartList = document.querySelector('.cart-list');

//Открытие корзины
cartBtn.addEventListener('click', function (e) {
   if (cartList.querySelectorAll('.cart-list__item').length > 0) {
      cartList.classList.toggle('active');
   }
   e.preventDefault();
});
// Добавление товара в корзину
function addToCart(productBtn, productId) {
   if (!productBtn.classList.contains('_hold')) {
      productBtn.classList.add('_hold');
   }
   let product = document.querySelector(`.item-product[data-id="${productId}"]`);
   let productImg = product.querySelector('.item-product__img');

   let productImgFly = productImg.cloneNode(true);

   productImgFly.classList.add('_fly');

   let productImgHieght = productImg.offsetHeight;
   let productImgWidth = productImg.offsetWidth;
   let productImgTop = productImg.getBoundingClientRect().top;
   let productImgLeft = productImg.getBoundingClientRect().left;

   productImgFly.style.cssText = `
    left: ${productImgLeft}px;
    top: ${productImgTop}px;
    width: ${productImgWidth}px;
    height: ${productImgHieght}px;
    `;

   document.body.append(productImgFly);

   const cartFlyLeft = cart.getBoundingClientRect().left;
   const cartFlyTop = cart.getBoundingClientRect().top;

   productImgFly.style.cssText = `
    left: ${cartFlyLeft}px;
    top: ${cartFlyTop}px;
    width: 0px;
    height: 0px;
    opacity: 0;`

   setTimeout(() => {
      productImgFly.remove();
      updateCart(productBtn, productId);
   }, 500);
}

function updateCart(productBtn, productId, productAdd = true) {
   const cartIcon = document.querySelector('.cart-header__icon');
   const cartQuantity = cartIcon.querySelector('span');
   const cartProduct = document.querySelector(`[data-cart-id="${productId}"]`);

   if (productAdd) {
      if (cartQuantity) {
         cartQuantity.innerHTML = ++cartQuantity.innerHTML;
      } else {
         cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
      }
      getPrice(cartProduct, productId, productBtn);
   } else {
      if (!(cartQuantity.innerHTML == 1 || 0)) {
         cartQuantity.innerHTML = --cartQuantity.innerHTML;
      } else {
         cartQuantity.remove();
      }
      getPrice(cartProduct, productId, productBtn, false);
   }
}

function makeOrder(productBtn) {
   if (document.querySelectorAll('.ordered-table-popup__item').length > 0) {
      document.querySelectorAll('.ordered-table-popup__item').forEach((item) => {
         item.remove();
      });
      document.querySelector('.ordered-table-popup__total').remove();;
   }
   const cartProducts = cartList.querySelectorAll('.cart-list__item');
   const cartPopup = document.getElementById('cartPopup');
   const popupTable = cartPopup.querySelector('.popup__table');
   let productsId = [];
   cartProducts.forEach((item) => {
      productsId.push(item.dataset.cartId);
   })
   let totalPrice = 0;
   let prices = getPrice(cartProducts, productsId, productBtn, true, true);
   prices.then((data) => {
      for (let i = 0; i < data.length; i++) {
         let price = +data[i];
         const cartProductImg = cartProducts[i].querySelector('.cart-list__img picture').innerHTML;
         let productName = cartProducts[i].querySelector('.cart-list__name').innerHTML;
         let productQuantity = cartProducts[i].querySelector('.cart-list__quantity span').innerHTML;
         let totalProductPrice = price * productQuantity;
         totalPrice += +totalProductPrice;
         popupTable.insertAdjacentHTML('beforeend', `<div class="ordered-table-popup__item">
          <div class="ordered-table-popup__img"><div class="ordered-table-popup__name">${productName}</div>${cartProductImg}</div>
          <div class="ordered-table-popup__price">${price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, })}</div>
          <div class="ordered-table-popup__quantity">${productQuantity}</div>
          <div class="ordered-table-popup__total-product-price">${totalProductPrice}</div>
       </div>`);
         if (i == data.length - 1) {
            popupTable.insertAdjacentHTML('beforeend', `<div class="ordered-table-popup__total">Total: ${totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', currencyDisplay: 'name', maximumFractionDigits: 0, })}</div>`);
         }
         cartProducts[i].remove();
      }
   });
   removeCart();
   popUp(productBtn.dataset.popupId);
}

async function getPrice(cartProduct, productId, productBtn, productAdd = true, makeOrder = false) {
   const file = "json/products.json";
   let responce = await fetch(file, {
      method: 'GET',
   });
   if (responce.ok) {
      let result = await responce.json();
      //Отправка данных о цене при подтверждении заказа
      if (makeOrder) {
         let prices = [];
         productId.forEach((item) => {
            let price = result.products.find((product) => product.id == item).price;
            prices.push(price.slice(3).replace('.', '').trim());
         })
         return prices;
      }

      //Отправка данных о цене при добавлении / удалении товара в корзину
      let cartProductPrice = result.products.find(item => item.id == productId).price;
      cartProductPrice = cartProductPrice.slice(3).replace('.', '');
      // const cartList = document.querySelector('.cart-header__header-list');
      if (productAdd) {
         addPriceToCart(+cartProductPrice, cartProduct, productId, productBtn, cartList);
      } else {
         removePriceFromCart(+cartProductPrice, cartProduct, productBtn, cartList);
      }
      let productsInCart = cartList.querySelectorAll('.cart-list__item');
      let currentPrices = [];
      productsInCart.forEach((item) => {
         let price = result.products.find(product => product.id == item.dataset.cartId).price;
         price = price.slice(3).replace('.', '').trim();
         currentPrices.push(price);
      });
      makeTotalPrice(cartList, currentPrices);
   } else {
      alert('Ошибка загрузки цени товара');
   }

}

function addPriceToCart(cartProductPrice, cartProduct, productId, productBtn, cartList) {
   const product = document.querySelector(`[data-id="${productId}"]`);
   const cartProductImg = product.querySelector('.item-product__img').innerHTML;
   const cartPproductName = product.querySelector('.description-product__tittle').innerHTML;
   if (!cartProduct) {
      const cartProductContent = `

<a data-popup-id="linkPopup" href="#" class="cart-list__img link-on-popup">${cartProductImg}<div class="cart-list__price-item">${cartProductPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, })}</div></a>


<div class="cart-list__body">
 <a data-popup-id="linkPopup" href="#" class="cart-list__name link-on-popup">${cartPproductName}</a>
 <div class="cart-list__quantity"><div class="cart-list__price">${cartProductPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, })}</div><button class="cart-list__btn-plus">+</button><span> 1 </span><button class="cart-list__btn-minus">-</button></div>
 <a href="#" class="cart-list__delete">Delete</a>
</div>`;
      cartList.insertAdjacentHTML('beforeend', `<li data-cart-id="${productId}" class="cart-list__item" ">${cartProductContent}</li>`);
   } else {
      cartProduct.querySelector('.cart-list__quantity span').innerHTML++;
      let sum = +cartProductPrice * +cartProduct.querySelector('.cart-list__quantity span').innerHTML;
      cartProduct.querySelector('.cart-list__price').innerHTML = sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
   }
   productBtn.classList.remove('_hold');
   linksPopup = document.querySelectorAll('.link-on-popup');
   popupLinkClick();
}

function removePriceFromCart(cartProductPrice, cartProduct, productBtn, cartList) {
   cartProduct.querySelector('.cart-list__quantity span').innerHTML--;
   let sum = +cartProductPrice * +cartProduct.querySelector('.cart-list__quantity span').innerHTML;
   cartProduct.querySelector('.cart-list__price').innerHTML = sum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
   if (cartProduct.querySelector('.cart-list__quantity span').innerHTML == 0) {
      cartList.removeChild(cartProduct);
   }
   productBtn.classList.remove('_hold');
}

function deleteFromCart(productBtn, productId) {
   const currentProduct = productBtn.closest('.cart-list__item');
   const currentProductQuantityBlock = currentProduct.querySelector('.cart-list__quantity span');
   const allProductsQuantityBlock = document.querySelector('.cart-header__icon span');

   let currentProductQuantity = currentProductQuantityBlock.innerHTML;
   let allProductsQuantity = allProductsQuantityBlock.innerHTML;
   let сalculationQuantityProducts = allProductsQuantity - currentProductQuantity;

   currentProductQuantityBlock.innerHTML = 1;
   allProductsQuantityBlock.innerHTML = сalculationQuantityProducts + 1;

   updateCart(productBtn, productId, false);
}

function makeTotalPrice(cartList, currentPrices) {
   let totalPrice = 0;
   for (let i = 0; i < currentPrices.length; i++) {
      let totalPriceItem = +currentPrices[i] * +cartList.querySelectorAll('.cart-list__quantity span')[i].innerHTML;
      totalPrice += totalPriceItem;
   }
   if (!totalPrice) {
      if (document.querySelector('.cart-list__total-price')) {
         document.querySelector('.cart-list__total-price').remove();
         document.querySelector('.cart-list__make-order').remove();
      }
      cartList.insertAdjacentHTML('beforeend', `<div class="cart-list__total-price">Total: <span>${totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', currencyDisplay: "name", maximumFractionDigits: 0 })}</span></div><div class="cart-list__make-order"><button data-popup-id="cartPopup" class="cart-list__make-order-btn">Make order</button></div>`);
      if (cartList.querySelectorAll('.cart-list__item').length == 0) {
         removeCart();
      }
   } else {
      if (document.querySelector('.cart-list__total-price')) {
         document.querySelector('.cart-list__total-price').remove();
         document.querySelector('.cart-list__make-order').remove();
      }
      cartList.insertAdjacentHTML('beforeend', `<div class="cart-list__total-price">Total: <span>${totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', currencyDisplay: "name", maximumFractionDigits: 0 })}</span></div><div class="cart-list__make-order"><button data-popup-id="cartPopup" class="cart-list__make-order-btn">Make order</button></div>`);
   }
}
function removeCart() {
   document.querySelector('.cart-list__total-price').remove();
   document.querySelector('.cart-list__make-order').remove();
   cartList.classList.remove('active');
   if (cartList.previousElementSibling.querySelector('span')) {
      cartList.previousElementSibling.querySelector('span').remove();
   }
}
 /*===================================================КОРЗИНА===================================================*/