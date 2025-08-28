import { IHomeData } from "@/utils/types";
import { create } from "zustand";

interface HomeDataStoreState {
  data: IHomeData | null;
  setHomeData: (data: IHomeData) => void;
}

const useHomeDataStore = create<HomeDataStoreState>((set) => ({
  data: null,
  setHomeData: (data) => set({ data }),
}));

export default useHomeDataStore;
