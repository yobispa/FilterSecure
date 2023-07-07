console.log("JS Loaded")

const itemCartLocal = localStorage.getItem("cart-length")
const retString = localStorage.getItem("cartArray")
const retArray = JSON.parse(retString)
const navbarToggler = document.querySelector(".navbar-toggler")
const updateCartItems = document.querySelector(".update-items")
const product = localStorage.getItem("item")

if(itemCartLocal == null) {
  itemCartLocal = 0
}

fetch("json/products.json")
.then(res => res.json())
.then(jsonData => createCard(jsonData))

function createCard(jsonData) {
    for(let i = 0; i < retArray.length; i++) {
        const card = `<div class="card w-auto h-auto">
          <img class="card-img-top w-50 h-50" src="${jsonData.products[retArray[i]].img1}" alt="Filter image">
          <div class="card-body">
            <h4 class="card-title">${jsonData.products[retArray[i]].modelnumber}</h4>
            <p class="card-text">${jsonData.products[retArray[i]].color1}</p>
            <button class="remove${i}">Remove</button>
          </div>
        </div>`
      document.querySelector(".col-md-8").insertAdjacentHTML("beforeend", card)
   

    }
    const removeOne = document.querySelector(".remove0")
    const removeTwo = document.querySelector(".remove1")
    const removeThree = document.querySelector(".remove2")
    const removeFour = document.querySelector(".remove3")

    removeOne.addEventListener("click", function() {
      removeItem(0)
    })
    removeTwo.addEventListener("click", function() {
      removeItem(1)
    })
    removeThree.addEventListener("click", function() {
      removeItem(2)
    })
    removeFour.addEventListener("click", function() {
      removeItem(3)
    })
}

function removeItem(i) {
  console.log(i)
}
updateCartItems.innerHTML = `You have ${itemCartLocal} items in your cart`