import { create } from "zustand";

interface ProductsCartStoreState {
  productsCart: string[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

const useProductsCartStore = create<ProductsCartStoreState>((set) => ({
  productsCart: [],
  addToCart: (productId) =>
    set((state) => ({
      productsCart: state.productsCart.includes(productId)
        ? state.productsCart
        : [...state.productsCart, productId],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      productsCart: state.productsCart.filter((id) => id !== productId),
    })),
}));

export default useProductsCartStore;
