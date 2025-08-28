"use client";
import React, { useState } from "react";
import SingleUserReview from "./single-user-review";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { IPaginatedData, ISingleRate } from "@/utils/types";
import productService from "@/services/product";

const UsersReviews = ({
  data,
  productId,
}: {
  productId: number;
  data: IPaginatedData<ISingleRate[]>;
}) => {
  const t = useTranslations();
  const [feedbackData, setFeedbackData] = useState(data?.data);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!data?.links.next);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchMoreFeedback = async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    const nextPageUrl = data?.links.next;
    if (!nextPageUrl) return;
    try {
      if (nextPageUrl === null) return;
      const response = await productService.getPaginatedFeedback({
        productId,
        page: currentPage + 1,
      });
      const data = response.data?.rates.rates;

      setFeedbackData((prevData) => [...prevData, ...data.data]);
      setHasMore(!!data.links.next);
      setCurrentPage(data.meta.current_page);
    } catch (error) {
      console.error("Error loading more feedback:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 my-8">
      {feedbackData.map((rate) => (
        <SingleUserReview key={rate.id} review={rate} />
      ))}
      {hasMore && (
        <div className="flex justify-center items-center">
          <Button
            onClick={fetchMoreFeedback}
            disabled={loading}
            className="bg-[#F5F5F5] disabled:animate-pulse hover:scale-105 duration-300 py-5 cursor-pointer hover:bg-[#F5F5F5] text-[#404040]"
          >
            {t("View More Comments")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UsersReviews;
