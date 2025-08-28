"use client";
import React, { useState } from "react";
import AppContainer from "../AppContainer";
import TLX from "../icons/tl-x-icon";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const AdBox = () => {
  const [isHidden, setIsHidden] = useState(false);
  const t = useTranslations();
  return (
    <div
      className={cn(
        "overflow-hidden transition-[max-height,padding] duration-500 ease-in-out bg-[#1B1B1B] text-white",
        isHidden ? "max-h-0 py-0" : "max-h-[200px] py-5"
      )}
    >
      <AppContainer className="relative">
        <div
          onClick={() => setIsHidden(true)}
          className="md:hidden flex absolute end-2 cursor-pointer"
        >
          <TLX />
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-y-3 items-center">
          <h5 className="md:text-sm text-xs">
            {t("Support")} <span dir="ltr">(+971) 728208909</span>
          </h5>
          <h5 className="text-sm font-normal md:max-w-full max-w-xs leading-8 text-center">
            {t("Sign Up and")}{" "}
            <span className="font-semibold">{t("Get %25 OFF")}</span>{" "}
            {t("for your First order")}{" "}
            <Link
              href={"/register"}
              className="text-[#F69D4F] cursor-pointer underline font-semibold"
            >
              {t("Sign Up Now")}
            </Link>
          </h5>
          <div
            onClick={() => setIsHidden(true)}
            className="md:flex hidden cursor-pointer"
          >
            <TLX />
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default AdBox;
