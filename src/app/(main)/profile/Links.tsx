"use client";
import TLLocation from "@/components/icons/tl-location-icon";
import TLOrders from "@/components/icons/tl-orders-icon";
import TLSettings from "@/components/icons/tl-settings-icon";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const links = [
    {
      name: t("General Settings"),
      href: "/profile",
      icon: TLSettings,
    },
    {
      name: t("My Adresses"),
      href: "/profile/my-addresses",
      icon: TLLocation,
    },
    {
      name: t("Order History"),
      href: "/profile/order-history",
      icon: TLOrders,
    },
  ];
  return (
    <div className="flex items-center gap-2">
      {links.map((item, idx) => (
        <Link
          href={item.href}
          className={` flex flex-row gap-1 text-xs md:text-base px-2 pb-3 items-center ${
            pathname === item.href ||
            (item.href !== "/profile" && pathname.startsWith(item.href))
              ? " border-b font-semibold border-main [&>svg]:text-main md:border-b-2"
              : "font-normal"
          }`}
          key={idx}
        >
          {<item.icon size="24" />}
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Links;
