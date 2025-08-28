import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useCartStore from "@/store/cart";
import { useMutation } from "@tanstack/react-query";
import cartService from "@/services/cart";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import Image from "next/image";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { discountVoucher } from "@/assets";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const CartCouponCode = () => {
  const { cart, setCart } = useCartStore();
  const [apply, setAplay] = useState(true);
  const [Coupoun, setCoupoun] = useState<null | string>(
    cart?.coupon_code || null
  );
  const t = useTranslations();

  const { mutate, isPending } = useMutation({
    mutationKey: ["apply-coupon"],
    mutationFn: (data: { code: string }) =>
      cartService.applyPromoCode({ promoCode: data.code }),
    onSuccess: (data) => {
      toast.success(data.message);
      setCoupoun(data?.data?.coupon_code || null);
      setCart(data.data);
      form.reset();
    },
    onError: (error) => {
      form.reset();
      toast.error(error.message);
    },
  });
  const formSchema = z.object({
    code: z.string().min(1, { message: t("coupon-required") }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ code: values.code });
  }

  const { mutate: removeCopoun, isPending: isPendingRemoveCopoun } =
    useMutation({
      mutationKey: ["remove-coupon"],
      mutationFn: () => cartService.removePromoCode(),
      onSuccess: (data) => {
        setCart(data.data);
        setCoupoun(null);
        toast.success(data.message);
      },
    });
  return (
    <AnimatePresence initial={false} mode="wait">
      {cart?.coupon_code ? (
        <motion.div
          key="coupon-applied"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-y-2 h-[6rem]"
        >
          <Label className="text-lg font-semibold" htmlFor={"coupon"}>
            {t("Promo Code")}
          </Label>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="relative size-12">
                <Image src={discountVoucher} alt={"voucher"} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-[#8C8C8C]">{t("Coupon Code")}</p>
                <span className="font-semibold text-main-black text-base">
                  {cart.coupon_code}
                </span>
              </div>
            </div>
            <button
              className="underline select-none cursor-pointer text-sm text-[#D90202]"
              disabled={isPendingRemoveCopoun}
              onClick={() => {
                removeCopoun();
              }}
            >
              {isPendingRemoveCopoun ? <LoadingSpinner /> : t("Remove")}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="coupon-input"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-y-2 h-[6rem]"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-2 items-center justify-between mt-4"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="!flex-grow">
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={cart?.items.length === 0}
                          className="peer pe-12 py-6"
                          placeholder={t("Apply Code Here")}
                          type="text"
                          {...field}
                        />
                        <button
                          type="submit"
                          disabled={isPending || cart?.items.length === 0}
                          className="text-[#404040] select-none underline cursor-pointer absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50"
                        >
                          {isPending ? <LoadingSpinner /> : t("Apply")}
                        </button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          {/* <Label className="text-lg font-semibold" htmlFor={"coupon"}>
            {t("Promo Code")}
          </Label> */}
          {/* <div className="relative">
            <Input
              id="coupon"
              className="peer pe-12 py-6"
              placeholder={t("Apply Code Here")}
              type="text"
            />
          </div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartCouponCode;
