import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { formateCurrency } from "/utils/money.js";

// console.log(dayjs());
// console.log(new Date());
// const date = new Date().toDateString();
console.log(products);
export function renderOrderSummary() {
  let cartSummary = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    // let deliveryOption;
    // deliveryOptions.forEach((delivery) => {
    //   if (delivery.id === deliveryOptionId) {
    //     deliveryOption = delivery;
    //   }
    // });
    // console.log(deliveryOption);
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    // console.log(deliveryOption);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + deliveryOption.deliveryDays);
    // console.log(currentDate);
    const dateString = currentDate.toDateString();
    // console.log(dateString);
    cartSummary += ` <div class="cart-item-container js-cart-item-container-${
      matchingItem.id
    }">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingItem.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  
                ${matchingItem.name}
                </div>
                <div class="product-price">${
                  matchingItem.getPrice()}</div>
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
                
                
                ${deliveryOptionsHtml(matchingItem, cartItem)}
                  
                  
              </div>
            </div>
          </div>`;
  });
  // console.log(cartSummary);

  function deliveryOptionsHtml(matchingItem, cartItem) {
    let deliveryOptionHTML = "";
    deliveryOptions.forEach((deliveryOption) => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + deliveryOption.deliveryDays);
      // console.log(currentDate);
      const dateString = currentDate.toDateString();
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formateCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryOptionHTML += `<div class="delivery-option js-delivery-option" data-delivery-option-id=${
        matchingItem.id
      } data-product-id=${deliveryOption.id}>
                  <input type="radio"
                    class="delivery-option-input"
                   
                  ${isChecked && "checked"}
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                   ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}-Shiping
                    </div>
                  </div>
                </div>`;
    });
    return deliveryOptionHTML;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummary;

  // console.log(document.querySelectorAll(".js-delete-link"));

  document.querySelectorAll(".js-delete-link").forEach((button) => {
    button.addEventListener("click", () => {
      // console.log(button.dataset.deleteId);
      const deleteId = button.dataset.deleteId;

      removeFromCart(deleteId);

      const container = document.querySelector(
        `.js-cart-item-container-${deleteId}`
      );
      container.remove();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      // console.log('vloo');
      const deliveryOptionId = element.dataset.deliveryOptionId;
      const productId = element.dataset.productId;
      //  console.log(productId, deliveryOptionId);
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();
