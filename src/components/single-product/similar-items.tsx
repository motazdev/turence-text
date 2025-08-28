import React from "react";
import TLLogoIcon from "../icons/tl-logo-icon";
import SimilarItemsSwiper from "./similar-items-swiper";
import { useTranslations } from "next-intl";
import { IProduct } from "@/utils/types";
import TlGrayIcon from "../icons/tl-gray-icon";

const SimilarItems = ({ data }: { data: IProduct[] }) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col justify-center mb-30 mt-8 gap-5">
      <div className="flex  md:flex-row flex-col justify-between md:items-center items-start">
        <div className="relative">
          <h2 className="md:text-xl z-5 relative text-lg font-semibold">
            {t("Similar Items")}
          </h2>
          <div className="w-10 h-1 rounded-full bg-[#404040]"></div>
          <div className="absolute z-[4] bottom-3">
            <TlGrayIcon />
          </div>
        </div>
      </div>
      <div className="">
        <SimilarItemsSwiper data={data} />
      </div>
    </div>
  );
};

export default SimilarItems;
