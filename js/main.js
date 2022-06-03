import { products } from '../data/products.js';
import { createCard } from './createCard.js';
import { renderWishList, updatePrice } from './wishList.js';

/* ========== ON LOAD ========== */
window.onload = () => {
    products.forEach(product => {
        createCard(product)
    })
    renderWishList()
    updatePrice()
}
