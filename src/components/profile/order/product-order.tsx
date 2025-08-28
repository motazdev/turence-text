import { dress } from "@/assets";
import { ICartItem } from "@/utils/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductOrder = ({ item }: { item: ICartItem }) => {
  const t = useTranslations();
  return (
    <div className="flex border px-4 py-4 rounded-2xl gap-2 md:gap-4">
      <Link
        href={`/product/${item.product.id}`}
        className="border  w-[72px] rounded-2xl relative h-[72px] md:w-[95px] md:h-[95px] img-fit overflow-hidden"
      >
        <Image
          src={item.product.image}
          fill
          alt="product-image"
          className="object-contain p-2"
          loading="lazy"
        />
      </Link>
      <div className="">
        <Link href={`/product/${item.product.id}`}>
          <h3 className="font-semibold max-w-[17rem] line-clamp-2 text-xs md:text-base">
            {item.product.name}
          </h3>
        </Link>

        <div className="flex sm:gap-4 md:gap-5 lg:gap-11 w-full flex-wrap mt-2">
          <div className="flex flex-row gap-x-8 w-full">
            {item.product.variants_data.map((varient) => (
              <div key={varient.name} className="flex flex-col gap-1">
                <span className="font-medium text-xs text-[#545454]">
                  {varient.name}
                </span>
                <span className="font-medium text-sm">{varient.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrder;
