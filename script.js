'use strict'

let items = {

    "first":{
        "title": "First",
        "price": 5,
        "selled": 100,
        "rate": 1
    },

    "second":{
        "title": "Second",
        "price": 4,
        "selled": 100,
        "rate": 2
    },

    "third":{
        "title": "Third",
        "price": 3,
        "selled": 600,
        "rate": 3
    },

    "four":{
        "title": "Four",
        "price": 2,
        "selled": 400,
        "rate": 6
    },

    "five":{
        "title": "Five",
        "price": 1,
        "selled": 500,
        "rate": 1
    }
}


let content = document.querySelector('.content')

let price_btn = document.querySelector('.price_btn')
price_btn.addEventListener("click", sortByPrice)

let rate_btn = document.querySelector('.rate_btn')
rate_btn.addEventListener("click", sortByRate)

let sells_btn = document.querySelector('.sells_btn')
sells_btn.addEventListener("click", sortBySells)

//  Вставка из объекта с атрибутами html
for (const key in items) {
    content.innerHTML += `<div class="item" data-id="${key}" price="${items[key]["price"]}" selled="${items[key]["selled"]}" rate="${items[key]["rate"]}"><div class="text">${items[key]["title"]}</div><div class="Buy">Купить</div></div>`
}


function sortByPrice(){

    for(let i = 0; i < content.children.length; i++){
        for(let j = i; j < content.children.length; j++){

            if(+content.children[i].getAttribute('price') > +content.children[j].getAttribute('price')){

                //  Эта переменная хранит заменённое значение для возвращения обратно в список
                let replaceNode = content.replaceChild(content.children[j], content.children[i])
                insertAfter(replaceNode, content.children[i])
            }
        }
    }
}

function sortByRate(){

    for(let i = 0; i < content.children.length; i++){
        for(let j = i; j < content.children.length; j++){

            if(+content.children[i].getAttribute('rate') > +content.children[j].getAttribute('rate')){

                //  Эта переменная хранит заменённое значение для возвращения обратно в список
                let replaceNode = content.replaceChild(content.children[j], content.children[i])
                insertAfter(replaceNode, content.children[i])
            }
        }
    }
}

function sortBySells(){

    for(let i = 0; i < content.children.length; i++){
        for(let j = i; j < content.children.length; j++){

            if(+content.children[i].getAttribute('selled') > +content.children[j].getAttribute('selled')){

                //  Эта переменная хранит заменённое значение для возвращения обратно в список
                let replaceNode = content.replaceChild(content.children[j], content.children[i])
                insertAfter(replaceNode, content.children[i])
            }
        }
    }
}

function insertAfter(elem, refElem){
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
}





let cart = {}

document.onclick = event => {
    if(event.target.classList.contains("Buy")){

        let selectedId = event.target.parentNode.dataset.id
        
        cart[selectedId] = items[event.target.parentNode.dataset.id]
        cart[selectedId].count = 1

        console.log(cart)
    }
    
    //Корзина
    else if(event.target.classList.contains("plus")){
    
        let selectedId = event.target.parentNode.dataset.id
        cart[selectedId]["count"] += 1
        isReDraw = true
        openCart()
    }
    else if(event.target.classList.contains("minus")){

        let selectedId = event.target.parentNode.dataset.id
        if(cart[selectedId]["count"] > 1){
            cart[selectedId]["count"] -= 1
            isReDraw = true
            openCart()
        }
        else{
            delete cart[selectedId]
            isReDraw = true
            openCart()
        }
    }
}

let cartView = document.querySelector(".cart")

let cart_btn = document.querySelector(".cart_btn")
cart_btn.addEventListener("click", openCart)
let isCartOpen = false
let isReDraw = false

function openCart(){

    if(isReDraw){
        cartView.innerHTML = null
        for (const key in cart) {
            cartView.innerHTML += `<div class="cartItem"><div class="cartTitle">${cart[key]["title"]}</div><div class="cartPrice">${cart[key]["price"]}</div><div class="cartCount">${cart[key]["count"]}</div><div class="plus">+</div><div class="minus">-</div></div>`
        }
        isReDraw = false
    }
    else if(!isCartOpen){
        isCartOpen = true
        content.style.display = "none"
        cartView.style.display = "block"

        for (const key in cart) {
            cartView.innerHTML += `<div class="cartItem" data-id="${key}"><div class="cartTitle">${cart[key]["title"]}</div><div class="cartPrice">${cart[key]["price"]}</div><div class="cartCount">${cart[key]["count"]}</div><div class="plus">+</div><div class="minus">-</div></div>`
        }
    }
    else{
        isCartOpen = false
        content.style.display = "grid"
        cartView.style.display = "none"
        cartView.innerHTML = null
    }
}