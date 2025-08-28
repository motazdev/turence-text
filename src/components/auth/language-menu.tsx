"use client";
import React from "react";
import TLChevronDown from "@/components/icons/tl-chevron-down-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setCookie } from "cookies-next";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const LanguageMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();
  return (
    <header className="flex justify-start items-start">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <div className="flex flex-row items-center">
            <span>{locale == "ar" ? "العربية" : "English"}</span>
            <TLChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setCookie("NEXT_LOCALE", "ar");
              router.refresh();
              const updatedParams = new URLSearchParams(
                searchParams.toString()
              );

              window.location.href = `${pathname}?${updatedParams.toString()}`;
            }}
          >
            {t("Arabic")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCookie("NEXT_LOCALE", "en");
              router.refresh();
              const updatedParams = new URLSearchParams(
                searchParams.toString()
              );

              window.location.href = `${pathname}?${updatedParams.toString()}`;
            }}
          >
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default LanguageMenu;
