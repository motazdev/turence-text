"use client";
import { makeup01 } from "@/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AppContainer from "../AppContainer";
import { TimelineProgress07 } from "../ui/timeline-progress-07";

const HowItWorks = () => {
  const t = useTranslations();
  return (
    <div className=" py-20 relative">
      <div className="ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-[rgba(0,0,0,0.7)] from-15% absolute inset-0 w-full h-full z-[11]"></div>

      <Image
        src={makeup01}
        alt="hero"
        className="absolute start-0 top-0 z-10 w-full h-full ltr:scale-x-[unset] rtl:scale-x-[-1] object-left object-cover"
        priority
      />
      <AppContainer className="flex flex-col relative z-30 justify-center items-center">
        <h1 className="text-white text-3xl font-semibold mb-2">
          {t("How it Works")}
        </h1>
        <p className="text-[#E8E8E8] text-center ltr:md:max-w-3xl rtl:md:max-w-xl max-w-sm md:text-base text-sm m-auto">
          {t("howitworks-desc")}
        </p>
        <div className="grid lg:grid-cols-2 lg:flex-row mt-8 flex-col gap-x-12 gap-y-12">
          <div className="col-start-2">
            <TimelineProgress07
              value={0}
              steps={[
                {
                  title: "Sign in",
                  description: "sign-in-howitwork-desc",
                },
                {
                  title: "Add to Cart",
                  description: "add-to-cart-howitwork-desc",
                },
                {
                  title: "Complete Order",
                  description: "complete-order-howitwork-desc",
                },
                {
                  title: "Shipping and Delivery",
                  description: "track-order-howitwork-desc",
                },
                {
                  title: "Enjoy your products",
                  description: "enjoy-products-howitwork-desc",
                },
              ]}
            />
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default HowItWorks;
