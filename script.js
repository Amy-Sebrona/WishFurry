// GLOBAL STATE
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// NAVBAR / MENU TOGGLE
function toggleMenu() {
  const nav = document.querySelector("header nav");
  if (nav) {
    nav.classList.toggle("show");
  }
}
// CART LOGIC
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

function updateCartCount() {
  const count = document.getElementById("cartCount");
  if (count) {
    count.innerText = cart.length;
  }
}

function displayCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  if (!cartItems || !totalPrice) return;

  cartItems.innerHTML = "";
  let grandTotal = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    grandTotal += item.price;

    const itemRow = document.createElement("p");
    itemRow.innerHTML = `
      ${item.name} — ₹${item.price}
      <button onclick="removeItem(${index})">✕</button>
    `;
    cartItems.appendChild(itemRow);
  });

  totalPrice.innerHTML = `
    <strong>Grand Total: ₹${grandTotal.toFixed(2)}</strong>
  `;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for your purchase!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}



// FEEDBACK FORM LOGIC

const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fbName").value.trim();
    const email = document.getElementById("fbEmail").value.trim();
    const rating = document.getElementById("fbRating").value;
    const message = document.getElementById("fbMessage").value.trim();
    const status = document.getElementById("feedbackStatus");

    if (!name || !email || !rating || !message) {
      status.style.color = "red";
      status.innerText = "Please fill all fields correctly.";
      return;
    }

    const feedback = {
      name,
      email,
      rating,
      message,
      date: new Date().toLocaleString()
    };

    const feedbackList =
      JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbackList.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

    status.style.color = "green";
    status.innerText = "Thank you! Your feedback has been saved.";
    feedbackForm.reset();
  });
}


// INITIALIZATION

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});
