"use client";
import { IProduct } from "@/utils/types";
import { createContext, useContext } from "react";
interface CartItem {
  quantity: number;
  cart_item_id: string | null;
}
interface productsContextType {
  products?: IProduct[] | null;
  setProducts?: (products: IProduct[] | null) => void;
  toggleFavorite: (productId: string, isFavorite?: boolean) => void;
  setFavsProducts: React.Dispatch<React.SetStateAction<IProduct[] | null>>;
  favsProducts: IProduct[] | null;
  favorites: {
    productId: string;
    is_favorite: boolean;
  }[];
  cart: {
    [productId: string]: CartItem;
  };
  addToCart: (productId: string, cartItemId?: string | null) => void;
  removeFromCart: (productId: string) => void;
}

export const ProductsContext = createContext<productsContextType>(
  {} as productsContextType
);

export const useProducts = () => useContext(ProductsContext);
