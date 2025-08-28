import { setCookie } from "cookies-next";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const LanguageChangeButtons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();
  return (
    <RadioGroup className="flex flex-col gap-8" defaultValue="2">
      <div
        className="flex ltr:flex-row rtl:flex-row-reverse justify-between items-center gap-2"
        onClick={() => {
          setCookie("NEXT_LOCALE", "en");
          router.refresh();
          const updatedParams = new URLSearchParams(searchParams.toString());

          window.location.href = `${pathname}?${updatedParams.toString()}`;
        }}
      >
        <h6>{t("English")}</h6>
        <label className="bg-[#E8EFF5] rounded-full w-fit has-data-[state=checked]:border-[#404040] has-data-[state=checked]:scale-105 border-8 border-transparent has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative cursor-pointer gap-3 p-2 text-center shadow-xs outline-none has-focus-visible:ring-[3px] transition-all duration-300 ease-in-out">
          <RadioGroupItem
            checked={locale == "en"}
            id={`1`}
            value="1"
            className="sr-only"
          />
        </label>
      </div>
      <div
        className="flex ltr:flex-row rtl:flex-row-reverse justify-between items-center gap-2"
        onClick={() => {
          setCookie("NEXT_LOCALE", "ar");
          router.refresh();
          const updatedParams = new URLSearchParams(searchParams.toString());

          window.location.href = `${pathname}?${updatedParams.toString()}`;
        }}
      >
        <h6>{t("Arabic")}</h6>
        <label className="bg-[#E8EFF5] rounded-full w-fit has-data-[state=checked]:border-[#404040] has-data-[state=checked]:scale-105 border-8 border-transparent has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative cursor-pointer gap-3 p-2 text-center shadow-xs outline-none has-focus-visible:ring-[3px] transition-all duration-300 ease-in-out">
          <RadioGroupItem
            checked={locale == "ar"}
            id={`2`}
            value="2"
            className="sr-only"
          />
        </label>
      </div>
    </RadioGroup>
  );
};

export default LanguageChangeButtons;
