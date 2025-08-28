import { sleepBell } from "@/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const EmptyNotifications = () => {
  const t = useTranslations();
  return (
    <div className="flex py-32 justify-center gap-y-6 flex-col items-center">
      <div className="relative size-32">
        <Image
          src={sleepBell}
          alt="NoNotifications"
          className="absolute inset-0 object-cover"
        />
      </div>
      <p className="text-center max-w-xs md:text-base text-sm">
        {t("no-notifs")}
      </p>
    </div>
  );
};

export default EmptyNotifications;
