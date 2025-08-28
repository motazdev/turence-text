"use client";
import { useHomeData } from "@/contexts/global/home-data";
import userService from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import AppContainer from "../AppContainer";
import AppBreadCrumb from "../shared/app-breadcrumb";
import { Skeleton } from "../ui/skeleton";
import EmptyNotifications from "./empty-notifications";
import NotifTitle from "./notif-title";
import NotificationsList from "./notifications-list";
import TopNotifHeader from "./top-notif-header";

const NotificationsContent = () => {
  const searchParams = useSearchParams();
  const { setUserNotifs, userNotifs } = useHomeData();
  const page = parseInt(searchParams.get("page") || "1");
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", page],
    queryFn: () => userService.getNotifications(page),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (notifications?.data) {
      setUserNotifs(notifications?.data);
    }
  }, [notifications, setUserNotifs]);

  return (
    <div>
      <AppContainer>
        <AppBreadCrumb
          steps={[{ text: "Home", href: "/" }, { text: "Notifications" }]}
        />
        <div className="mt-10 mb-32">
          <NotifTitle />
          {userNotifs?.notifications.data.length === 0 && (
            <EmptyNotifications />
          )}
          {isLoading && (
            <div className=" flex flex-col gap-5">
              <Skeleton className="h-28 w-full border-s-2" />
              <Skeleton className="h-28 w-full border-s-2" />
              <Skeleton className="h-28 w-full border-s-2" />
              <Skeleton className="h-28 w-full border-s-2" />
              <Skeleton className="h-28 w-full border-s-2" />
            </div>
          )}
          {userNotifs && userNotifs.notifications.data.length > 0 && (
            <div className="flex flex-col gap-y-5">
              <TopNotifHeader count={userNotifs.count} />
              <NotificationsList />
            </div>
          )}
        </div>
      </AppContainer>
    </div>
  );
};

export default NotificationsContent;
