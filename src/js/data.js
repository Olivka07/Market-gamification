/**
 * Структура products
 * [
 *  {
 *      id: number; // уникальный идентификатор
 *      title: string; // название
 *      price: number; // цена (float)
 *      price_measure: string; // измерение цены: руб., usd., ..etc
 *      count: number; // количество (float)
 *      count_measure: string; // измерение количества: кг., шт., ..etc
 *      imgFileName: string; // название файла картинки
 *      top: string; // координата картинки Y - от верха баннера
 *      left: string; // координата картинки X - от левого края баннера
 *      rotation?: number; // угол поворота картинки (в градусах)
 *  }
 * ]
 */
export default [
    {
        "id": 1,
        "title": "Вино",
        "price": 770.99,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "шт.",
        "imgFileName": "wine.svg",
        "top": "25px",
        "left": "66px"
    },
    {
        "id": 2,
        "title": "Молоко",
        "price": 110,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "шт.",
        "imgFileName": "milk.svg",
        "top": "59px",
        "left": "108px"
    },
    {
        "id": 3,
        "title": "Варенье",
        "price": 230,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "шт.",
        "imgFileName": "jam.svg",
        "top": "108px",
        "left": "147px"
    },
    {
        "id": 4,
        "title": "Сыр",
        "price": 400,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "шт.",
        "imgFileName": "cheese.svg",
        "top": "117px",
        "left": "202px"
    },
    {
        "id": 5,
        "title": "Мясо",
        "price": 500,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "кг.",
        "imgFileName": "meat.svg",
        "rotation": -5.64,
        "top": "195px",
        "left": "51px"
    },
    {
        "id": 6,
        "title": "Куриная ножка",
        "price": 450,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "кг.",
        "imgFileName": "chicken-leg.svg",
        "rotation": -15.06,
        "top": "197px",
        "left": "102px"
    },
    {
        "id": 7,
        "title": "Чипсы",
        "price": 210,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "шт.",
        "imgFileName": "chips.svg",
        "top": "204px",
        "left": "173px"
    },
    {
        "id": 8,
        "title": "Ананас",
        "price": 810,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "шт.",
        "imgFileName": "pineapple.svg",
        "top": "265px",
        "left": "57px"
    },
    {
        "id": 9,
        "title": "Бананы",
        "price": 170,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "кг.",
        "imgFileName": "banana.svg",
        "top": "293px",
        "left": "102px"
    },
    {
        "id": 10,
        "title": "Яблоки",
        "price": 320,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "кг.",
        "imgFileName": "apple.svg",
        "top": "304px",
        "left": "159px"
    },
    {
        "id": 11,
        "title": "Капуста",
        "price": 120.69,
        "price_measure": "руб.",
        "count": 1,
        "count_measure": "кг.",
        "imgFileName": "cabbage.svg",
        "top": "295px",
        "left": "200px"
    }
]