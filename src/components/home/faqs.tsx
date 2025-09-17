"use client";
import { useHomeData } from "@/contexts/global/home-data";
import { useTranslations } from "next-intl";
import AppContainer from "../AppContainer";
import FaqsAccordion from "./faqs-accordion";
import TlGrayIcon from "../icons/tl-gray-icon";

const Faqs = () => {
  const t = useTranslations();
  const { homeData } = useHomeData();
  return (
    <>
      {homeData.faqs.length > 0 && (
        <div className="flex flex-col mt-24  gap-5">
          <AppContainer>
            <div className="flex flex-col items-center justify-center mb-10 ">
              <div className="relative">
                <h2 className="md:text-xl relative z-5 text-3xl font-semibold ">
                  {t("FAQs")}
                </h2>
                <div className="w-10 m-auto h-1 rounded-full bg-[#404040]"></div>
              </div>
              <p className="lg:max-w-[30%] md:max-w-[70%] max-w-[90%] mt-2 text-center">
                {t("FAQs Desc")}
              </p>
            </div>
          </AppContainer>
          <AppContainer className="mb-24">
            <FaqsAccordion faqs={homeData.faqs} />
          </AppContainer>
        </div>
      )}
    </>
  );
};

export default Faqs;
