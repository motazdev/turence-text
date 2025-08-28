import AppContainer from "@/components/AppContainer";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import appService from "@/services/app";
import React from "react";

const Page = async () => {
  const policyData = await appService.getPrivacyPolicy();

  return (
    <div>
      <PageHeader text="Privacy Policy" />
      <AppContainer>
        <AppBreadCrumb
          steps={[{ text: "Home", href: "/" }, { text: "Privacy Policy" }]}
        />
      </AppContainer>
      <AppContainer className=" policy-container ">
        <div
          className="py-6"
          dangerouslySetInnerHTML={{ __html: policyData.data.text }}
        />
      </AppContainer>
    </div>
  );
};

export default Page;
