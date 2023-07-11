console.log("JS Loaded")

const itemCartLocal = localStorage.getItem("cart-length")
const goToCart = document.querySelector(".go-to-cart")
goToCart.addEventListener("click", change)
document.querySelector(".badge").textContent = itemCartLocal

const navbarToggler = document.querySelector(".navbar-toggler")
navbarToggler.addEventListener("click", navbarChange)

function change() {
    location.href = 'cart.html'
}
function navbarChange() {
    document.querySelector(".navbar-toggler-custom-icon").classList.toggle("change");
}