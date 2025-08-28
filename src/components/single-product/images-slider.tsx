"use client";
import { productImg } from "@/assets";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AppContainer from "../AppContainer";
import ProductImagesSwiper from "../dialogs/product-images-swiper";
import { useLocale } from "next-intl";
import { IProductDetails } from "@/utils/types";

const ImagesSlider = ({ data }: { data: string[] }) => {
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    direction: locale == "ar" ? "rtl" : "ltr",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelectHandler = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => {
      setIsDragging(false);
      onSelectHandler();
    };

    onSelectHandler();

    emblaApi.on("select", onSelectHandler);
    emblaApi.on("pointerDown", handleDragStart);
    emblaApi.on("pointerUp", handleDragEnd);

    return () => {
      emblaApi.off("select", onSelectHandler);
      emblaApi.off("pointerDown", handleDragStart);
      emblaApi.off("pointerUp", handleDragEnd);
    };
  }, [emblaApi]);

  const slides = new Array(13).fill({ image: productImg });

  const [openSlider, setOpenSlider] = useState(false);
  return (
    <div className="flex flex-col w-full max-w-full m-auto">
      <ProductImagesSwiper
        openSlider={openSlider}
        setOpenSlider={setOpenSlider}
      />
      <div className="w-full overflow-hidden relative rounded-xl bg-gradient-to-b from-[#00000023] from-5% to-30% to-[#F4F4F433]">
        {data.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex gap-1 sm:gap-2 w-full max-w-[90%] sm:max-w-[400px] px-4 sm:px-10">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "h-1 transition-all duration-300 flex-1",
                  selectedIndex === index
                    ? "bg-white rounded-lg"
                    : "bg-gray-400 rounded-lg"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        {data.length > 1 && (
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="sm:w-10 sm:h-10 h-6 w-6 absolute z-30 start-1 sm:start-4 top-2/4 translate-y-[-50%] cursor-pointer rounded-full bg-[#404040] text-white flex items-center justify-center transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="sm:size-6 size-3 rtl:rotate-180" />
          </button>
        )}
        <div
          className="embla h-full relative z-20"
          ref={emblaRef}
          style={{
            cursor: isDragging ? "pointer" : "default",
          }}
        >
          <div className="embla__container h-full flex">
            {data.map((slide, index) => (
              <div
                className="embla__slide relative h-full flex-[0_0_100%]"
                key={index}
              >
                <AppContainer className="flex z-20 relative h-full items-center flex-row justify-center gap-2 sm:gap-4 pt-4 sm:pt-8 lg:max-w-full sm:max-w-xl max-w-full px-2 sm:px-8">
                  <div
                    className={cn(
                      "transform transition-all duration-500 w-full h-48 sm:h-72 lg:h-96 relative",
                      selectedIndex === index
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    )}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={slide}
                        fill
                        alt="productimg"
                        className="w-full h-full absolute inset-0 object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </AppContainer>
              </div>
            ))}
          </div>
        </div>
        {data.length > 1 && (
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="sm:w-10 sm:h-10 h-6 w-6 absolute z-30 cursor-pointer rounded-full translate-y-[-50%] top-2/4 end-1 sm:end-4 bg-[#404040] text-white flex items-center justify-center transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="sm:size-6 size-3 rtl:rotate-180" />
          </button>
        )}
      </div>
      {data.length > 1 && (
        <div className="flex gap-2 sm:gap-4 justify-center mt-4 sm:mt-6 mb-2 sm:mb-4">
          {data.slice(0, 3).map((slide, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "relative cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300",
                selectedIndex === index
                  ? "border-white scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={slide}
                fill
                alt={`thumbnail ${index + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </button>
          ))}
          {data.length > 3 && (
            <div
              onClick={() => setOpenSlider(true)}
              className="relative cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden"
            >
              <div className="absolute z-10 inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-white font-medium">
                  +{data.length - 3}
                </span>
              </div>
              <Image
                src={data[3]}
                fill
                alt="more thumbnails"
                className="w-full h-full object-contain opacity-50"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagesSlider;
