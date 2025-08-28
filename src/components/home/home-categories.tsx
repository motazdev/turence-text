"use client";
import { useTranslations } from "next-intl";
import AppContainer from "../AppContainer";
import TlGrayIcon from "../icons/tl-gray-icon";
import CategoriesSwiper from "./categories-swiper";
import { useHomeData } from "@/contexts/global/home-data";

const HomeCategories = () => {
  const t = useTranslations();
  const { homeData } = useHomeData();
  return (
    <>
      {homeData.categories.length > 0 && (
        <div className="flex flex-col my-24 gap-5">
          <AppContainer>
            <div className="flex flex-row justify-between items-center">
              <div className="relative">
                <h2 className="md:text-xl z-[5] relative text-lg font-semibold">
                  {t("Our Categories")}
                </h2>
                <div className="w-10 h-1 rounded-full bg-main"></div>

                <div className="absolute z-[4] bottom-3">
                  <TlGrayIcon />
                </div>
              </div>
            </div>
            <CategoriesSwiper />
          </AppContainer>
        </div>
      )}
    </>
  );
};

export default HomeCategories;
