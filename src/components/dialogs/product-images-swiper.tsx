"use client";
import { productImg } from "@/assets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ProductImagesSwiper = ({
  openSlider,
  setOpenSlider,
}: {
  setOpenSlider: Dispatch<SetStateAction<boolean>>;
  openSlider: boolean;
}) => {
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    direction: locale == "ar" ? "rtl" : "ltr",
  });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
    loop: false,
    direction: locale == "ar" ? "rtl" : "ltr",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = new Array(13).fill({ image: productImg });

  useEffect(() => {
    if (!emblaApi || !thumbsApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      thumbsApi.scrollTo(index);
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, thumbsApi]);

  const isFirstSlide = selectedIndex === 0;
  const isLastSlide = selectedIndex === slides.length - 1;

  return (
    <Dialog open={openSlider} onOpenChange={setOpenSlider}>
      <DialogContent className="sm:max-w-5xl h-[auto]">
        <DialogHeader className="text-center">
          <DialogTitle></DialogTitle>
          <DialogDescription className="text-[#545454] text-sm"></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col w-full mt-6">
          {/* Main Swiper */}
          <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#00000023] to-[#F4F4F433]">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex gap-1 sm:gap-2 w-full max-w-[90%] sm:max-w-[400px] px-4 ">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "h-1 flex-1 transition-all duration-300",
                    selectedIndex === index
                      ? "bg-white rounded-lg"
                      : "bg-gray-400 rounded-lg"
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => emblaApi?.scrollPrev()}
              className={cn(
                "absolute start-1 sm:start-4 top-1/2 -translate-y-1/2 z-30 sm:w-10 sm:h-10 w-6 h-6 text-white rounded-full flex items-center justify-center transition-colors",
                isFirstSlide
                  ? "bg-[#C4C4C4] text-white"
                  : "bg-[#404040] cursor-pointer"
              )}
              aria-label="Previous"
            >
              <ChevronLeft className="sm:size-6 size-3 rtl:rotate-180" />
            </button>

            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] px-4 sm:px-8 py-4 flex items-center justify-center"
                  >
                    <div className="relative w-full max-w-xl aspect-[4/3] max-h-[45vh]">
                      <Image
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className={cn(
                "absolute end-1 sm:end-4 top-1/2 -translate-y-1/2 z-30 sm:w-10 sm:h-10 w-6 h-6 text-white rounded-full flex items-center justify-center transition-colors",
                isLastSlide
                  ? "bg-[#C4C4C4] text-white"
                  : "bg-[#404040] cursor-pointer"
              )}
              aria-label="Next"
            >
              <ChevronRight className="sm:size-6 size-3 rtl:rotate-180" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="relative mt-6">
            <div className="overflow-hidden px-10" ref={thumbsRef}>
              <div className="flex gap-2 sm:gap-4">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={cn(
                      "relative min-w-[calc((100%-2rem)/5)] sm:min-w-[calc((100%-3rem)/5)] h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300",
                      selectedIndex === index
                        ? "border-white scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={slide.image}
                      alt={`Thumb ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
            {slides.length > 5 && (
              <>
                <button
                  onClick={() => thumbsApi?.scrollPrev()}
                  className="absolute cursor-pointer start-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="size-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={() => thumbsApi?.scrollNext()}
                  className="absolute  cursor-pointer end-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="size-4 rtl:rotate-180" />
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductImagesSwiper;
