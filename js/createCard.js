import { addItem } from "./wishList.js"

export const createCard = (product) => {
    const productList = document.querySelector('[data-product-list]')

    const card = document.createElement('div')
    card.classList.add('card')

    /* ----- IMAGE ----- */
    const image = document.createElement('img')
    image.setAttribute('src', product.image)
    image.setAttribute('alt', product.imageAlt)
    image.classList.add('card-image')
    card.append(image)

    /* ----- TITLE ----- */
    const title = document.createElement('h3')
    title.innerText = product.title
    title.classList.add('card-title')
    card.append(title)
    
    /* ----- DESCRIPTION ----- */
    const description = document.createElement('p')
    description.innerText = product.description
    description.classList.add('card-description')
    card.append(description)
    
    /* ----- INFORMATION ----- */
    const information = document.createElement('div')
    information.classList.add('card-information')
    const list = document.createElement('ul')
    list.classList.add('information-list')

    const toggleInformation = document.createElement('div')
    toggleInformation.classList.add('toggle-information')

    const toggleInformationIcon = document.createElement('img')
    toggleInformationIcon.setAttribute('src', './icons/angle-down-solid.svg')
    toggleInformationIcon.setAttribute('alt', 'trash-icon')
    toggleInformation.append(toggleInformationIcon)
    
    const toggleInformationText = document.createElement('h5')
    toggleInformationText.innerText = 'See information';
    toggleInformation.onclick = () => {
        const listItems = document.querySelectorAll('.list-item')
        list.classList.toggle('active')
        list.classList.contains('active') ? toggleInformationIcon.style.transform = 'rotateX(180deg)' : toggleInformationIcon.style.transform = 'rotateX(0deg)'
        listItems.forEach(item => {
            item.classList.toggle('visible')
        })
    }
    Array.from(product.information).forEach( info => {
        const li = document.createElement('li')
        li.innerText = info.text;
        li.classList.add('information-item')
        list.append(li)
    })
    toggleInformation.append(toggleInformationText)
    information.append(toggleInformation)
    information.append(list)
    card.append(information)

    /* ----- PRICE ----- */
    const price = document.createElement('p')
    price.innerText = product.price + ' :-'
    price.classList.add('card-price')
    
    if(product.oldPrice) {
        price.style.color = 'red';
        price.innerText = product.price + ' :-'
        const oldPrice = document.createElement('span')
        oldPrice.classList.add('old-price')
        oldPrice.innerText = product.oldPrice;
        oldPrice.style.color = 'grey'
        card.append(oldPrice)
    }
    card.append(price)

    /* ----- ADD BUTTON -----*/
    const button = document.createElement('button')
    button.innerText = 'Add to list';
    button.classList.add('add-btn')
    button.onclick = () => {
        addItem(product.id)
    }
    card.append(button)
    
    productList.append(card)
}