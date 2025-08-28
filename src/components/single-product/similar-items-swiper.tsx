"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import ProductCard from "./product-card";
import { IProduct } from "@/utils/types";
const SimilarItemsSwiper = ({ data }: { data: IProduct[] }) => {
  const sliderRef = useRef<SwiperRef | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  // const [hideButtons, setHideButtons] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);

  const arr = new Array(10).fill("");
  useEffect(() => {
    const updateVisibility = () => {
      const screenWidth = window.innerWidth;
      let visibleSlides = 1;

      if (screenWidth >= 1200) {
        visibleSlides = 4;
      } else if (screenWidth >= 1024) {
        visibleSlides = 3;
      } else if (screenWidth >= 768) {
        visibleSlides = 2;
      }

      setHideButtons(data.length <= visibleSlides);
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, [arr.length]);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className=" overflow-hidden relative mt-4 md:mt-8">
      <Swiper
        ref={sliderRef}
        slidesPerView={2}
        navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
        pagination={false}
        autoplay={false}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          // Set initial state when swiper is initialized
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        loop={false}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        onReachEnd={() => {
          if (arr.length > 0) {
            // setPage((prev) => prev + 1);
          }
        }}
      >
        {data &&
          data?.map((product, idx) => (
            <SwiperSlide key={idx}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
      {/* btns */}
      {!hideButtons && (
        <div className="swiper-buttons-cont flex justify-center items-center my-3">
          <div className="swiper-bnts absolute flex gap-4">
            <div
              className={cn(
                "p-3 rounded-full flex text-center  justify-center ",
                !isBeginning
                  ? "bg-[#404040] text-white cursor-pointer"
                  : "bg-[#E8EDF2] text-slate-900 "
              )}
              onClick={handlePrev}
            >
              <ChevronLeft
                size={20}
                className={cn("m-auto rtl:rotate-180 ltr:rotate-0 ")}
              />
            </div>
            <div
              className={cn(
                "p-3  flex text-center rounded-full  justify-center ",
                !isEnd
                  ? "bg-[#404040] text-white cursor-pointer"
                  : "bg-[#E8EDF2] text-slate-900"
              )}
              onClick={handleNext}
            >
              <ChevronRight
                className={cn("m-auto rtl:rotate-180 ltr:rotate-0")}
                size={20}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarItemsSwiper;
