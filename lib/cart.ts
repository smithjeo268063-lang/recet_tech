export type CartItem = {
  productId: number;
  quantity: number;
};

export const CART_STORAGE_KEY = "recettech-cart";
export const CART_UPDATED_EVENT = "recettech-cart-updated";
export const CART_ITEM_ADDED_EVENT = "recettech-cart-item-added";

export function parseCart(value: string | null): CartItem[] {
  if (!value) {
    return [];
  }

  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) {
    throw new Error("Cart data is not a list.");
  }

  return parsed.map((item: unknown) => {
    if (
      typeof item !== "object" ||
      item === null ||
      !("productId" in item) ||
      !("quantity" in item) ||
      typeof item.productId !== "number" ||
      !Number.isInteger(item.productId) ||
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      throw new Error("Cart contains an invalid item.");
    }

    return { productId: item.productId, quantity: item.quantity };
  });
}

export function readCart(): CartItem[] {
  return parseCart(window.localStorage.getItem(CART_STORAGE_KEY));
}

export function writeCart(cart: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addCartItem(productId: number) {
  const cart = readCart();
  const item = cart.find((entry) => entry.productId === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  writeCart(cart);
}

export function notifyCartItemAdded(productTitle: string) {
  window.dispatchEvent(
    new CustomEvent(CART_ITEM_ADDED_EVENT, { detail: { productTitle } }),
  );
}
