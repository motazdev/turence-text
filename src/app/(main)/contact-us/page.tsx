import AppContainer from "@/components/AppContainer";
import ContactLinksItems from "@/components/contact-us/contact-links-items";
import ContactUsForm from "@/components/contact-us/contact-us-form";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import appService from "@/services/app";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations();
  const data = await appService.getContactUsData();
  return (
    <div>
      <PageHeader text="Contact Us" />
      <AppContainer>
        <AppBreadCrumb
          steps={[{ text: "Home", href: "/" }, { text: "Contact Us" }]}
        />
      </AppContainer>
      <AppContainer className="lg:grid mb-24 gap-x-4 flex gap-y-8 lg:grid-cols-2 flex-col-reverse mt-12">
        <div className="flex flex-col  lg:mb-0 mb-12 gap-y-3">
          <h1 className="text-xl font-semibold lg:text-start text-center">
            {t("Send Us Message")}
          </h1>
          <p className="text-[#545454] text-sm mb-2 lg:text-start text-center">
            {t("Get in touch desc")}
          </p>
          <ContactLinksItems data={data.data} />
        </div>
        <div className="w-full">
          <ContactUsForm />
        </div>
      </AppContainer>
    </div>
  );
};

export default Page;
