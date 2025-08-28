"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";

interface BreadcrumbStep {
  text?: string;
  href?: string;
  translated?: string;
}

interface AppBreadCrumbProps {
  steps: BreadcrumbStep[];
}

const AppBreadCrumb = ({ steps }: AppBreadCrumbProps) => {
  const t = useTranslations();
  return (
    <Breadcrumb className="bg-[#ECECEC66] lg:px-4 lg:py-5 py-3 my-4 rounded-2xl">
      <BreadcrumbList className="flex flex-row lg:text-base text-xs items-center gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-row items-center">
            <BreadcrumbItem>
              {index === steps.length - 1 ? (
                <BreadcrumbPage className="cursor-pointer text-[#8A8A8A] hover:text-[#404040] font-medium">
                  {step.text
                    ? t(step.text.charAt(0).toUpperCase() + step.text.slice(1))
                    : step.translated
                    ? step.translated.charAt(0).toUpperCase() +
                      step.translated.slice(1)
                    : ""}
                </BreadcrumbPage>
              ) : (
                <>
                  {step.href ? (
                    <BreadcrumbLink
                      href={step.href}
                      className="text-[#404040] cursor-pointer transition-colors duration-300"
                    >
                      {step.text
                        ? t(
                            step.text.charAt(0).toUpperCase() +
                              step.text.slice(1)
                          )
                        : step.translated
                        ? step.translated.charAt(0).toUpperCase() +
                          step.translated.slice(1)
                        : ""}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink className="text-[#404040] cursor-pointer transition-colors duration-300">
                      {step.text
                        ? t(
                            step.text.charAt(0).toUpperCase() +
                              step.text.slice(1)
                          )
                        : step.translated
                        ? step.translated.charAt(0).toUpperCase() +
                          step.translated.slice(1)
                        : ""}
                    </BreadcrumbLink>
                  )}
                </>
              )}
            </BreadcrumbItem>
            {index < steps.length - 1 && (
              <BreadcrumbSeparator className="text-main-black rtl:rotate-180 scale-150 ms-2" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadCrumb;
