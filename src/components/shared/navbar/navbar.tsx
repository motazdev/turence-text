"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { logo } from "@/assets";

import LogoutConfirmDialog from "@/components/dialogs/logout-confirm-dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "use-intl";
import AppContainer from "../../AppContainer";
import AdBox from "../../home/ad-box";
import TlArrowClick from "../../icons/tl-arrow-click-icon";
import TLCartIcon from "../../icons/tl-cart-icon";
import TLCategories from "../../icons/tl-categories-icon";
import TLContactUs from "../../icons/tl-contact-us-icon";
import TLFaqs from "../../icons/tl-faqs-icon";
import TLHeartIcon from "../../icons/tl-heart-icon";
import TLNotificationIcon from "../../icons/tl-notification-icon";
import LanguageSelectMenu from "./language-select-menu";
import MobileNav from "./mobile-nav";
import UserSelectMenu from "./user-select-menu";
import { useAuth } from "@/contexts/auth/auth.context";
import { Button } from "@/components/ui/button";
import TlLogout from "@/components/icons/tl-logout-icon";
import TLFaqsFill from "@/components/icons/tl-faqs-fill-icon";
import TLCategoriesFill from "@/components/icons/tl-categories-fill-icon";
import TLContactUsFill from "@/components/icons/tl-contact-us-fill-icon";
import TLHomeFill from "../../icons/tl-home-fill-icon";
import TLHome from "@/components/icons/tl-home-icon";

const Navbar = () => {
  const leftItems = [
    {
      title: "Home",
      href: "/",
      icon: <TLHome />,
      fillIcon: <TLHomeFill />,
    },
    {
      title: "Our Categories",
      href: "/categories",
      icon: <TLCategories />,
      fillIcon: <TLCategoriesFill />,
    },
    {
      title: "About Us",
      href: "/about-us",
      icon: <TlArrowClick />,
      fillIcon: <TlArrowClick />,
    },
    {
      title: "Contact Us",
      href: "/contact-us",
      icon: <TLContactUs />,
      fillIcon: <TLContactUsFill />,
    },
    {
      title: "FAQs",
      href: "/faqs",
      icon: <TLFaqs />,
      fillIcon: <TLFaqsFill />,
    },
  ];

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 bg-white w-full shadow-sm transition-all duration-500">
      <AdBox />

      <AppContainer className="flex flex-row items-center py-4">
        <div className="me-4 items-center flex">
          <Link href="/" className="me-6 flex items-center space-x-2">
            <div className="relative w-16 h-full ">
              <Image src={logo} alt="logo" className=" inset-0 " />
            </div>
          </Link>

          {/* Desktop nav (left items) */}
          <nav className="hidden lg:flex">
            <ul className="flex space-x-6 items-center">
              {leftItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm flex flex-row gap-1 items-center transition-all duration-300 font-medium  relative",
                      pathname === item.href
                        ? "text-main "
                        : "text-[#8A8A8A] hover:text-[#404040]"
                    )}
                  >
                    <span>
                      {pathname === item.href ? item.fillIcon : item?.icon}
                    </span>
                    <span
                      className={cn(
                        "relative transition-all duration-300",
                        pathname === item.href
                          ? "text-main after:content-[''] after:absolute after:start-0 after:bottom-[-8px] after:w-[70%] after:rounded-full after:mx-auto after:h-[2px] after:bg-main"
                          : "text-[#8A8A8A] hover:text-[#404040]"
                      )}
                    >
                      {t(item.title)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Desktop nav (right items) */}
        <div className="ltr:ml-auto rtl:mr-auto hidden lg:flex">
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  href={"/cart"}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary"
                  )}
                >
                  <TLCartIcon />
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link
                      href={"/notifications"}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary"
                      )}
                    >
                      <TLNotificationIcon />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/favorites"}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary"
                      )}
                    >
                      <TLHeartIcon />
                    </Link>
                  </li>
                </>
              )}

              <li>
                <LanguageSelectMenu />
              </li>
              {!user && (
                <Link href={"/login"}>
                  <Button className="bg-main text-white hover:bg-main/90 flex items-center gap-2 cursor-pointer w-36 h-12">
                    {t("Login")}

                    <TlLogout className="size-6" />
                  </Button>
                </Link>
              )}
              {user && (
                <li>
                  <UserSelectMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                </li>
              )}
              <LogoutConfirmDialog
                forMobile={false}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </ul>
          </nav>
        </div>

        {/* Mobile nav */}
        <MobileNav leftItems={leftItems} />
      </AppContainer>
    </header>
  );
};

export default Navbar;
