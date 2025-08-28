import { ICart } from "@/utils/types";
import { create } from "zustand";

interface UserStoreState {
  cart: ICart | null;
  setCart: (cart: ICart) => void;
  cartItemsCount: null | number;
  setCartItemsCount: (count: number) => void;
}

const useCartStore = create<UserStoreState>((set) => ({
  cart: null,
  cartItemsCount: null,
  setCart: (cart) => set({ cart }),
  setCartItemsCount: (count) => set({ cartItemsCount: count }),
}));

export default useCartStore;
