import { useTranslations } from "next-intl";
import React from "react";

const NotifTitle = () => {
  const t = useTranslations();
  return (
    <h1 className="font-semibold my-8 text-center text-2xl">
      {t("Notifications")}
    </h1>
  );
};

export default NotifTitle;
