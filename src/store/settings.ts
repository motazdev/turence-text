import { getCookie } from "cookies-next";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStoreState {
  selectedLanguage: string;
  updateSelectedLanguage: (lang: string) => void;
}

const getDefaultLanguage = (): string => {
  const cookieStore = getCookie("NEXT_LOCALE")?.toString();
  const selectedLanguage = cookieStore;
  return selectedLanguage || "en";
};

const useSettingsStore = create<SettingsStoreState>()(
  persist(
    (set) => ({
      selectedLanguage: getDefaultLanguage(),
      updateSelectedLanguage: (selectedLanguage) => {
        set({ selectedLanguage });
      },
    }),
    { name: "settings" }
  )
);

export default useSettingsStore;
