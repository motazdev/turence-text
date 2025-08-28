"use client";
import { useHomeData } from "@/contexts/global/home-data";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import AppContainer from "../AppContainer";
import TlGrayIcon from "../icons/tl-gray-icon";
import ProductCard from "../single-product/product-card";

const TopSellerProducts = () => {
  const t = useTranslations();
  const { homeData } = useHomeData();
  return (
    <>
      {homeData.products.length > 0 ? (
        <div className="flex flex-col my-24 gap-5">
          <AppContainer>
            <div className="flex flex-row justify-between items-center">
              <div className="relative">
                <h2 className="md:text-xl z-5 relative text-lg font-semibold">
                  {t("Our Top Seller Products")}
                </h2>
                <div className="w-10 h-1 rounded-full bg-[#404040]"></div>
                <div className="absolute z-[4] bottom-3">
                  <TlGrayIcon />
                </div>
              </div>
              <Link
                href={"/products"}
                className="text-[#404040] group peer flex flex-row gap-2 items-center cursor-pointer text-sm"
              >
                {t("View All Items")}{" "}
                <ArrowRight
                  className="rtl:rotate-180 transition-transform duration-300 rtl:group-hover:-translate-x-2 ltr:group-hover:translate-x-2"
                  size={18}
                />
              </Link>
            </div>
            <div className="grid md:grid-cols-4 gap-5 w-auto  mt-12 sm:grid-cols-2 grid-cols-2">
              {homeData.products.map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
            </div>
          </AppContainer>
        </div>
      ) : (
        <div className="mt-4"></div>
      )}
    </>
  );
};

export default TopSellerProducts;
