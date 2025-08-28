"use client";
import { useHomeData } from "@/contexts/global/home-data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const CategoriesSwiper = () => {
  const { homeData } = useHomeData();
  const sliderRef = useRef<SwiperRef | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const screenWidth = window.innerWidth;
      let visibleSlides = 2; // Default slidesPerView

      // Match your Swiper breakpoints exactly
      if (screenWidth >= 1200) {
        visibleSlides = 7;
      } else if (screenWidth >= 1024) {
        visibleSlides = 6;
      } else if (screenWidth >= 768) {
        visibleSlides = 4;
      } else if (screenWidth >= 450) {
        visibleSlides = 2;
      }

      setHideButtons(homeData.categories.length <= visibleSlides);
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, [homeData.categories.length]);

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
        loop={false}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 7,
          },
        }}
        onReachEnd={() => {
          if (homeData.categories.length > 0) {
            // setPage((prev) => prev + 1);
          }
        }}
      >
        {homeData &&
          homeData.categories.length > 0 &&
          homeData.categories?.map((category, idx) => (
            <SwiperSlide key={idx}>
              <Link
                href={`/categories/${category.id}`}
                className="rounded-full flex justify-center items-center bg-[#E6E6E64D] size-40 p-6"
              >
                <div className="relative size-44">
                  <Image
                    src={category.image}
                    alt="category"
                    fill
                    className="rounded-full absolute object-contain"
                  />
                </div>
              </Link>
              <Link
                href={`/categories/${category.id}`}
                className="text-sm line-clamp-2 truncate  mt-2 text-center block"
              >
                {category.name}
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* btns */}
      {!hideButtons && (
        <div className="swiper-buttons-cont flex justify-center items-center my-3">
          <div className="swiper-bnts absolute flex gap-4">
            <div
              className={cn(
                "p-3 rounded-full flex text-center cursor-pointer justify-center ",
                !isBeginning
                  ? "bg-main text-white"
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
                "p-3  flex text-center rounded-full cursor-pointer justify-center ",
                !isEnd ? "bg-main text-white" : "bg-[#E8EDF2] text-slate-900"
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

export default CategoriesSwiper;
