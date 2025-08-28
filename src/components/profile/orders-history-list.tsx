"use client";
import React from "react";
import PaginationLinks01 from "../ui/pagination-links-01";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import TLArrowRight from "../right-arrow";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import orderService from "@/services/order";
import { Skeleton } from "../ui/skeleton";

const OrdersHistoryList = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, isLoading } = useQuery({
    queryKey: ["order-history", page],
    queryFn: () => orderService.getAllOrders(parseInt(page)),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  const isEmpty = data && data.data.data.length === 0;
  return (
    <div>
      {/* mobile */}
      <div className=" flex md:hidden flex-col gap-3">
        <h1 className="text-xl font-semibold">{t("Order History")}</h1>
        {isLoading && (
          <div className="flex flex-col pt-3 gap-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="border p-4 h-28 w-full rounded-[18px]"
              />
            ))}
          </div>
        )}
        {isEmpty && (
          <div className="flex justify-center items-center">
            <p className="text-[#545454] max-w-sm text-center h-32 py-12 font-medium md:text-base text-sm">
              {t(
                "You have not placed any orders yet Start exploring and place your first order"
              )}
            </p>
          </div>
        )}
        {!isEmpty && (
          <>
            {data &&
              data.data.data.map((item) => (
                <Link
                  key={item.id}
                  href={`/profile/order-history/${item.id}`}
                  className="rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="grid grid-cols-3 p-4 items-center gap-2">
                    <div className="flex flex-col">
                      <div className="text-[#8A8A8A] text-xs font-normal mb-1">
                        {t("order number")}
                      </div>
                      <div className="font-medium text-gray-800 underline">
                        #{item.id}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[#8A8A8A] text-xs font-normal mb-1">
                        {t("the quantity")}
                      </div>
                      <div className="font-medium text-gray-800">
                        {item.items_count}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[#8A8A8A] text-xs font-normal mb-1">
                        {t("Total price")}
                      </div>
                      <div className="font-medium text-gray-800">
                        {item.total} {t("AED")}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 p-4 ">
                    <div className="">
                      <div className="text-[#8A8A8A] text-xs font-normal mb-1">
                        {t("the date")}
                      </div>
                      <div className="font-medium text-gray-800">
                        {item.payment_date}
                      </div>
                    </div>

                    <div>
                      <div className="text-[#8A8A8A] text-xs font-normal mb-1">
                        {t("order status")}
                      </div>
                      <div className="font-medium text-gray-800">
                        <p
                          className={cn(
                            "text-sm capitalize",
                            item.status == "received"
                              ? "order-received"
                              : item.status == "completed"
                              ? "order-completed"
                              : item.status == "cancelled"
                              ? "order-cancelled"
                              : item.status == "prepared"
                              ? "order-prepared"
                              : item.status == "shipped"
                              ? "order-shipped"
                              : "order-unknown"
                          )}
                        >
                          {t(item.status)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full p-4">
                    <div className="bg-gray-100 group flex flex-row justify-center items-center gap-x-2 rounded-lg w-full px-3 text-center py-2 text-sm text-gray-700 font-medium hover:bg-gray-200 transition-colors">
                      <span className="underline">{t("View Details")}</span>
                      <TLArrowRight className="ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 ltr:rotate-0 transition-all duration-200" />
                    </div>
                  </div>
                </Link>
              ))}

            {data && data.data.meta.last_page > 1 && (
              <div className="mt-6 flex justify-center items-center m-auto">
                <PaginationLinks01
                  currentPage={parseInt(page)}
                  totalPages={data.data.meta.last_page}
                  paginationItemsToDisplay={4}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* web */}
      <div className=" hidden md:block mt-6">
        <div className="py-2 lg:py-4 px-4 lg:px-4 rounded-[12px] bg-[#F4F7F9] text-main-black text-center font-medium text-sm lg:text-sm items-center flex">
          <div className="w-1/5">{t("order-id")}</div>
          <div className="w-1/5">{t("the date")}</div>
          <div className="w-1/5">{t("the quantity")}</div>
          <div className="w-1/5">{t("Total price")}</div>
          <div className="w-1/5">{t("order status")}</div>
          <div className="w-1/5"></div>
        </div>
        {isLoading && (
          <div className="flex flex-col pt-3 gap-y-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="border p-4 h-28 w-full rounded-[18px]"
              />
            ))}
          </div>
        )}
        {isEmpty && (
          <div className="flex justify-center items-center">
            <p className="text-[#545454] max-w-sm text-center h-32 py-12 font-medium md:text-base text-sm">
              {t(
                "You have not placed any orders yet Start exploring and place your first order"
              )}
            </p>
          </div>
        )}
        {!isEmpty && (
          <>
            <div className="flex flex-col text-sm">
              {data &&
                data.data.data.map((item) => (
                  <Link
                    key={item.id}
                    href={`/profile/order-history/1`}
                    className="text-center font-medium text-sm lg:text-base items-center flex p-4 border-b transition hover:bg-[#F5F5F5]"
                  >
                    <div className="w-1/5 text-yellow">#{"3197398"}</div>
                    <div className="w-1/5">{item.payment_date}</div>
                    <div className="w-1/5">
                      {item.items_count} {t("items")}
                    </div>
                    <div className="w-1/5">{item.total + " " + t("AED")}</div>
                    <div className="w-1/5 ">
                      <p
                        className={cn(
                          "text-sm capitalize",
                          item.status == "received"
                            ? "order-received"
                            : item.status == "completed"
                            ? "order-completed"
                            : item.status == "cancelled"
                            ? "order-cancelled"
                            : item.status == "prepared"
                            ? "order-prepared"
                            : item.status == "shipped"
                            ? "order-shipped"
                            : "order-unknown"
                        )}
                      >
                        {t(item.status)}
                      </p>
                    </div>
                    <div className="w-1/5 underline items-center group flex flex-row gap-2">
                      <span>{t("View Details")}</span>
                      <TLArrowRight className="ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ltr:rotate-0 rtl:rotate-180 transition-all duration-200" />
                    </div>
                  </Link>
                ))}
            </div>

            {data && data.data.meta.last_page > 1 && (
              <div className="mt-6 flex justify-center items-center m-auto">
                <PaginationLinks01
                  currentPage={parseInt(page)}
                  totalPages={data.data.meta.last_page}
                  paginationItemsToDisplay={4}
                />
              </div>
            )}
          </>
        )}
      </div>
      {/* Empty Orders */}
      {/*  */}
    </div>
  );
};

export default OrdersHistoryList;
