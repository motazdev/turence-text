"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import appService from "@/services/app";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useGlobalAppData } from "@/contexts/global/global.context";
import { toast } from "sonner";

const TopNotifHeader = ({ count }: { count: number }) => {
  const t = useTranslations();
  const { setUserNotifs } = useGlobalAppData();
  const { mutate, isPending } = useMutation({
    mutationKey: ["clear-notifications"],
    mutationFn: () => appService.deleteNotifications(),
    onSuccess: (data) => {
      setUserNotifs((prev) => prev && { ...prev, data: [] });
      toast.success(data.message);
    },
  });
  return (
    <div className="flex flex-row justify-between items-center">
      <h6 className="text-sm font-medium">
        {t("You Have")} ({count}) {t("Notification")}
      </h6>
      <button
        disabled={isPending}
        onClick={() => mutate()}
        className="underline text-sm font-semibold cursor-pointer text-[#D90202]"
      >
        {isPending ? <LoadingSpinner /> : t("Clear All")}
      </button>
    </div>
  );
};

export default TopNotifHeader;
