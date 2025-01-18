import animationModel from './animation.js';
import { IDENTIFIER_PRODUCT_DATA_ATTRIBUTE_NAME, HREF_YANDEX_LAVKA, PAY_BASKET_BTN_ID, MAX_PRODUCTS_FOR_ORDER_IN_BASKET} from './constants.js';
import { getDataAttributeByName, findItemByKeyValue, hrefClickImitation } from './helpers.js';
import products from './data.js';

const { startFadeOut, startFadeIn, startTransformToCorrectPosition, startPulseAnimation } = animationModel;

let touch = null;
let currentDraggingItem = null;
let lineNum = 1;
let allowDropForTouching = false;

const basket = [];

function dragstartProduct(e) {
    currentDraggingItem = e.target;
    startFadeOut(currentDraggingItem);
}

function dragendProduct() {
    startFadeIn(currentDraggingItem);
    currentDraggingItem = null;
}

function touchendProduct(e) {
    onDropAtBasket(touch)
    dragendProduct();
    allowDropForTouching = false;
    touch = null;
}

function touchmoveProduct(e) {
    e.preventDefault();
    touch = e.touches[0];

    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    const isBasket = elementUnderTouch.hasAttribute('data-basket');
    if (isBasket) allowDropForTouching = true;
}

function onOverBasket(e) {
    let hasProductId = Boolean(getDataAttributeByName(currentDraggingItem, IDENTIFIER_PRODUCT_DATA_ATTRIBUTE_NAME));

    if (hasProductId) {
        e.preventDefault();
    }
}

function onDropAtBasket(eOrTouch) {
    const productId = parseInt(getDataAttributeByName(currentDraggingItem, IDENTIFIER_PRODUCT_DATA_ATTRIBUTE_NAME));
    const candidate = findItemByKeyValue(products, productId);

    const basketElement = document.querySelector('[data-basket]');

    const { y: yBasketPosition, height: basketHeight, width: basketWidth } = basketElement.getBoundingClientRect();

    if (candidate) {
        basket.push(candidate);
        const prevLineNum = lineNum;
        
        // вычисляем координату последнего положенного продукта, чтобы не вышло за границы корзины
        const prevProductElement = basket.length > 1 ? document.querySelector(`[data-id="${basket[basket.length - 2].id}"]`) : null;
        const endXPrevProductElement = prevProductElement ? prevProductElement.getBoundingClientRect().x + prevProductElement.getBoundingClientRect().width : null;
        const outOfBasket = prevProductElement ? (endXPrevProductElement - 20) + currentDraggingItem.getBoundingClientRect().width > basketWidth : false;

        if (outOfBasket) lineNum++;

        startTransformToCorrectPosition(
            currentDraggingItem,
            {
                startXPosition: eOrTouch.clientX,
                startYPosition: eOrTouch.clientY,
                endXPosition: !prevProductElement || prevLineNum !== lineNum ? 81.53 : (endXPrevProductElement - 20),
                endYPosition: yBasketPosition + basketHeight - (lineNum * 47.33)
            }
        )

        if (basket.length === MAX_PRODUCTS_FOR_ORDER_IN_BASKET) {
            const payBasketBtn = document.getElementById(PAY_BASKET_BTN_ID);
            payBasketBtn.classList.remove('button__not-visible');
            startPulseAnimation(payBasketBtn, { maxOpacity: 1, minOpacity: 0.2, eps: 20000 });
        } 
    }
}

function clickPayBasketHandle() {
    hrefClickImitation(HREF_YANDEX_LAVKA);
}

export default {
    dragstartProduct,
    dragendProduct,
    touchendProduct,
    touchmoveProduct,

    onOverBasket,
    onDropAtBasket,

    clickPayBasketHandle
}