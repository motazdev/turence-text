"use client";
import { purchaseSuccess } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { SetStateAction } from "react";
const PurchaseSuccessDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || null;
  const message_ar = searchParams.get("message_ar") || null;
  const message_en = searchParams.get("message_en") || null;
  const title_ar = searchParams.get("title_ar") || null;
  const title_en = searchParams.get("title_en") || null;
  const trackingCode = searchParams.get("tracking_code") || null;
  const locale = useLocale();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] max-w-md">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex text-main-black flex-col text-center justify-center items-center">
          <div className="relative size-20">
            <Image src={purchaseSuccess} alt="purchaseSuccess" />
          </div>
          <p className=" sm:max-w-md max-w-[14rem] font-medium">
            {locale === "en" ? title_en : title_ar}
          </p>
          <p className="text-[#545454] text-sm max-w-xs sm:max-w-md">
            {locale === "en" ? message_en : message_ar}
          </p>
        </div>
        {trackingCode && (
          <Link
            href={`order/track/${trackingCode}`}
            className="flex text-sm text-main gap-2 w-fit border-b m-auto border-main/30 cursor-pointer justify-center items-center"
          >
            <div>{t("track-order-msg")}</div>
            <Truck />
          </Link>
        )}
        <DialogFooter className="flex flex-row mt-4">
          <Button
            type="submit"
            className="flex-1 bg-main border border-main hover:bg-main/90 hover:border-main/90 cursor-pointer rounded-xl py-6"
          >
            {t("View Order")}
          </Button>
          <DialogClose asChild className="flex-1 cursor-pointer">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-main text-main py-6 rounded-xl"
            >
              {t("Done")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseSuccessDialog;
