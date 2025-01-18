import products from './data.js';
import draggingProductProcessModel from './add-to-basket.js';
import { IDENTIFIER_PRODUCT_DATA_ATTRIBUTE_NAME, PAY_BASKET_BTN_ID } from './constants.js';

const {
    dragstartProduct,
    dragendProduct,
    touchendProduct,
    touchmoveProduct,

    onOverBasket,
    onDropAtBasket,

    clickPayBasketHandle
} = draggingProductProcessModel;

const rootProductsImagesUrl = 'assets/images/svg';

const shopWindowProducts = document.querySelector('[data-shopWindowProducts]');
const basket = document.querySelector('[data-basket]');

initBanner();

subscribeProductsOnDragStart();
subscribeProductsOnDragEnd();
subscribeProductsOnTouchMove();

subscribeBasketOnOver();
subscribeBasketOnDrop();

subscribePayBasketButtonOnClick();

function initBanner() {
    products.forEach(addedProductToBanner);
}

function addedProductToBanner(product) {
    const HTMLImgElement = document.createElement('img');
    HTMLImgElement.alt = product.title;
    HTMLImgElement.draggable = true;
    HTMLImgElement.setAttribute(`data-${IDENTIFIER_PRODUCT_DATA_ATTRIBUTE_NAME}`, product.id);
    HTMLImgElement.src = `${rootProductsImagesUrl}/${product.imgFileName}`;
    HTMLImgElement.style.cssText = `
        position: absolute;
        z-index: 1;
        top: ${product.top};
        left: ${product.left};
        rotate: ${product.rotation}deg;
    `;

    shopWindowProducts.appendChild(HTMLImgElement);
}

// draggable.addEventListener('touchstart', dragStart);
// draggable.addEventListener('touchend', dragEnd);

function subscribeProductsOnDragStart() {
    shopWindowProducts.addEventListener('dragstart', dragstartProduct);
    shopWindowProducts.addEventListener('touchstart', dragstartProduct);
}

function subscribeProductsOnDragEnd() {
    shopWindowProducts.addEventListener('dragend', dragendProduct);
    shopWindowProducts.addEventListener('touchend', touchendProduct);
}

function subscribeProductsOnTouchMove() {
    shopWindowProducts.addEventListener('touchmove', touchmoveProduct);
}

function subscribeBasketOnOver() {
    basket.addEventListener('dragover', onOverBasket);
}

function subscribeBasketOnDrop() {
    basket.addEventListener('drop', onDropAtBasket);
}

function subscribePayBasketButtonOnClick() {
    const payBasketBtn = document.getElementById(PAY_BASKET_BTN_ID);
    payBasketBtn.addEventListener('click', clickPayBasketHandle);
}