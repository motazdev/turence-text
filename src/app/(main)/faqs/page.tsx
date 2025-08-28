import { noFaqs } from "@/assets";
import AppContainer from "@/components/AppContainer";
import FaqsAccordion from "@/components/home/faqs-accordion";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import appService from "@/services/app";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const data = await appService.getAllAppQuestionsAnswers();
  const isEmpty = data.data.length === 0;

  return (
    <div>
      <PageHeader text={"FAQs"} />
      <AppContainer>
        <AppBreadCrumb
          steps={[{ text: "Home", href: "/" }, { text: "FAQs" }]}
        />
        <div className="mt-10">
          {isEmpty && (
            <div className="flex py-32 justify-center gap-y-6 flex-col items-center">
              <div className="relative size-32">
                <Image
                  src={noFaqs}
                  alt="NoFaqs"
                  className="absolute inset-0 object-cover"
                />
              </div>
              <p className="text-center max-w-xs md:text-base text-sm">
                There are currently no frequently asked questions available.
              </p>
            </div>
          )}
          {!isEmpty && (
            <>
              <FaqsAccordion faqs={data.data} />
            </>
          )}
        </div>
      </AppContainer>
    </div>
  );
};

export default Page;
