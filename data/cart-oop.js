function Cart(localStorageKey) {
  const cart = {
    cartItem: undefined,
    loadFromStorage() {
      this.cartItem = JSON.parse(localStorage.getItem(localStorageKey)) || [
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
    },

    saveStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
    },

    updateCartQuantity() {
      let cartQuantity = 0;

      this.cartItem.forEach((cartItem) => {
        cartQuantity = cartQuantity + parseInt(cartItem.quantity);
        // console.log(typeof cartQuantity);
      });
      // console.log(typeof cartQuantity);
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    },

    addToCart(productId) {
      let matchingItem;

      this.cartItem.forEach((cartItem) => {
        // console.log(cartItem);
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItem.push({
          productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.saveStorage();
    },
    removeFromCart(productId) {
      const newCart = [];
      this.cartItem.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItem = newCart;
      // console.log(cart);
      this.saveStorage();
    },
    updateDeliveryOption(productId, deliveryOption) {
      // console.log(productId, deliveryOption);
      let matchingItem;
      // console.log(matchingItem);
      // matchingItem.deliveryOptionId = productId;
      // console.log(matchingItem);
      // matchingItem = cart;
      this.cartItem.forEach((cartItem) => {
        if (deliveryOption === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.deliveryOptionId = productId;
      this.saveStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

console.log(cart);
console.log(businessCart);
