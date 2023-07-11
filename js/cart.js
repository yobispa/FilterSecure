console.log("JS Loaded")

let itemCartLocal = localStorage.getItem("cart-length")
const retString = localStorage.getItem("cartArray")
const retArray = JSON.parse(retString)
const navbarToggler = document.querySelector(".navbar-toggler")
const updateCartItems = document.querySelector(".update-items")
const product = localStorage.getItem("item")
let removeArray = []
let totalPrice = 0;
navbarToggler.addEventListener("click", navbarChange)
if(itemCartLocal == null) {
  itemCartLocal = 0
}

fetch("json/products.json")
.then(res => res.json())
.then(jsonData => createCard(jsonData))

function createCard(jsonData) {
  if(totalPrice == 0) {
    document.querySelector(".total-price").innerHTML = ``
  }
    for(let i = 0; i < retArray.length; i++) {
      document.querySelector(".total-price").innerHTML = ``
        const card = `<div class="card w-50 h-auto">
          <img class="card-img-top w-100 h-50 border-bottom" src="${jsonData.products[retArray[i]].img1}" alt="Filter image">
          <div class="card-body">
            <h4 class="card-title">${jsonData.products[retArray[i]].modelnumber}</h4>
            <p class="card-text">${jsonData.products[retArray[i]].color1} <br> €${jsonData.products[retArray[i]].price}</p>
            <div class="remove">
              <button class="remove${i} button">Remove item</button>
              <div class="counter">
              <div class="card__counter float-end">
                <button class="card__btn card__btn-minus">-</button>
              <div class="card__counter-score">1</div>
                <button class="card__btn card__btn-plus">+</button>
              </div>
              </div>
            </div>
          </div>
        </div>`
      totalPrice += jsonData.products[retArray[i]].price
      document.querySelector(".col-md-8").insertAdjacentHTML("beforeend", card)
      const button = document.querySelectorAll(".remove button")
      console.log(totalPrice)
      document.querySelector(".total-price").innerHTML = `Total price: €${totalPrice.toFixed(2)}`
      if(totalPrice == 0) {
        document.querySelector(".check-out").disabled = true;

      } else if(totalPrice > 0) {
        document.querySelector(".check-out").disabled = false;
        document.querySelector(".check-out").addEventListener("click", function() {
          window.location.href = "checkout.html"
        })
      }
      button[i].addEventListener("click", function() {
        removeArray.push(i)
        removeItem(jsonData, removeArray, i)
      })
    }
    const counterPlus = document.querySelectorAll(".counter .card__btn-plus")
    const counterMinus = document.querySelectorAll(".counter .card__btn")
    const counter = document.querySelectorAll(".counter .card__counter-score")
    let countForReset = 0
    for(let i = 0; i < retArray.length; i++) {
      console.log(counterPlus.length)
      if(i == countForReset) {
        let counterItem = 1;
        counterPlus[i].addEventListener("click", function() {
          console.log(123)
          counterItem++;
          counter[i].innerHTML = counterItem
          totalPrice = counterItem * jsonData.products[retArray[i]].price
          document.querySelector(".total-price").innerHTML = `Total price: €${totalPrice.toFixed(2)}`
          if(totalPrice == 0) {
            document.querySelector(".check-out").disabled = true;

          } else if(totalPrice > 0) {
            document.querySelector(".check-out").disabled = false;
            document.querySelector(".check-out").addEventListener("click", function() {
              window.location.href = "checkout.html"
            })
          }
        })
        counterMinus[i].addEventListener("click", function() {
          console.log(123)
          counterItem--;
          if(counterItem == 0) {
            counterItem = 0
            removeItem(jsonData, removeArray, i)
          }
          counter[i].innerHTML = counterItem
          totalPrice = counterItem * jsonData.products[retArray[i]].price
          document.querySelector(".total-price").innerHTML = `Total price: €${totalPrice.toFixed(2)}`
          if(totalPrice == 0) {
            document.querySelector(".check-out").disabled = true;

          } else if(totalPrice > 0) {
            document.querySelector(".check-out").disabled = false;
            document.querySelector(".check-out").addEventListener("click", function() {
              window.location.href = "checkout.html"
            })
          }
        })
        countForReset++;
      }
      
    }
}

