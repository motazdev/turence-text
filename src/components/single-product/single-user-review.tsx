import React from "react";
import TLStarFill from "../icons/tl-star-fill";
import TLStar from "../icons/tl-star";
import { ISingleRate } from "@/utils/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SingleUserReview = ({ review }: { review: ISingleRate }) => {
  const normalizedRating = Math.min(Math.max(100, 0), parseInt(review.rate));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <h3 className="text-base font-semibold">{review.user_name}</h3>
          <div className="stars flex flex-row gap-1 items-center">
            {[...Array(5)].map((_, index) =>
              index < normalizedRating ? (
                <TLStarFill key={index} />
              ) : (
                <TLStar key={index} className="text-[#404040]" />
              )
            )}
          </div>
        </div>
        <span className="text-[#545454] text-sm">{review.diff_for_humans}</span>
      </div>
      <p className="font-normal text-sm">{review.comment}</p>
    </div>
  );
};

export default SingleUserReview;
