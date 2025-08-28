import AppContainer from "@/components/AppContainer";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import appService from "@/services/app";
import React from "react";

const Page = async () => {
  const policyData = await appService.getTermsAndConditions();

  return (
    <div>
      <PageHeader text="Terms and Conditions" />
      <AppContainer>
        <AppBreadCrumb
          steps={[
            { text: "Home", href: "/" },
            { text: "Terms and Conditions" },
          ]}
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
