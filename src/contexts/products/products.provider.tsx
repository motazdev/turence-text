"use client";

import { IProduct } from "@/utils/types";
import React, { useState } from "react";
import { ProductsContext } from "./products.context";
export interface CartItem {
  quantity: number;
  cart_item_id: string | null;
}
interface ProductsProviderProps extends React.PropsWithChildren {
  products?: IProduct[] | null;
  setProducts?: (products: IProduct[] | null) => void;
}

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [favorites, setFavorites] = useState<
    { productId: string; is_favorite: boolean }[]
  >([]);

  const [favsProducts, setFavsProducts] = useState<IProduct[] | null>(null);

  const [cart, setCart] = useState<{ [productId: string]: CartItem }>({});
  const addToCart = (productId: string, cartItemId: string | null = null) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: {
        quantity: (prevCart[productId]?.quantity || 0) + 1,
        cart_item_id: cartItemId,
      },
    }));
  };
  // Remove a product from the cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const cartItem = newCart[productId];
      if (cartItem) {
        delete newCart[productId];
      }

      return newCart;
    });
  };

  const toggleFavorite = (productId: string, isFavorite?: boolean) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];

      // Find the index of the product in the favorites list
      const index = newFavorites.findIndex(
        (fav) => fav.productId === productId
      );

      if (isFavorite !== undefined) {
        if (index === -1) {
          newFavorites.push({ productId, is_favorite: isFavorite });
        } else {
          newFavorites[index].is_favorite = isFavorite;
        }
      } else {
        // Toggle behavior if isFavorite is not provided
        if (index === -1) {
          newFavorites.push({ productId, is_favorite: true });
        } else {
          newFavorites[index].is_favorite = false; // Instead of removing, set is_favorite to false
        }
      }

      return newFavorites;
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        toggleFavorite,
        favorites,
        setFavsProducts,
        favsProducts,
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
