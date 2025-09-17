"use client";

import { discountGreenBadge, heroBg, makeupHeroBG } from "@/assets";
import { useHomeData } from "@/contexts/global/home-data";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import AppContainer from "../AppContainer";
import TLLogoIcon from "../icons/tl-logo-icon";
import HeroActions from "./hero-actions";

const Hero = () => {
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

  const { homeData } = useHomeData();
  return (
    <div
      className={cn(
        "relative  h-full py-14 overflow-hidden",
        homeData.sliders.length === 0 && "min-h-72"
      )}
    >
      <div className="ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-[rgba(0,0,0,0.7)] from-15% absolute inset-0 w-full h-full z-[11]"></div>
      <Image
        src={makeupHeroBG}
        alt="hero"
        className="absolute  start-0 top-0 ltr:scale-x-[unset] rtl:scale-x-[-1] lg:object-center object-right z-10 w-full h-full object-cover"
        priority
      />

      <AppContainer className="flex lg:flex-row flex-col justify-between items-center">
        <div
          className="embla h-full relative z-30"
          ref={emblaRef}
          style={{
            cursor: isDragging ? "pointer" : "default",
          }}
        >
          <div className="embla__container h-full">
            {homeData.sliders.map((slide, index) => (
              <div className="embla__slide relative h-full" key={index}>
                <AppContainer className="flex z-20 relative h-full items-center justify-center flex-row lg:justify-between pt-8 lg:max-w-full sm:max-w-xl max-w-md lg:text-start text-center px-8">
                  <div
                    className={cn(
                      "flex flex-col lg:text-start text-center lg:justify-start justify-center gap-4 max-w-2xl lg:px-0 px-2",
                      "transform transition-all duration-500",
                      selectedIndex === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    )}
                  >
                    {slide.sale && (
                      <div className="sale-badge rounded-full p-4 text-sm bg-white items-center flex flex-row m-auto lg:m-0 lg:justify-start justify-center gap-2 w-fit">
                        <div className="relative w-4 h-4">
                          <Image
                            alt="discount"
                            src={discountGreenBadge}
                            className="absolute inset-0"
                            width={16}
                            height={16}
                          />
                        </div>
                        <span>{slide.sale}</span>
                      </div>
                    )}

                    <h1 className="lg:text-4xl text-2xl font-bold text-white leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-white">{slide.description}</p>
                  </div>
                </AppContainer>
              </div>
            ))}
          </div>

          <AppContainer className="relative py-5 flex-col gap-6">
            <div className=" -top-6 lg:justify-start justify-center flex gap-2">
              {homeData.sliders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "h-2 transition-all duration-500 ease-out",
                    selectedIndex === index
                      ? "w-12 rounded-lg bg-white transform origin-left"
                      : "w-2 rounded-full bg-[#B0B0B0] transform origin-center hover:bg-white"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <HeroActions />
          </AppContainer>
        </div>
      </AppContainer>
    </div>
  );
};

export default Hero;
