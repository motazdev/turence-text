import { useTranslations } from "next-intl";
import React from "react";
import PaginationLinks01 from "@/components/ui/pagination-links-01";
import CartItem from "@/components/cart/cart-item";
import { ICart } from "@/utils/types";
const CartItemsList = ({ cart }: { cart: ICart | null }) => {
  const t = useTranslations();
  return (
    <div className="lg:order-1 lg:col-span-2 order-2">
      <div className="border pb-6 rounded-xl border-[#0000001A]">
        <div className="header px-8 py-4 rounded-t-xl hidden bg-[#F5F5F5] lg:grid grid-cols-6">
          <div className="header font-semibold col-span-3">{t("Item")}</div>
          <div className="header font-semibold col-span-1">{t("Quantity")}</div>
          <div className="header font-semibold col-span-2">{t("Amount")}</div>
        </div>

        <div className="flex flex-col gap-y-2">
          {cart?.items.map((item, idx) => (
            <CartItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartItemsList;
