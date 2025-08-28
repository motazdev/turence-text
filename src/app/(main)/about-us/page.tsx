import { aboutUs01, aboutUs02, aboutUs03, aboutUs04 } from "@/assets";
import AppContainer from "@/components/AppContainer";
import Faqs from "@/components/home/faqs";
import HowItWorks from "@/components/home/how-it-works";
import Reviews from "@/components/home/reviews";
import TLStarFill from "@/components/icons/tl-star-fill";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import appService from "@/services/app";
// import TLLogoWhiteIcon from "@/components/icons/tl-logo-white-icon";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const Page = async () => {
  const t = await getTranslations();
  const data = await appService.getAboutUsData();
  return (
    <div>
      <PageHeader text="About Us" />

      <AppContainer className="">
        <AppBreadCrumb
          steps={[{ text: "Home", href: "/" }, { text: "About Us" }]}
        />
        <div className="grid lg:grid-cols-3 grid-cols-1">
          <div className="col-span-2 mt-10 lg:text-start lg:mb-0 mb-8 text-center">
            <h1 className="text-4xl max-w-lg m-auto lg:m-0 font-semibold">
              {t("Trusted By")}{" "}
              <span className="text-[#05613A]">{data.data.clients_count}</span>+{" "}
              <span className="text-[#05613A]">{t("Client")}</span>{" "}
              {t("Worldwide Since")}{" "}
              <span className="text-[#05613A]">{data.data.since_year}</span>
            </h1>
          </div>
          <div className="col-span-1 flex flex-row justify-between lg:px-0 px-8">
            <div className="flex justify-center items-center flex-col">
              <p className="text-main-black lg:text-4xl text-2xl font-semibold">
                {data.data.ratings}
              </p>
              <div className="flex flex- row gap-x-1 [&>svg]:size-5">
                <TLStarFill />
                <TLStarFill />
                <TLStarFill />
                <TLStarFill />
                <TLStarFill />
              </div>
              <p className="text-main-black text-base font-medium">
                {data.data.ratings_count} {t("Ratings")}
              </p>
            </div>
            <div className="flex justify-center items-start flex-col">
              <p className="text-main-black lg:text-4xl text-2xl text-start font-semibold">
                {data.data.worldwide_product_sale_per_year}
              </p>

              <p className="text-main-black text-base font-medium max-w-[10rem] text-start">
                {t("Worldwide Product Sale Per Year")}
              </p>
            </div>
          </div>
        </div>
      </AppContainer>
      <AppContainer className="flex md:flex-row flex-col items-center  gap-8 mt-28">
        <div className="relative group size-[350px]">
          <div className="top-0 absolute start-0 size-[48%] z-10 transition-all duration-300 ease-out group-hover:scale-105">
            <div className="relative rtl:scale-x-[-1] w-full h-full overflow-hidden rounded-lg">
              <Image
                src={aboutUs01}
                alt="aboutus1"
                className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="top-0 absolute end-0 size-[48%] z-10 transition-all duration-300 ease-out group-hover:scale-105">
            <div className="relative rtl:scale-x-[-1] w-full h-full overflow-hidden rounded-lg">
              <Image
                src={aboutUs02}
                alt="aboutus2"
                className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="bottom-0 absolute start-0 size-[48%] z-10 transition-all duration-300 ease-out group-hover:scale-105">
            <div className="relative rtl:scale-x-[-1] w-full h-full overflow-hidden rounded-lg">
              <Image
                src={aboutUs03}
                alt="aboutus3"
                className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="bottom-0 absolute end-0 size-[48%] z-10 transition-all duration-300 ease-out group-hover:scale-105">
            <div className="relative rtl:scale-x-[-1] w-full h-full overflow-hidden rounded-lg">
              <Image
                src={aboutUs04}
                alt="aboutus4"
                className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col  flex-1 max-w-5xl gap-y-4">
          <div className=" relative">
            <h6 className="before:h-5 font-semibold before:bottom-2/4 before:translate-y-2/4 before:w-[2px] before:bg-[#093800] text-[#093800] before:rounded-full before:absolute before:-ms-2 ms-2">
              {t("How It Works")}
            </h6>
          </div>
          <h1 className="text-3xl font-semibold max-w-md leading-10">
            {t("aboutus-heading01")}{" "}
            <span className="text-[#168500]">{t("aboutus-heading02")}</span>
          </h1>
          <p>{data.data.aboutus_description_page}</p>
        </div>
      </AppContainer>
      <div className="mt-20">
        <HowItWorks />
      </div>

      {/* <AppContainer className="flex flex-col md:flex-row items-center gap-8 py-16 md:py-24">
        <div className="flex flex-col flex-1   py-8 bg-gray-50/50 rounded-xl">
          <h2 className="text-2xl text-center max-w-xl mx-auto md:text-3xl font-semibold mb-6 text-[#404040]">
            {t("aboutus-heading-2")}
          </h2>

          <p className="text-gray-700 text-center leading-relaxed mt-4">
            {t("aboutus-about")}
          </p>
        </div>
      </AppContainer>
    */}
      <Reviews />
      <Faqs />
    </div>
  );
};

export default Page;
