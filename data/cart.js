export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity = cartQuantity + parseInt(cartItem.quantity);
    console.log(typeof cartQuantity);
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
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  console.log(cart);
}
