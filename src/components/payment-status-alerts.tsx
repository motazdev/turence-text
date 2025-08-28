"use client";
import React, { useEffect, useState } from "react";
import PurchaseSuccessDialog from "./cart/purchase-success-dialog";
import PaymentFailedDialog from "./cart/PaymentFailedDialog";
import { useSearchParams } from "next/navigation";

const PaymentStatusAlerts = () => {
  const [openSuccessDialog, setIsOpenSuccessDialog] = useState(false);
  const [openFailureDialog, setOpenFailureDialog] = useState(false);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id") || null;
  const trackingCode = searchParams.get("tracking_code") || null;
  useEffect(() => {
    if (
      searchParams.has("status") &&
      status === "success" &&
      trackingCode &&
      orderId
    ) {
      setIsOpenSuccessDialog(true);
    }

    if (
      searchParams.has("status") &&
      searchParams.get("status") === "failure"
    ) {
      setOpenFailureDialog(true);
    }
  }, []);
  return (
    <>
      <PurchaseSuccessDialog
        isOpen={openSuccessDialog}
        setIsOpen={setIsOpenSuccessDialog}
      />
      <PaymentFailedDialog
        isOpen={openFailureDialog}
        setIsOpen={setOpenFailureDialog}
      />
    </>
  );
};

export default PaymentStatusAlerts;
