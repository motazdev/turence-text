"use client";
import { useAuth } from "@/contexts/auth/auth.context";
import { useGiftFormSchema } from "@/lib/form-validation-schemas";
import addressService from "@/services/address";
import cartService from "@/services/cart";
import useCartStore from "@/store/cart";
import { IAddress, ICart } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import CartCouponCode from "./cart-coupon-code";
import GiftDialog from "./gift-dialog";
import PaymentAddress from "./payment-address";
import UserDetailsGiftCheckoutDialog from "./user-details-checkout-gift-dialog";
import UserDetailsCheckoutDialog from "./user-details-checkout-dialog";

const PaymentSummary = ({ cart }: { cart: ICart | null }) => {
  const t = useTranslations();
  const router = useRouter();
  const [isCoupon, setIsCoupon] = useState(false);
  const [successCheckout, setSuccessCheckout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const giftSchema = useGiftFormSchema();
  const {
    data,
    refetch,
    isLoading: isLoadingAddress,
  } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: () => addressService.getAllAddresses(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!isOpen === true,
  });
  const [userAddresses, setUserAddresses] = useState<IAddress[] | null>(
    data?.data ?? null
  );
  const { cart: localCart, setCart } = useCartStore();
  useEffect(() => {
    setUserAddresses(data?.data ?? null);
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: () => cartService.checkOut(),
    onSuccess: (data) => {
      router.push(data.data.payment_url);
    },
    onError: (data: AxiosError) => {
      toast.error(data.message);

      if (data.status === 403) {
        router.push("/profile?status=unverified&redirect=/cart");
        toast.error(data.message);
      }
    },
  });
  const { user } = useAuth();

  // Shared form for both dialogs
  const form = useForm({
    resolver: zodResolver(giftSchema),
    defaultValues: {
      friend_name: "",
      friend_email: "",
      friend_phone: "",
      gift_message: "",
      delivery_date: new Date(),
      notes: "",
      user_name: user?.name || "",
      user_email: user?.email || "",
      city: "",
      region: "",
      user_phone: "",
      title: "",
      description: "",
      // Add user details fields here if needed
    },
  });

  const [openAddNewAddress, setOpenNewAddress] = useState(false);
  const [openGiftDialog, setOpenGiftDialog] = useState(false);
  const [openUserDetailsGiftDialog, setOpenUserDetailsGiftDialog] =
    useState(false);
  const [openUserDetailsDialog, setOpenUserDetailsDialog] = useState(false);
  return (
    <div className="p-4">
      <div className=" flex flex-col gap-3 font-medium text-sm md:text-base">
        <Label className="text-lg font-semibold" htmlFor={"coupon"}>
          {t("Promo Code")}
        </Label>
        <CartCouponCode />
        <hr />
        <div className="flex flex-col gap-y-4">
          <p className="text-lg font-semibold">{t("Payment Summary")}</p>
          <div className="flex items-center justify-between ">
            <p className="text-[#545454]">{t("Number Of Items")}</p>
            <p>
              {cart?.items_count} {t("items")}
            </p>
          </div>

          <div className="flex items-center justify-between ">
            <p className="text-[#545454]">{t("Order Price")}</p>
            <p>
              {cart?.sub_total} {t("AED")}
            </p>
          </div>
          {cart?.coupon_code && (
            <div className="flex items-center justify-between ">
              <p className="text-[#545454]">{t("Discount")}</p>
              <p>
                {cart?.discount_value} {t("AED")}
              </p>
            </div>
          )}
          {cart?.vat_value && (
            <div className="flex items-center justify-between ">
              <p className="text-[#545454]">{t("VAT")}</p>
              <p>
                {cart?.vat_value} {t("AED")}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between ">
            <p className="text-[#545454]">{t("Delivery")}</p>
            <p>
              {cart?.shipping_value} {t("AED")}
            </p>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-[#545454]">{t("Total Order")}</p>
            <p>
              {cart?.total} {t("AED")}
            </p>
          </div>
        </div>
      </div>
      {user && <PaymentAddress />}
      <div className="flex flex-col gap-2 mt-4">
        <Button
          onClick={() => setOpenUserDetailsGiftDialog(true)}
          variant="outline"
          className="w-full cursor-pointer hover:text-main rounded-xl py-4 border-main text-main hover:bg-main/10"
        >
          {t("Send as Gift")}
        </Button>
        {user ? (
          <Button
            onClick={() => mutate()}
            disabled={
              isPending ||
              !localCart?.items.length ||
              (localCart.address === null && !!user)
            }
            className="w-full rounded-xl py-6 bg-main hover:bg-main/90 disabled:opacity-60 duration-500 transition-all cursor-pointer"
          >
            {isPending ? <LoadingSpinner /> : t("Checkout")}
          </Button>
        ) : (
          <Button
            onClick={() => setOpenUserDetailsDialog(true)}
            disabled={localCart?.items.length === 0}
            className="w-full rounded-xl py-6 bg-main hover:bg-main/90 disabled:opacity-60 duration-500 transition-all cursor-pointer"
          >
            {isPending ? <LoadingSpinner /> : t("Checkout")}
          </Button>
        )}
      </div>
      <UserDetailsGiftCheckoutDialog
        form={form}
        onOpenChange={setOpenUserDetailsGiftDialog}
        open={openUserDetailsGiftDialog}
        setOpenGiftDialog={setOpenGiftDialog}
      />
      <GiftDialog
        form={form}
        open={openGiftDialog}
        onOpenChange={setOpenGiftDialog}
      />
      <UserDetailsCheckoutDialog
        onOpenChange={setOpenUserDetailsDialog}
        open={openUserDetailsDialog}
      />
    </div>
  );
};

export default PaymentSummary;
