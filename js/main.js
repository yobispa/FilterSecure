console.log("JS Loaded")

const sendBtn = document.querySelector(".send");
const email = document.querySelector(".email-validation");
const addToCartBtn = document.querySelectorAll(".add-to-cart")
let itemCartLocal = localStorage.getItem("cart-length")
const updateCartItems = document.querySelector(".badge")
const navbarToggler = document.querySelector(".navbar-toggler")
const retString = localStorage.getItem("cartArray")
let cartArray = JSON.parse(retString)


if(cartArray == null) {
  cartArray = []
}
console.log(cartArray)
if (itemCartLocal == null) {
    itemCartLocal = 0;
}

let navLinks = document.querySelectorAll("ul li a");
let menuSection = document.querySelectorAll('menu li');


navbarToggler.addEventListener("click", navbarChange)
updateCartItems.insertAdjacentHTML("afterbegin", itemCartLocal)
sendBtn.addEventListener("click", checkInput);

fetch("json/products.json")
.then(response => response.json())
.then(jsonData => sendDataToCart(jsonData))

function sendDataToCart(jsonData) {
  console.log(jsonData)

  for(let i = 0; i < jsonData.products.length; i++) {
    console.log(jsonData.products[i])
    const card = `<div class="card mx-3 p-0 products${i}" style="width: 25rem; box-shadow: -2.5px 4px 10px;">
    <div id="carouselExampleIndicators${i}" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators${i}" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators${i}" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators${i}" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators${i}" data-bs-slide-to="3"
          aria-label="Slide 4"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <video autoplay loop muted src="${jsonData.products[i].video}"
            class="d-block w-100 card-img-top" alt="..." height="377vh"></video>
        </div>
        <div class="carousel-item">
          <img src="${jsonData.products[i].img1}" class="d-block w-100 card-img-top" alt="..." height="377vh">
        </div>
        <div class="carousel-item">
          <img src="${jsonData.products[i].img2}" class="d-block w-100 card-img-top" alt="..." height="377vh">
        </div>
        <div class="carousel-item">
          <img src="${jsonData.products[i].img3}" class="d-block w-100 card-img-top" alt="..." height="377vh">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${i}"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${i}"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="card-body text-center">
      <h5 class="card-title">${jsonData.products[i].modelnumber}</h5>
      <p class="card-text">${jsonData.products[i].package} <br> Price: €${jsonData.products[i].price}</p>
      <a href="#" class="btn btn-primary add-to-cart">Check Product</a>
    </div>
  </div>`
  document.querySelector(".c-card").insertAdjacentHTML("beforeend", card)
  }
  const productOne = document.querySelector(".products0")
  const productTwo = document.querySelector(".products1")
  productOne.addEventListener("click", function() {
    addToCart(0)
  })
  productTwo.addEventListener("click", function() {
    addToCart(1)
  })
}

function addToCart(i) {
  console.log(i)
  itemCartLocal++;
  localStorage.setItem("cart-length", itemCartLocal)
  updateCartItems.innerHTML = itemCartLocal
    cartArray.unshift(i)
    let string = JSON.stringify(cartArray)
    localStorage.setItem("cartArray", string)
    location.href = 'cart.html'
}

function checkInput() {

    if (email.value.length == 0) {
        alert("Fill youre email")
        return;
    }
    if (email.value.length < 4) {
        alert("Email is too short")
    }
    if (!email.checkValidity()) {
        email.reportValidity();
    }
}

document.querySelector(".go-to-cart").addEventListener("click", function() {
    location.href = "cart.html"
})

// for clickable event
menuSection.forEach(v=> {
    v.onclick = (()=> {
     setTimeout(()=> {
        menuSection.forEach(j=> j.classList.remove('active'))
      v.classList.add('active')
    },300)
     })
  })
  
  // for window scrolldown event
  
  window.onscroll = (()=> {
    let mainSection = document.querySelectorAll('main section');
  
    mainSection.forEach((v,i)=> {
      let rect = v.getBoundingClientRect().y
      if(rect < window.innerHeight-200){
        menuSection.forEach(v=> v.classList.remove('active'))
        menuSection[i].classList.add('active')
      }
    })
  })

  function navbarChange() {
    document.querySelector(".navbar-toggler-custom-icon").classList.toggle("change");
  }
