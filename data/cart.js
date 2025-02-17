export let cart;
loadFromStorage();
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

function saveStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity = cartQuantity + parseInt(cartItem.quantity);
    // console.log(typeof cartQuantity);
  });
  // console.log(typeof cartQuantity);
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    // console.log(cartItem);
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  // console.log(cart);
  saveStorage();
}

export function updateDeliveryOption(productId, deliveryOption) {
  // console.log(productId, deliveryOption);
  let matchingItem;
  // console.log(matchingItem);
  // matchingItem.deliveryOptionId = productId;
  // console.log(matchingItem);
  // matchingItem = cart;
  cart.forEach((cartItem) => {
    if (deliveryOption === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = productId;
  saveStorage();
}
