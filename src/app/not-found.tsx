import { notfound } from "@/assets";
import Navbar from "@/components/shared/navbar/navbar";
import FooterStyle13 from "@/components/ui/footer-style-13";
import { HomeDataProvider } from "@/contexts/global/home-data";
import appService from "@/services/app";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const NotFound = async () => {
  const homeData = await appService.getHomeData();
  const appSettings = await appService.getAppSettings();
  const t = await getTranslations();
  return (
    <HomeDataProvider appSettings={appSettings.data} homeData={homeData.data}>
      <div className="">
        <Navbar />
        <div className="main flex flex-col m-auto items-center justify-center w-full h-[400px]">
          <div className="relative size-32">
            <Image
              src={notfound}
              className="absolute inset-0"
              alt="notfound404"
            />
          </div>
          <p className="text-lg font-semibold">
            {t("Oops! This page doesn't exist")}
          </p>
        </div>
        <FooterStyle13 />
      </div>
    </HomeDataProvider>
  );
};

export default NotFound;
