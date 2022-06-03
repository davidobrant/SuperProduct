import { store } from '../data/store.js';

const wishList = document.querySelector('[data-wish-list]')
const LOCAL_STORAGE_KEY_WISHLIST = 'wish-list.basket';
let itemsInBasket = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_WISHLIST)) || store 

export const renderWishList = () => {
    wishList.innerHTML = '';

    itemsInBasket.forEach(item => {
        if (item.amount > 0) {
            const listItem = document.createElement('li')
            listItem.classList.add('wish-list-item')
            listItem.innerText = `${item.product} `;

            const listItemDetails = document.createElement('span')
            listItemDetails.classList.add('wish-list-item-details')
            listItemDetails.innerText = `x ${item.amount}`
            listItem.append(listItemDetails)
            
            const deleteButton = document.createElement('span');
            deleteButton.classList.add('delete-button');
            const trashIcon = document.createElement('img')
            trashIcon.setAttribute('src', './icons/trash-can-solid.svg')
            deleteButton.append(trashIcon)
            deleteButton.onclick = () => { deleteItem(item.id) }
            listItem.append(deleteButton)
            
            wishList.append(listItem)
        }
    })
}

export const deleteItem = (id) => {
    const item = itemsInBasket.find(item => item.id === id)
    item.amount--
    saveToLocalStorage()
    renderWishList()
    updatePrice()
}

export const addItem = (id) => {
    const item = itemsInBasket.find(item => item.id === id)
    item.amount++
    saveToLocalStorage()
    renderWishList()
    updatePrice()
}

export const updatePrice = () => {
    const totalPriceText = document.querySelector('[data-total-price-text]')
    let total = 0;
    totalPriceText.innerHTML = '';
    itemsInBasket.forEach(item => {
        total += parseInt(item.amount) * parseInt(item.price)
    })
    totalPriceText.innerText = `Total Price: ${total} :-`
}

export const saveToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_WISHLIST, JSON.stringify(itemsInBasket))
}