function removeItem(jsonData, array, index) {
  if(totalPrice == 0) {
    document.querySelector(".total-price").innerHTML = ``
  }
  document.querySelector(".col-md-8").innerHTML = ``
  totalPrice = 0;
  for(let i = 0; i < retArray.length; i++) {
    document.querySelector(".total-price").innerHTML = ``
    if(index == i) {
      console.log(retArray[i])
      retArray.splice(i, 1)
      const string = JSON.stringify(retArray)
      localStorage.setItem("cartArray", string)
      console.log(retArray)
      let cartLength = localStorage.getItem("cart-length")
      cartLength--;
      localStorage.setItem("cart-length", cartLength)
      updateCartItems.innerHTML = `You have ${cartLength} items in your cart`
      document.querySelector(".total-price").innerHTML = `Total price: €${totalPrice.toFixed(2)}`
      if(totalPrice == 0) {
        document.querySelector(".check-out").disabled = true;

      } else if(totalPrice > 0) {
        document.querySelector(".check-out").disabled = false;
        document.querySelector(".check-out").addEventListener("click", function() {
          window.location.href = "checkout.html"
        })
      }
    }
      const card = `<div class="card w-auto h-auto">
      <img class="card-img-top w-50 h-50" src="${jsonData.products[retArray[i]].img1}" alt="Filter image">
      <div class="card-body">
        <h4 class="card-title">${jsonData.products[retArray[i]].modelnumber}</h4>
        <p class="card-text">${jsonData.products[retArray[i]].color1} <br> €${jsonData.products[retArray[i]].price}</p>
        <div class="remove">
          <button class="remove${i} button">Remove item</button>
          <div class="counter">
              <div class="card__counter float-end">
                <button class="card__btn card__btn-minus">-</button>
              <div class="card__counter-score">1</div>
                <button class="card__btn card__btn-plus">+</button>
              </div>
              </div>
        </div>
      </div>
    </div>`
      totalPrice += jsonData.products[retArray[i]].price
      document.querySelector(".col-md-8").insertAdjacentHTML("beforeend", card)
      const button = document.querySelectorAll(".remove button")
      console.log(totalPrice)
      document.querySelector(".total-price").innerHTML = `Total price: €${totalPrice.toFixed(2)}`
      button[i].addEventListener("click", function() {
        removeArray.push(i)
        removeItem(jsonData, removeArray, i)
      })
      const counterPlus = document.querySelectorAll(".counter .card__btn-plus")
      const counterMinus = document.querySelectorAll(".counter .card__btn-minus")
      const counter = document.querySelectorAll(".counter .card__counter-score")
      let countForReset = 0
      for(let i = 0; i < retArray.length; i++) {
        console.log(counterMinus.length)
        if(i == countForReset) {
          let counterItem = 1;
          counterPlus[i].addEventListener("click", function() {
            console.log(123)
            counterItem++;
            counter[i].innerHTML = counterItem
            totalPrice = counterItem * jsonData.products[retArray[i]].price
            document.querySelector(".total-price").innerHTML = `Total price: €${totalPrice.toFixed(2)}`
            
            if(totalPrice == 0) {
              document.querySelector(".check-out").disabled = true;

            } else if(totalPrice > 0) {
              document.querySelector(".check-out").disabled = false;
              document.querySelector(".check-out").addEventListener("click", function() {
                window.location.href = "checkout.html"
              })
            }
          })
          counterMinus[i].addEventListener("click", function() {
            console.log(123)
            counterItem--;
            if(counterItem == 0) {
              counterItem = 0
              removeItem(jsonData, removeArray, i)
            }
            counter[i].innerHTML = counterItem
            totalPrice = counterItem * jsonData.products[retArray[i]].price
            document.querySelector(".total-price").innerHTML = `Total price: €${totalPrice.toFixed(2)}`
            
            if(totalPrice == 0) {
              document.querySelector(".check-out").disabled = true;

            } else if(totalPrice > 0) {
              document.querySelector(".check-out").disabled = false;
              document.querySelector(".check-out").addEventListener("click", function() {
                window.location.href = "checkout.html"
              })
            }
          })
          countForReset++;
        }
        
      }
  }
}
updateCartItems.innerHTML = `You have ${itemCartLocal} items in your cart`
function navbarChange() {
  document.querySelector(".navbar-toggler-custom-icon").classList.toggle("change");
}





