"use client";
import { IAppSettings, IHomeData, INotificationData } from "@/utils/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface HomeDataContextType {
  homeData: IHomeData;
  appSettings: IAppSettings;
  setUserNotifs: Dispatch<SetStateAction<INotificationData | null>>;
  userNotifs: INotificationData | null;
}

const HomeDataContext = createContext<HomeDataContextType | undefined>(
  undefined
);

interface HomeDataProviderProps {
  children: ReactNode;
  appSettings: IAppSettings;
  homeData: IHomeData;
}

export function HomeDataProvider({
  children,
  homeData,
  appSettings,
}: HomeDataProviderProps) {
  const [userNotifs, setUserNotifs] = useState<INotificationData | null>(null);
  return (
    <HomeDataContext.Provider
      value={{
        appSettings,
        homeData,
        setUserNotifs,
        userNotifs,
      }}
    >
      {children}
    </HomeDataContext.Provider>
  );
}

export function useHomeData() {
  const context = useContext(HomeDataContext);
  if (context === undefined) {
    throw new Error("useHomeData must be used within a HomeDataProvider");
  }
  return context;
}
