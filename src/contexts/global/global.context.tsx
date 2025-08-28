"use client";
import {
  IAddress,
  IAppSettings,
  IHomeData,
  INotification,
  IPaginatedData,
  IProduct,
} from "@/utils/types";
import { createContext, useContext } from "react";
import { CartItem } from "../products/products.provider";
interface globalAppDataContextType {
  userAddresses: IAddress[] | null;
  setUserAddresses: React.Dispatch<React.SetStateAction<IAddress[] | null>>;
  setUserNotifs: React.Dispatch<
    React.SetStateAction<IPaginatedData<INotification[]> | null>
  >;
  userNotifs: IPaginatedData<INotification[]> | null;
  fetchHomeData: () => Promise<void>;
  setFeatProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  featProducts: IProduct[];
  toggleFavorite: (productId: string, isFavorite?: boolean) => void;
  favorites: {
    productId: string;
    is_favorite: boolean;
  }[];
  cart: {
    [productId: string]: CartItem;
  };
  setFavorites: React.Dispatch<
    React.SetStateAction<
      {
        productId: string;
        is_favorite: boolean;
      }[]
    >
  >;
  addToCart: (productId: string, cartItemId?: string | null) => void;
  removeFromCart: (productId: string) => void;
  remindedProducts: string[];
  addReminder: (productId: string) => void;
  removeReminder: (productId: string) => void;
}

export const globalAppDataContext = createContext<globalAppDataContextType>(
  {} as globalAppDataContextType
);

export const useGlobalAppData = () => useContext(globalAppDataContext);
