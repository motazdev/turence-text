import Link from "next/link";
import TLFacebook from "../icons/tl-facebook-icon";
import TLinstagram from "../icons/tl-instagram-icon";
import TLLinkedIn from "../icons/tl-linkedin-icon";
import TLTelegram from "../icons/tl-telegram-icon";
import TLWhatsapp from "../icons/tl-whatsapp-icon";
import { Button } from "../ui/button";
import TLArrowRight from "../right-arrow";
import { useHomeData } from "@/contexts/global/home-data";
import { useTranslations } from "next-intl";

const HeroActions = () => {
  const { homeData } = useHomeData();
  const t = useTranslations();
  return (
    <div className="flex lg:flex-row lg:justify-start justify-center flex-col relative mt-6 items-center lg:space-x-7">
      <Link href={"/categories"}>
        <Button className="bg-main peer py-6 w-40 rounded-xl cursor-pointer hover:bg-main/80 group">
          {t("Shop Now")}{" "}
          <span>
            <TLArrowRight className="text-white size-6 transition-transform duration-300 rtl:rotate-180 rtl:group-hover:-translate-x-2 ltr:group-hover:translate-x-2" />
          </span>
        </Button>
      </Link>
      <div className="bg-main w-24 h-1 lg:block hidden rounded-full"></div>
      <div className="bg-main w-1 h-8 lg:hidden block my-3 rounded-full"></div>
      <div className="flex flex-row gap-2 ">
        {homeData.communications.communication_instagram && (
          <Link
            target="_blank"
            href={homeData.communications.communication_instagram}
            className="bg-white hover:shadow-sm transition-all duration-300 flex z-30 rounded-full justify-center items-center size-10"
          >
            <TLinstagram size="20" />
          </Link>
        )}

        {homeData.communications.communication_facebook && (
          <Link
            target="_blank"
            href={homeData.communications.communication_facebook}
            className="bg-white flex z-30 hover:shadow-sm transition-all duration-300 rounded-full justify-center items-center size-10"
          >
            <TLFacebook size="20" />
          </Link>
        )}
        {homeData.communications.communication_linkedin && (
          <Link
            target="_blank"
            href={homeData.communications.communication_linkedin}
            className="bg-white flex z-30 hover:shadow-sm transition-all duration-300 rounded-full justify-center items-center size-10"
          >
            <TLLinkedIn size="20" />
          </Link>
        )}
        {homeData.communications.communication_telegram && (
          <Link
            target="_blank"
            href={homeData.communications.communication_telegram}
            className="bg-white flex z-30 hover:shadow-sm transition-all duration-300 rounded-full justify-center items-center size-10"
          >
            <TLTelegram size="20" />
          </Link>
        )}
        {homeData.communications.communication_whatsapp && (
          <Link
            target="_blank"
            href={`tel:${homeData.communications.communication_whatsapp}`}
            className="bg-white flex z-30 hover:shadow-sm transition-all duration-300 rounded-full justify-center items-center size-10"
          >
            <TLWhatsapp size="20" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroActions;
