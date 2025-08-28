import { ICart } from "@/utils/types";
import { useTranslations } from "next-intl";

const PaymentSummary = ({ order }: { order: ICart }) => {
  const t = useTranslations();
  return (
    <div className="">
      <p className="text-xl font-semibold">{t("Payment Summary")}</p>
      <div className="mt-4 flex flex-col gap-3 font-medium text-sm md:text-base">
        <div className="flex items-center justify-between ">
          <p className="text-[#545454]">{t("Number Of Items")}</p>
          <p>{order.items_count + t("items")}</p>
        </div>

        <div className="flex items-center justify-between ">
          <p className="text-[#545454]">{t("Order Price")}</p>
          <p>
            {order.sub_total} {t("AED")}
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-[#545454]">{t("Delivery")}</p>
          <p>
            {order.shipping_value} {t("AED")}
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-[#545454]">{t("VAT")}</p>
          <p>
            {order.vat_value} {t("AED")}
          </p>
        </div>
        {order.coupon_code && (
          <div className="flex items-center justify-between ">
            <p className="text-[#545454]">{t("Discount")}</p>
            <p>
              {order.discount_value} {t("AED")}
            </p>
          </div>
        )}
        <div className="flex items-center justify-between ">
          <p className="text-[#545454]">{t("Total Order")}</p>
          <p>
            {order.total} {t("AED")}
          </p>
        </div>
      </div>
      <div className="mt-5 pt-5 flex font-medium flex-col gap-3 border-t border-color">
        <span className="font-semibold text-xl">{t("Address Summary")}</span>
        <div className="flex items-center justify-between ">
          <p className="text-[#545454] font-medium">{t("phone")}</p>
          <p>{order.address.address_number}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-[#545454] font-medium">{t("city")}</p>
          <p>{order.address.city?.name}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-[#545454] font-medium">{t("region")}</p>
          <p>{order.address.region?.name}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-[#545454] font-medium">{t("Address")}</p>
          <p>{order.address.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
