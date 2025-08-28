"use client";
import { needHelpBox } from "@/assets";
import Image from "next/image";
import AppContainer from "../AppContainer";
import { Button } from "../ui/button";
import TLArrowRight from "../right-arrow";
import TLinstagram from "../icons/tl-instagram-icon";
import TLFacebook from "../icons/tl-facebook-icon";
import TLLinkedIn from "../icons/tl-linkedin-icon";
import TLWhatsapp from "../icons/tl-whatsapp-icon";
import { useHomeData } from "@/contexts/global/home-data";
import Link from "next/link";
import TLTelegramLine from "../telegram-line";
import TLTwitterLine from "../twitter-line";
import { useTranslations } from "next-intl";

const NeedHelpBox = () => {
  const { homeData } = useHomeData();
  const t = useTranslations();
  return (
    <AppContainer>
      <div className=" mt-4 py-28 relative rounded-3xl">
        <div className="bg-gradient-to-l rounded-3xl from-[rgba(0,0,0,0.7)] from-15% absolute inset-0 w-full h-full z-[11]"></div>

        <Image
          src={needHelpBox}
          alt="hero"
          className="absolute start-0 rounded-3xl top-0 z-10 w-full h-full lg:object-left object-center object-cover"
        />
        <div className="flex flex-col items-center relative justify-center z-20">
          <h2 className="text-white lg:max-w-lg max-w-sm text-center text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {t("need-help-title")}
          </h2>
          <p className="text-white/90 max-w-sm text-center text-base mb-8 leading-relaxed lg:max-w-lg">
            {t("need-help-desc")}
          </p>
          <div className="flex lg:flex-row flex-col items-center gap-6">
            <Button className="group w-fit !pe-4 !ps-6 cursor-pointer  rounded-full h-12 overflow-hidden z-10 relative hover:shadow-blue-500/30 hover:bg-white/90 transition-all duration-300 hover:scale-105 bg-white text-[#020202] gorup">
              {t("Contact Us Now")}
              <TLArrowRight
                className="text-[#020202] me-1 size-6 transition-transform  rtl:rotate-180 rtl:group-hover:-translate-x-2 ltr:group-hover:translate-x-2"
                aria-hidden="true"
              />
            </Button>
            <div className="h-1 lg:block hidden rounded-full w-28 bg-white"></div>
            <div className="flex gap-3 items-center ">
              {homeData.communications.communication_instagram && (
                <Link
                  href={homeData.communications.communication_instagram}
                  className="cursor-pointer"
                >
                  <TLinstagram className="w-5 h-5 text-white" />
                </Link>
              )}

              {homeData.communications.communication_facebook && (
                <Link
                  href={homeData.communications.communication_facebook}
                  className="cursor-pointer"
                >
                  <TLFacebook className="w-5 h-5 text-white" />
                </Link>
              )}
              {homeData.communications.communication_linkedin && (
                <Link
                  href={homeData.communications.communication_linkedin}
                  className="cursor-pointer"
                >
                  <TLLinkedIn className="w-5 h-5 text-white" />
                </Link>
              )}
              {homeData.communications.communication_whatsapp && (
                <Link
                  href={`tel:${homeData.communications.communication_whatsapp}`}
                  className="cursor-pointer"
                >
                  <TLWhatsapp className="w-5 h-5 text-white" />
                </Link>
              )}
              {homeData.communications.communication_twitter && (
                <Link
                  href={homeData.communications.communication_twitter}
                  className="cursor-pointer"
                >
                  <TLTwitterLine className="w-5 h-5 text-white" />
                </Link>
              )}
              {homeData.communications.communication_telegram && (
                <Link
                  href={homeData.communications.communication_telegram}
                  className="cursor-pointer"
                >
                  <TLTelegramLine className="w-5 h-5 text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default NeedHelpBox;
