"use client";
import { cn } from "@/lib/utils";
import cartService from "@/services/cart";
import useCartStore from "@/store/cart";
import { ICartItem } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import LoadingSpinner from "../shared/LoadingSpinner";

const ItemQuantity = ({
  item,
  quantity,
  setQuantity,
}: {
  item: ICartItem;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { setCart } = useCartStore();
  const [state, setState] = React.useState<string>("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateCartItem", item.id],
    mutationFn: () => cartService.updateCartItem(item.id, { qty: quantity }),
    onSuccess: (data) => {
      setCart(data.data);
    },
    onError: (error) => {
      setQuantity((prev) => prev - 1);
      toast.error(error.message);
    },
  });

  const handleQuantityupdate = (state: string) => {
    if (state == "inc" && item.is_available_in_stock) {
      setQuantity((prev) => prev + 1);
      mutate();
    } else if (state == "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      mutate();
    }
  };
  return (
    <div className="flex sm:text-sm md:text-lg text-xs items-center flex-row gap-2">
      <button
        className={cn(
          "cursor-pointer ",
          quantity === 1 && "opacity-60 pointer-events-none"
        )}
        disabled={isPending}
        onClick={() => {
          setState("dec");
          handleQuantityupdate("dec");
        }}
      >
        {isPending && state == "dec" ? (
          <LoadingSpinner />
        ) : (
          <Minus className="size-4 md:size-6" />
        )}
      </button>
      <span className="select-none w-6 text-center text-lg">
        {String(quantity).padStart(2, "0")}
      </span>
      <button
        disabled={isPending}
        onClick={() => {
          setState("inc");
          handleQuantityupdate("inc");
        }}
        className="cursor-pointer size-4 md:size-6"
      >
        {isPending && state == "inc" ? (
          <LoadingSpinner />
        ) : (
          <Plus className="size-4 md:size-6" />
        )}
      </button>
    </div>
  );
};

export default ItemQuantity;
