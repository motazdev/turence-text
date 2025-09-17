"use client";
import { doubleQoute } from "@/assets";
import { useHomeData } from "@/contexts/global/home-data";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import AppContainer from "../AppContainer";
import TlGrayIcon from "../icons/tl-gray-icon";
import TLStarFill from "../icons/tl-star-fill";

const Reviews = () => {
  const { homeData } = useHomeData();
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    direction: locale === "ar" ? "rtl" : "ltr",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onDragStart = () => setIsDragging(true);
    const onDragEnd = () => setIsDragging(false);

    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onDragStart);
    emblaApi.on("pointerUp", onDragEnd);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onDragStart);
      emblaApi.off("pointerUp", onDragEnd);
    };
  }, [emblaApi]);
  const t = useTranslations();
  return (
    <>
      {homeData.customer_feedback.length > 0 && (
        <div className="flex flex-col my-24 gap-5">
          <AppContainer>
            <div className="flex flex-col mb-10 ">
              <div className="relative">
                <h2 className="md:text-xl relative z-5 text-lg font-semibold">
                  {t("Reviews")}
                </h2>
                <div className="w-10 h-1 rounded-full bg-[#404040]"></div>
              </div>
              <p className="lg:max-w-[55%] md:max-w-[70%] max-w-[90%]">
                {t("Reviews Desc")}
              </p>
            </div>

            <div
              className="embla_revs w-full"
              ref={emblaRef}
              style={{
                cursor: isDragging ? "pointer" : "default",
              }}
            >
              <div className="embla__container_revs">
                {homeData.customer_feedback.map((feedback, index) => (
                  <div className="embla__slide_revs" key={index}>
                    <div className="h-full">
                      <div className="w-full h-full rounded-lg">
                        <div className="bg-[#F4F7F9] rounded-2xl p-6 h-full flex flex-col">
                          <div className="flex flex-row justify-between mb-4">
                            <div className="relative size-5">
                              <Image
                                src={doubleQoute}
                                alt="quote"
                                className="absolute inset-0 object-contain"
                                fill
                              />
                            </div>
                            <div className="border border-black flex flex-row gap-1 justify-center items-center rounded-xl px-2">
                              <TLStarFill /> <span>{feedback.rating}</span>
                            </div>
                          </div>
                          <div className="flex mb-3 ">
                            <p className="text-sm">“{feedback.description}”</p>
                          </div>
                          <div className=" flex flex-row gap-3">
                            <div className="relative size-12 rounded-full">
                              <Image
                                src={feedback.image}
                                fill
                                alt="user"
                                className="absolute inset-0 object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <p className="font-semibold">{feedback.name}</p>
                              <p className="text-sm text-[#8A8A8A]">
                                {feedback.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: 8 - 2 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "h-2 transition-all duration-300",
                    selectedIndex === index
                      ? "w-8 bg-black rounded-lg"
                      : "w-2 bg-gray-300 rounded-full"
                  )}
                />
              ))}
            </div>
          </AppContainer>
        </div>
      )}
    </>
  );
};

export default Reviews;
