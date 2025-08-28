"use client";

import {
  IAddress,
  IAppSettings,
  IHomeData,
  INotification,
  IPaginatedData,
  IProduct,
} from "@/utils/types";
import React, { useEffect, useState } from "react";
import { globalAppDataContext } from "./global.context";
import { CartItem } from "../products/products.provider";

interface GlobalProviderProps extends React.PropsWithChildren {
  appData?: IHomeData;
  appSettings?: IAppSettings;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  // const [faqsData, setFaqsData] = useState<IAppQuestionsAnswer[]>(faqs || []);

  const [userAddresses, setUserAddresses] = useState<IAddress[] | null>(null);
  const [userNotifs, setUserNotifs] = useState<IPaginatedData<
    INotification[]
  > | null>(null);

  const [featProducts, setFeatProducts] = useState<IProduct[]>([]);

  const fetchHomeData = async () => {
    try {
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    }
  };
  const [favorites, setFavorites] = useState<
    { productId: string; is_favorite: boolean }[]
  >([]);

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

  const [remindedProducts, setRemindedProducts] = useState<string[]>([]);

  const addReminder = (productId: string) => {
    setRemindedProducts((prev) => [...prev, productId]);
  };
  const removeReminder = (productId: string) => {
    setRemindedProducts((prev) => prev.filter((id) => id !== productId));
  };

  useEffect(() => {
    // if (!appData) {
    //   setGlobalAppData(appData);
    // }
    // setFeatProducts(appData.special_products);
  }, []);

  return (
    <globalAppDataContext.Provider
      value={{
        setUserNotifs,
        addToCart,
        removeFromCart,
        cart,
        favorites,
        removeReminder,
        toggleFavorite,
        setFeatProducts,
        addReminder,
        remindedProducts,
        setFavorites,
        featProducts,
        userNotifs,
        fetchHomeData,
        userAddresses,
        setUserAddresses,
      }}
    >
      {children}
    </globalAppDataContext.Provider>
  );
};

export default GlobalProvider;
