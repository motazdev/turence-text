import { paymentCheck } from "@/assets";
import { useHomeData } from "@/contexts/global/home-data";
import appService from "@/services/app";
import { INotification } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PaginationLinks01 from "../ui/pagination-links-01";

const NotificationsList = () => {
  const router = useRouter();
  const { userNotifs } = useHomeData();
  const { mutate: readNotification } = useMutation({
    mutationKey: ["readNotifications"],
    mutationFn: (id: number) => appService.readNotification(id),
    onSuccess: () => {
      // setUserNotifs((prev) => prev && { ...prev, data: data.data });
      // router.push(
      //   notification.params.length > 0
      //     ? `/profile/order-history/${notification.params}`
      //     : ""
      // );
      //   setPendingRead(false);
    },
  });
  const readNotificationHandler = (notification: INotification) => {
    readNotification(notification.id);
    router.push(
      notification.param_id
        ? `/profile/order-history/${notification.param_id}?from_notification_id=${notification.id}`
        : ""
    );
  };
  return (
    <>
      <div className="flex flex-col gap-y-5">
        {userNotifs?.notifications?.data.map((notification) => {
          if (notification.notification_type === "welcome_user") {
            return (
              <div
                key={notification.id}
                className="notification-card border rounded-2xl p-4 sm:p-6"
              >
                <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-start w-full">
                  <div className="relative size-12 sm:size-16">
                    <Image
                      src={paymentCheck}
                      alt="notification-img"
                      className="absolute inset-0 object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                      {notification.title}
                    </h3>
                    <p className="text-[#8A8A8A] text-xs sm:text-sm line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                  <p className="text-xs whitespace-nowrap text-[#8A8A8A]">
                    {notification.diff_for_humans}
                  </p>
                </div>
              </div>
            );
          }
          return (
            <div
              onClick={() => readNotificationHandler(notification)}
              key={notification.id}
              className="notification-card border rounded-2xl p-4 sm:p-6"
            >
              <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-start w-full">
                <div className="relative size-12 sm:size-16">
                  <Image
                    src={paymentCheck}
                    alt="notification-img"
                    className="absolute inset-0 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                    {notification.title}
                  </h3>
                  <p className="text-[#8A8A8A] text-xs sm:text-sm line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                <p className="text-xs whitespace-nowrap text-[#8A8A8A]">
                  {notification.diff_for_humans}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {userNotifs && userNotifs?.notifications.meta.last_page > 1 && (
        <div className="mt-12">
          <PaginationLinks01
            currentPage={userNotifs?.notifications.meta.current_page}
            totalPages={userNotifs?.notifications.meta.last_page}
            paginationItemsToDisplay={4}
          />
        </div>
      )}
    </>
  );
};

export default NotificationsList;
