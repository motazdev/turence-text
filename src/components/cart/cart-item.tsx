"use client";
import React, { useState } from "react";
import TLTrash from "../icons/tl-trash-icon";
import ItemQuantity from "./item-quantity";
import Image from "next/image";
import { dress } from "@/assets";
import { useTranslations } from "next-intl";
import { ICartItem } from "@/utils/types";
import useCartStore from "@/store/cart";
import { useMutation } from "@tanstack/react-query";
import cartService from "@/services/cart";
import { toast } from "sonner";
import LoadingSpinner from "../shared/LoadingSpinner";

const CartItem = ({ item }: { item: ICartItem }) => {
  const t = useTranslations();
  const { setCart, setCartItemsCount, cartItemsCount } = useCartStore();
  const [quan, setQuan] = useState<number>(item.qty);
  const { mutate, isPending } = useMutation({
    mutationKey: ["removeItem"],
    mutationFn: () => cartService.deleteCartItem(item.id),
    onSuccess: (data) => {
      if (data.status) {
        setCart(data.data);
        if (cartItemsCount && cartItemsCount >= 1) {
          setCartItemsCount(cartItemsCount - 1);
        }
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <div className="row px-8 py-4 gap-y-3  lg:grid flex flex-col grid-cols-6">
      <div className="header lg:col-span-3 col-span-4 flex gap-3 flex-row items-center">
        <div className="border border-[#0000000D] p-2 rounded-2xl">
          <div className="relative size-16 ">
            <Image
              src={item.product.image}
              alt=""
              fill
              className="absolute inset-0 object-contain"
            />
          </div>
        </div>
        <h2 className="line-clamp-2 max-w-[18rem]">{item.product.name}</h2>
      </div>
      <div className="lg:grid flex items-center grid-cols-3 col-span-3  w-full flex-row">
        <div className="header col-span-1">
          {item.is_available_in_stock ? (
            <ItemQuantity item={item} quantity={quan} setQuantity={setQuan} />
          ) : (
            <p className="bg-red-200 text-red-600 px-3 py-1 rounded-xl ">
              {t("out of stock")}
            </p>
          )}
        </div>
        <div className="header sm:ms-0 ms-3 w-full flex items-center flex-row justify-between col-span-1">
          <p>
            {parseFloat(item.price) * quan} {t("AED")}
          </p>
        </div>
        <div className="flex justify-end w-full">
          <button
            disabled={isPending}
            onClick={() => mutate()}
            className="flex cursor-pointer bg-[#D902021A] items-center size-10 p-2 rounded-lg justify-center"
          >
            {isPending ? <LoadingSpinner /> : <TLTrash />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
