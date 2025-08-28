import { IContactUsData } from "@/utils/types";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import TLFaceBookLine from "../facebook-line";
import TLCommunicationEmail from "../icons/tl-communication-email-icon";
import TLCommunicationLocation from "../icons/tl-communication-location-icon";
import TLCommunicationPhone from "../icons/tl-communication-phone-icon";
import TLInstagramLine from "../instagram-line";
import TLLinkedInLine from "../linkedin-line";
import TLMessangerLine from "../messanger-line";
import TLTelegramLine from "../telegram-line";
import TLWhatsappLine from "../whatsapp-line";

const ContactLinksItems = ({ data }: { data: IContactUsData }) => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-y-3">
      {data.communication_email && (
        <div className="contact-item flex flex-row gap-3 items-center">
          <div className=" text-[#404040]">
            <TLCommunicationEmail />
          </div>
          <div className="flex-1 flex-col flex">
            <span className=" text-[#8A8A8A]">{t("Email")}</span>
            <span className="text-[#020202] font-medium">
              {data.communication_email}
            </span>
          </div>
        </div>
      )}
      {data.communication_mobile && (
        <div className="contact-item flex flex-row gap-3 items-center">
          <div className=" text-[#404040]">
            <TLCommunicationPhone />
          </div>
          <div className="flex-1 flex-col flex">
            <span className=" text-[#8A8A8A]">{t("Phone")}</span>
            <span
              className="text-[#020202] font-medium rtl:text-right ltr:text-left"
              dir="ltr"
            >
              {data.communication_mobile}
            </span>
          </div>
        </div>
      )}
      {locale === "ar" ? (
        <>
          {data.communication_address_ar && (
            <div className="contact-item flex flex-row gap-3 items-center">
              <div className=" text-[#404040]">
                <TLCommunicationLocation />
              </div>
              <div className="flex-1 flex-col flex">
                <span className=" text-[#8A8A8A]">{t("Location")}</span>
                <span className="text-[#020202] font-medium">
                  {data.communication_address_ar}
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {data.communication_address_en && (
            <div className="contact-item flex flex-row gap-3 items-center">
              <div className=" text-[#404040]">
                <TLCommunicationLocation />
              </div>
              <div className="flex-1 flex-col flex">
                <span className=" text-[#8A8A8A]">{t("Location")}</span>
                <span className="text-[#020202] font-medium">
                  {data.communication_address_en}
                </span>
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex mt-4 flex-row gap-3 items-center">
        {data.communication_instagram && (
          <Link
            href={data.communication_instagram}
            className="bg-[#F4F7F9] rounded-lg flex justify-center items-center p-2 size-10 text-main-black"
          >
            <TLInstagramLine />
          </Link>
        )}
        {data.communication_facebook && (
          <Link
            href={data.communication_facebook}
            className="bg-[#F4F7F9] rounded-lg flex justify-center items-center p-2 size-10 text-main-black"
          >
            <TLMessangerLine />
          </Link>
        )}
        {data.communication_facebook && (
          <Link
            href={data.communication_facebook}
            className="bg-[#F4F7F9] rounded-lg flex justify-center items-center p-2 size-10 text-main-black"
          >
            <TLFaceBookLine />
          </Link>
        )}
        {data.communication_linkedin && (
          <Link
            href={data.communication_linkedin}
            className="bg-[#F4F7F9] rounded-lg flex justify-center items-center p-2 size-10 text-main-black"
          >
            <TLLinkedInLine />
          </Link>
        )}
        {data.communication_telegram && (
          <Link
            href={data.communication_telegram}
            className="bg-[#F4F7F9] rounded-lg flex justify-center items-center p-2 size-10 text-main-black"
          >
            <TLTelegramLine />
          </Link>
        )}
        {data.communication_whatsapp && (
          <Link
            href={data.communication_whatsapp}
            className="bg-[#F4F7F9] rounded-lg flex justify-center items-center p-2 size-10 text-main-black"
          >
            <TLWhatsappLine />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ContactLinksItems;
