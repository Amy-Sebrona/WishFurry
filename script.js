// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleMenu() {
  const nav = document.querySelector("header nav");
  if(nav) nav.classList.toggle("show");
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function updateCartCount() {
  const count = document.getElementById("cartCount");
  if(count) count.innerText = cart.length;
}

function displayCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  if(!cartItems || !totalPrice) return;

  cartItems.innerHTML = "";
  let total = 0;

  if(cart.length === 0){
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("p");
    div.innerHTML = `${item.name} — ₹${item.price} <button onclick="removeItem(${index})">✕</button>`;
    cartItems.appendChild(div);
  });

  totalPrice.innerText = "Total: ₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

function checkout() {
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Initialize cart count and display cart if on cart page
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});
