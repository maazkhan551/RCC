document.addEventListener("DOMContentLoaded", () => {
  const checkoutBody = document.getElementById("checkout-body");
  const grandTotalEl = document.getElementById("grand-total");
  const placeOrderBtn = document.getElementById("place-order");
  const backToShopBtn = document.getElementById("back-to-shop");

  // Load cartItems from localStorage (may be object or array)
  let stored = JSON.parse(localStorage.getItem("cartItems")) || {};
  // Convert to array for easier handling in table
  let cartArray = [];

  if (Array.isArray(stored)) {
    cartArray = stored;
  } else {
    // object -> array [{id, name, price, image, quantity}, ...]
    for (let id in stored) {
      cartArray.push({ id, ...stored[id] });
    }
  }

  function saveArrayBackToStorage(arr) {
    // Convert array back to object keyed by id for consistency with product.js
    const obj = {};
    arr.forEach(item => {
      obj[item.id] = {
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      };
    });
    localStorage.setItem("cartItems", JSON.stringify(obj));
  }

  function renderCheckout() {
    checkoutBody.innerHTML = "";
    if (cartArray.length === 0) {
      checkoutBody.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
      grandTotalEl.textContent = "0.00";
      return;
    }

    let grandTotal = 0;

    cartArray.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      grandTotal += subtotal;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="display:flex; align-items:center; gap:10px;">
          <img class="checkout-item-img" src="${item.image}" alt="${item.name}" />
          <div>${item.name}</div>
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" />
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>
          <button class="btn remove-btn" data-index="${index}">Remove</button>
        </td>
      `;
      checkoutBody.appendChild(tr);
    });

    grandTotalEl.textContent = grandTotal.toFixed(2);

    // Attach listeners for quantity inputs
    document.querySelectorAll("#checkout-body input[type='number']").forEach(input => {
      input.addEventListener("change", (e) => {
        const idx = parseInt(e.target.dataset.index);
        let newQty = parseInt(e.target.value);
        if (isNaN(newQty) || newQty < 1) {
          newQty = 1;
          e.target.value = 1;
        }
        cartArray[idx].quantity = newQty;
        saveArrayBackToStorage(cartArray);
        renderCheckout();
      });
    });

    // Attach listeners for remove buttons
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.dataset.index);
        cartArray.splice(idx, 1);
        saveArrayBackToStorage(cartArray);
        renderCheckout();
      });
    });
  }

  // Place order -> clear cart and go back to product page (or show a success message)
  placeOrderBtn.addEventListener("click", () => {
    if (cartArray.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    localStorage.removeItem("cartItems");
    cartArray = [];
    renderCheckout();
    // redirect to products
    window.location.href = "product.html";
  });

  backToShopBtn.addEventListener("click", () => {
    window.location.href = "product.html";
  });

  // initial render
  renderCheckout();
});
