let cartCount = 0;

    function addToCart(id) {
      const qtyInput = document.getElementById(`qty-${id}`);
      const qty = parseInt(qtyInput.value);
      if (!isNaN(qty) && qty > 0) {
        cartCount += qty;
        document.getElementById('cart-count').innerText = cartCount;
      }
    }
let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart");
let container = document.querySelector(".products");

function getCartWidth() {
  // Example: Adjust cart width based on screen size
  if (window.innerWidth <= 600) {
    return 250; // Mobile width
  } else if (window.innerWidth <= 1024) {
    return 300; // Tablet width
  } else {
    return 430; // Desktop width
  }
}

let cartVisible = false;

cartIcon.addEventListener("click", () => {
  cartVisible = !cartVisible;

  let cartWidth = getCartWidth();

  if (cartVisible) {
    cart.style.right = "0";
    container.style.transform = `translateX(-${cartWidth+30}px)`;
    container.style.margin = "20px 0px";
  } else {
    cart.style.right = `-${cartWidth + 20}px`; // Hidden position
    container.style.transform = "translateX(0)";
    container.style.margin = `20px ${cartWidth-230}px`;
  }
});

// Update position when window resizes
window.addEventListener("resize", () => {
  if (cartVisible) {
    let cartWidth = getCartWidth();
    container.style.transform = `translateX(-${cartWidth+30}px)`;
  }
});

