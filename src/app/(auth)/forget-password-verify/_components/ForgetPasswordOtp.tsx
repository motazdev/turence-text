"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import OtpForm from "./Form";
const ForgetPasswordOtp = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  useEffect(() => {
    if (!email) {
      redirect("/");
    }
  }, [searchParams]);

  return (
    <div className="max-w-[549px] mx-auto mt-20">
      <Link
        href={"/"}
        className="hidden md:block w-[102px] md:w-[122px] mx-auto"
      >
        {/* <Image src={auth_logo_white} alt="logo" loading="lazy" /> */}
      </Link>
      <div className="head mt-6 md:m-0">
        <Link
          href={"/register"}
          className="hidden md:flex justify-center items-center w-10 h-10 rounded-lg ltr:rotate-180"
          style={{ backgroundColor: "#E9EFF5" }}
        >
          {/* <IoIosArrowForward /> */}
        </Link>
        <h2 className="text-xl md:text-2xl mt-4 font-medium">
          {t("Verify your identity")}
        </h2>
        <div className="text-sm md:text-base flex flex-col mt-3 text-gray-400">
          <span className="hent-color">
            {t("We have sent a 6-digit code to")}
          </span>
          <span className="text-black font-medium">{email}</span>
          <span className="hent-color">
            {t("This code will be valid for minutes")}
          </span>
        </div>
      </div>
      {email && <OtpForm query={email} />}
    </div>
  );
};

export default ForgetPasswordOtp;
