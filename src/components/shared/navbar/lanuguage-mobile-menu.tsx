import AppContainer from "@/components/AppContainer";
import TlGlobe from "@/components/icons/tl-globe-icon";
import LanguageChangeButtons from "@/components/shared/navbar/language-change-buttons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
const LanugageMobileMenu = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="border-none flex flex-row justify-between w-full cursor-pointer">
        <div className="flex items-center  w-full flex-row gap-1">
          <TlGlobe /> {t("Language")}
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="text-main-black text-sm font-medium">
            {locale == "ar" ? t("Arabic") : t("English")}
          </span>
          <span className="rtl:rotate-180">
            <ChevronRight />
          </span>
        </div>
        {/* <span className="sr-only">Toggle menu</span> */}
      </SheetTrigger>
      <SheetContent side="right" className="h-screen w-screen px-0">
        <SheetHeader className="px-0">
          <AppContainer>
            <SheetTitle
              asChild
              className="flex mb-4  flex-row items-center gap-2 "
            >
              <h1
                className="cursor-pointer w-fit flex items-center"
                onClick={() => setOpen(false)}
              >
                <ChevronLeft size={20} className="rtl:rotate-180" />{" "}
                <span>{t("Language")}</span>
              </h1>
            </SheetTitle>
            <SheetDescription asChild>
              <hr />
            </SheetDescription>
          </AppContainer>
        </SheetHeader>
        <AppContainer className="flex flex-col gap-4">
          <LanguageChangeButtons />
        </AppContainer>
      </SheetContent>
    </Sheet>
  );
};

export default LanugageMobileMenu;
