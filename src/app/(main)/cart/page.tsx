"use client";
import { empty_cart, noFaqs } from "@/assets";
import AppContainer from "@/components/AppContainer";

import CartItemsList from "@/components/cart/cart-items-list";
import PaymentSummary from "@/components/cart/payment-summary";
import PaymentFailedDialog from "@/components/cart/PaymentFailedDialog";
import PurchaseSuccessDialog from "@/components/cart/purchase-success-dialog";
import AppBreadCrumb from "@/components/shared/app-breadcrumb";
import PageHeader from "@/components/shared/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import cartService from "@/services/cart";
import useCartStore from "@/store/cart";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderNumber = searchParams.get("order_number") || "";
  const orderId = searchParams.get("order_id") || "";
  const { setCart, cart } = useCartStore();
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartService.getCartItems(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (cartItems?.data && !cart) {
      setCart(cartItems.data);
    }
  }, [cartItems, cart, cart?.items?.length, setCart]);

  const [openSuccessDialog, setIsOpenSuccessDialog] = useState(false);
  const [openFailureDialog, setOpenFailureDialog] = useState(false);
  useEffect(() => {
    if (searchParams.has("status") && status === "success") {
      setIsOpenSuccessDialog(true);
    }

    if (
      searchParams.has("status") &&
      searchParams.get("status") === "failure"
    ) {
      setOpenFailureDialog(true);
    }
  }, []);
  const isEmpty = cart?.items.length === 0;
  const t = useTranslations();
  return (
    <div>
      <PageHeader text={"Cart"} />
      <PurchaseSuccessDialog
        isOpen={openSuccessDialog}
        setIsOpen={setIsOpenSuccessDialog}
      />
      <PaymentFailedDialog
        isOpen={openFailureDialog}
        setIsOpen={setOpenFailureDialog}
      />
      <AppContainer>
        <AppBreadCrumb
          steps={[{ text: "Home", href: "/" }, { text: "Cart" }]}
        />
        <div className="mt-10">
          {isLoading && (
            <section className="MyCartPage mt-8 pb-10 lg:pb-24">
              <div className="container">
                <Skeleton className="w-44 breadddcrumbb h-8 mb-8" />
                <div className="grid gap-5 lg:grid-cols-3">
                  <div className="prouducts flex flex-col gap-2 lg:col-span-2 order-2 lg:order-1">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className=" flex gap-2 md:gap-4  w-full">
                        <Skeleton className="w-full rounded-lg h-44 mt-5" />
                      </div>
                    ))}
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="payment rounded-lg m-5 mt-5">
                      <Skeleton className="h-96 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {isEmpty && (
            <div className="flex py-32 justify-center gap-y-6 flex-col items-center">
              <div className="relative size-32">
                <Image
                  src={empty_cart}
                  alt="empty cart"
                  className="absolute inset-0 object-cover"
                />
              </div>
              <p className="text-center max-w-xs md:text-base text-sm">
                {t("empty_cart")}
              </p>
            </div>
          )}
          {!isEmpty && (
            <div className="grid gap-4 md:gap-5 lg:grid-cols-3">
              <CartItemsList cart={cart} />
              <div className="order-1 border rounded-xl border-[#0000001A] lg:order-2">
                {/* PaymentSummary now includes a button to send the cart as a gift (opens dialog) */}
                <PaymentSummary cart={cart} />
              </div>
            </div>
          )}
        </div>
      </AppContainer>
    </div>
  );
};

export default Page;
