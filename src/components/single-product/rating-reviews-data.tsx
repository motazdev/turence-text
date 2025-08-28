import { IProductRate } from "@/utils/types";
import { useTranslations } from "next-intl";
import SessionFeedbackDialog from "../dialogs/session-feedback-dialog";
import TLLogoIcon from "../icons/tl-logo-icon";
import TLStarFill from "../icons/tl-star-fill";
import LinearProgress01 from "../ui/linear-progress-01";
import UsersReviews from "./users-reviews";
import TlGrayIcon from "../icons/tl-gray-icon";

const RatingReviewsData = ({
  data,
  productId,
}: {
  data: IProductRate;
  productId: number;
}) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col justify-center my-24 gap-5">
      <div className="flex  md:flex-row flex-col justify-between md:items-center items-start">
        <div className="relative">
          <h2 className="md:text-xl relative z-5 text-lg font-semibold">
            {t("Rating & Reviews")}
          </h2>
          <div className="w-10 h-1 rounded-full bg-main"></div>
          <div className="absolute z-[4] bottom-3">
            <TlGrayIcon />
          </div>
        </div>
      </div>
      <div className="flex gap-y-8 md:flex-row flex-col items-center justify-between">
        <div className="flex gap-2 flex-row items-end">
          <h1 className="text-8xl font-medium">{data.avg}</h1>
          <p className="text-sm text-[#B0B0B0]">/5</p>
        </div>
        <div className="flex items-start max-w-xl m-auto justify-start w-full flex-col gap-y-3">
          <div className="flex flex-row gap-3 items-center w-full justify-center">
            <TLStarFill />
            <span>5</span>
            <LinearProgress01 value={data["5_star"]} />
            <span>{data["5_star"]}%</span>
          </div>
          <div className="flex flex-row gap-3 items-center w-full justify-center">
            <TLStarFill />
            <span>4</span>
            <LinearProgress01 value={data["4_star"]} />
            <span>{data["4_star"]}%</span>
          </div>
          <div className="flex flex-row gap-3 items-center w-full justify-center">
            <TLStarFill />
            <span>3</span>
            <LinearProgress01 value={data["3_star"]} />
            <span>{data["3_star"]}%</span>
          </div>
          <div className="flex flex-row gap-3 items-center w-full justify-center">
            <TLStarFill />
            <span>2</span>
            <LinearProgress01 value={data["2_star"]} />
            <span>{data["2_star"]}%</span>
          </div>
          <div className="flex flex-row gap-3 items-center w-full justify-center">
            <TLStarFill />
            <span>1</span>
            <LinearProgress01 value={data["1_star"]} />
            <span>{data["1_star"]}%</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 items-center">
          <p>{t("Total Reviews")}</p>
          <h3 className="text-5xl font-semibold">{data.total_rates}</h3>
          {data.can_review_product && (
            <SessionFeedbackDialog productId={productId} />
          )}
        </div>
      </div>
      <UsersReviews productId={productId} data={data.rates} />
    </div>
  );
};

export default RatingReviewsData;
