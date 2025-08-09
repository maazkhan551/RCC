// ====== CART DATA ======
// We'll store cartItems as an OBJECT keyed by product id: { "1": { name, price, image, quantity }, ... }
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const searchContainer = document.querySelector(".search-container");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  searchContainer.classList.toggle("active");
});


// Elements
const cartCountEl = document.getElementById("cart-count");
const cartListEl = document.getElementById("listcart");
const cartTotalEl = document.getElementById("cart-total-amount");
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart-panel");
const closeBtn = document.getElementById("close-cart");
const productsContainer = document.querySelector(".products");
const checkoutBtnDiv = document.getElementById("checkout-btn");

let cartVisible = false;

// Helper: update localStorage from cartItems object
function saveCartToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// ====== ADD TO CART FUNCTION ======
function addToCart(id) {
  const qtyInput = document.getElementById(`qty-${id}`);
  const qty = parseInt(qtyInput.value);

  if (qty <= 0 || isNaN(qty)) return;

  // Get product details from the DOM
  const card = qtyInput.closest(".card");
  const name = card.querySelector("h3").innerText;
  const price = parseFloat(card.querySelector(".price").innerText.replace("$", ""));
  const image = card.querySelector("img").src;

  if (cartItems[id]) {
    cartItems[id].quantity += qty;
  } else {
    cartItems[id] = { name, price, image, quantity: qty };
  }

  updateCart();
}

// ====== UPDATE CART DISPLAY ======
function updateCart() {
  let totalCount = 0;
  let totalAmount = 0;
  cartListEl.innerHTML = "";

  for (let id in cartItems) {
    const item = cartItems[id];
    totalCount += item.quantity;
    totalAmount += item.price * item.quantity;

    // create item element
    const itemEl = document.createElement("div");
    itemEl.className = "item";
    itemEl.dataset.id = id;
    itemEl.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="content">
        <div class="Name">${item.name}</div>
        <div class="price">$${item.price.toFixed(2)} each</div>
      </div>
      <div class="quantity">
        <button class="dec" data-id="${id}">-</button>
        <span class="value">${item.quantity}</span>
        <button class="inc" data-id="${id}">+</button>
      </div>
    `;
    cartListEl.appendChild(itemEl);
  }

  cartCountEl.innerText = totalCount;
  cartTotalEl.innerText = totalAmount.toFixed(2);

  // attach event listeners for + and - buttons
  document.querySelectorAll(".dec").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      changeQuantity(id, -1);
    });
  });
  document.querySelectorAll(".inc").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      changeQuantity(id, 1);
    });
  });

  // Save updated cart to localStorage
  saveCartToStorage();
}

// ====== CHANGE QUANTITY ======
function changeQuantity(id, amount) {
  if (!cartItems[id]) return;

  cartItems[id].quantity += amount;

  if (cartItems[id].quantity <= 0) {
    delete cartItems[id];
  }

  updateCart();
}

// ====== CART TOGGLE ======
function getCartWidth() {
  if (window.innerWidth <= 600) return 250;
  if (window.innerWidth <= 1024) return 300;
  return 430;
}
if (window.innerWidth<=600){
  document.querySelectorAll(".card button").forEach(btn=>{
    btn.innerText = "🛒"
  })
}
cartIcon.addEventListener("click", () => {
  cartVisible = !cartVisible;
  const cartWidth = getCartWidth();

  if (cartVisible) {
    cart.style.right = "0";
    productsContainer.style.transform = `translateX(-${cartWidth + 30}px)`;
    productsContainer.style.margin = "20px 0px";
  } else {
    cart.style.right = `-${cartWidth + 90}px`;
    productsContainer.style.transform = "translateX(0)";
    productsContainer.style.margin = `20px ${cartWidth - 230}px`;
  }
});

closeBtn.addEventListener("click", () => {
  const cartWidth = getCartWidth();
  cartVisible = false;
  cart.style.right = `-${cartWidth + 90}px`;
  productsContainer.style.transform = "translateX(0)";
  productsContainer.style.margin = `20px ${cartWidth - 230}px`;
});

// Adjust on resize
window.addEventListener("resize", () => {
  if (cartVisible) {
    const cartWidth = getCartWidth();
    productsContainer.style.transform = `translateX(-${cartWidth + 30}px)`;
  }
});

// Checkout button: ensure cart saved (we already save on updates, but ensure latest)
checkoutBtnDiv.addEventListener("click", () => {
  saveCartToStorage();
  // anchor will navigate to checkout.html
});

// ====== INIT CART ON PAGE LOAD ======
document.addEventListener("DOMContentLoaded", updateCart);
document.querySelector('.search-container i').addEventListener('click', () => {
  document.getElementById('productSearch').focus();
});

// ======== Search Bar filter ==================
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".card");
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();

  // If search is empty → reset everything
  if (!filter) {
    products.forEach(p => {
      p.style.display = "";
      p.classList.remove("search-highlight");
      p.style.height = "";
      p.style.width = "";

      const img = p.querySelector("img");
      if (img) {
        img.style.width = "";
        img.style.height = "";
        img.style.objectFit = "";
      }
    });
    return; // stop here
  }

  // Otherwise → filter results
  products.forEach(p => {
    const text = p.textContent.toLowerCase();
    const img = p.querySelector("img");

    if (text.includes(filter)) {
      p.style.display = "";
      p.classList.add("search-highlight");

      if (img) {
        img.style.width = "200px";
        img.style.height = "200px";
        img.style.objectFit = "cover";
      }
      p.style.height = "350px";
      p.style.width = "250px";
    } else {
      p.style.display = "none";
      p.classList.remove("search-highlight");

      if (img) {
        img.style.width = "";
        img.style.height = "";
        img.style.objectFit = "";
      }
      p.style.height = "";
      p.style.width = "";
    }
  });
});