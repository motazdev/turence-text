"use client";
import AppContainer from "@/components/AppContainer";
import PaymentSummary from "@/components/profile/order/payment-summary";
import ProductOrder from "@/components/profile/order/product-order";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import orderService from "@/services/order";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const t = useTranslations();
  const productId = use(params).id;
  const router = useRouter();
  const seachParams = useSearchParams();
  const from_notification_id =
    seachParams.get("from_notification_id") || undefined;
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", parseInt(productId)],
    staleTime: 0,
    queryFn: () =>
      orderService.getSingleOrder(
        parseInt(productId),
        Number(from_notification_id)
      ),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    gcTime: 0,
    retry: 1,
  });
  useEffect(() => {
    if (isError && error instanceof Error) {
      router.push("/profile/order-history");
    }
  }, [isError, error, router]);
  return (
    <>
      {isLoading && (
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-row gap-4 items-center">
                  <Skeleton className="size-[105px] rounded-2xl" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="w-28 mb-3 h-3 rounded-2xl" />
                    <Skeleton className="w-12 h-3 rounded-2xl" />
                    <Skeleton className="w-16 h-3 rounded-2xl" />
                    <Skeleton className="w-16 h-3 rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="w-full h-96 rounded-2xl" />
          </div>
        </div>
      )}
      {order && (
        <div>
          <Link
            href={"/profile/order-history"}
            className="flex mb-8 items-center gap-2"
          >
            <span className="w-6 rtl:rotate-180 rotate-0 h-6 flex-c">
              <ChevronLeft />
            </span>
            <span className="font-medium text-base">{t("Order Details")}</span>
          </Link>
          <div className="lg:grid flex flex-col-reverse lg:grid-cols-6 gap-5">
            <div className="lg:col-span-4">
              <AppContainer className="bg-[#F4F7F9] rounded-2xl py-4 flex flex-row gap-x-8">
                <div className="flex flex-col gap-y-2">
                  <p className="text-[#545454] text-sm">{t("order-id")}</p>
                  <p className="text-main-black text-base font-semibold">
                    #{order.data.order_num}
                  </p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="text-[#545454] text-sm">{t("Date")}</p>
                  <p className="text-main-black text-base font-semibold">
                    {order.data.payment_date}
                  </p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="text-[#545454] text-sm">{t("the status")}</p>
                  <p
                    className={cn(
                      " text-base capitalize font-semibold",
                      order.data.status == "received"
                        ? "order-received"
                        : order.data.status == "completed"
                        ? "order-completed"
                        : order.data.status == "cancelled"
                        ? "order-cancelled"
                        : order.data.status == "prepared"
                        ? "order-prepared"
                        : order.data.status == "shipped"
                        ? "order-shipped"
                        : "order-unknown"
                    )}
                  >
                    {order.data.status}
                  </p>
                </div>
              </AppContainer>
              <div className="flex flex-col gap-5 md:gap-4 mt-5">
                {order.data.items.map((item) => (
                  <ProductOrder key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="py-6 col-span-2 px-5 rounded-[18px] border border-color">
              <PaymentSummary order={order.data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
