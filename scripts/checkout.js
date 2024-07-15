import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formateCurrency } from "../utils/money.js";

let cartSummary = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingItem;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingItem = product;
    }
  });
  cartSummary += ` <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingItem.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  
                ${matchingItem.name}
                </div>
                <div class="product-price">$${formateCurrency(
                  matchingItem.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">2</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-delete-id=${
                    matchingItem.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});
// console.log(cartSummary);

document.querySelector(".js-order-summary").innerHTML = cartSummary;

// console.log(document.querySelectorAll(".js-delete-link"));

document.querySelectorAll(".js-delete-link").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log(button.dataset.deleteId);
    const deleteId = button.dataset.deleteId;

    removeFromCart(deleteId);

    // let newCart = [];
    // cart.forEach((cartItem) => {
    //   // console.log(deleteId, cartItem.productId);
    //   if (cartItem.productId !== deleteId) {
    //     console.log("hh");
    //     newCart.push(cartItem);
    //   }
    // });
    // cart = newCart;
    // console.log(cart);
  });
});
