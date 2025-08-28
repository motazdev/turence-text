"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { useMutation } from "@tanstack/react-query";
import cartService from "@/services/cart";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ICheckoutGiftBody, ICheckoutUserDetailsBody } from "@/utils/types";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useGiftFormSchema } from "@/lib/form-validation-schemas";

interface GiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: any;
}

export interface GiftFormData {
  friend_name: string;
  friend_email?: string;
  friend_phone: string;
  gift_message: string;
  delivery_date: Date;
  notes: string;
}

export default function GiftDialog({
  open,
  onOpenChange,
  form,
}: GiftDialogProps) {
  const t = useTranslations();

  const router = useRouter();
  const GiftFormSchema = useGiftFormSchema();
  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (data: ICheckoutGiftBody & ICheckoutUserDetailsBody) =>
      cartService.checkOutGift(data),
    onSuccess: (data) => {
      router.push(data.data.payment_url);
    },
    onError: (data: AxiosError) => {
      toast.error(data.message);

      if (data.status === 403) {
        toast.error(data.message);
      }
    },
  });
  const onSubmit = (data: z.infer<typeof GiftFormSchema>) => {
    const phoneNumber = parsePhoneNumberFromString(
      form.getValues("friend_phone"),
      {
        defaultCallingCode: data.friend_phone,
      }
    );
    if (!phoneNumber || !phoneNumber.isValid()) {
      form.setError("friend_phone", { message: t("invalid-phone-number") });
      return false;
    }
    mutate({
      delivery_date: data.delivery_date.toISOString().split("T")[0],
      friend_email: data.friend_email === "" ? undefined : data.friend_email,
      friend_name: data.friend_name,
      friend_phone: phoneNumber.number,
      gift_message: data.gift_message,
      is_gift: 1,
      notes: data.notes,
      city_id: parseInt(data.city),
      region_id: parseInt(data.region),
      description: data.description,
      title: data.title,
      user_name: data.user_name,
      user_phone: phoneNumber.number,
      user_email: data.user_email === "" ? undefined : data.user_email,
    });
  };
  const lang = useLocale();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("Send Products as Gift")}</DialogTitle>
          <DialogDescription>
            {t(
              "Fill in your friend details and a message to send your products as a gift"
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="friend_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"name"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Friend's Name")}
                      </label>
                      <Input {...field} placeholder={t("Friend's Name")} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="friend_email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"email"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Friend's Email")}
                      </label>
                      <Input
                        {...field}
                        placeholder={t("Friend's Email")}
                        type="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="friend_phone"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>{t("Friend's Phone")}</FormLabel> */}
                  {/* <FormControl>
                    <Input {...field} placeholder={t("Friend's Phone")} />
                  </FormControl> */}
                  <FormControl>
                    <div className=" group relative">
                      <label
                        htmlFor={"phone"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Friend's Phone")}
                      </label>
                      <PhoneInput
                        id={"phone"}
                        name={"phone"}
                        labels={lang == "ar" ? ar : en}
                        placeholder={t("Enter Your Phone Here")}
                        defaultCountry="AE"
                        value={field.value}
                        className="[&>input]:!bg-background [&>input]:!text-black [&>input:-webkit-autofill]:!shadow-[inset_0_0_0px_1000px_#fff]"
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gift_message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className=" group relative">
                      <label
                        htmlFor={"gift_message"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Gift Message")}
                      </label>
                      <Textarea
                        className="rounded-2xl resize-none"
                        {...field}
                        placeholder={t("Enter Gift Message")}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delivery_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className=" group relative">
                          <label
                            htmlFor={"gift_message"}
                            className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                          >
                            {t("Delivery Date")}
                          </label>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 h-14 rounded-2xl text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t("Pick a date")}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          if (!date) return false;
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const d = new Date(date);
                          d.setHours(0, 0, 0, 0);
                          return d < today || d < new Date("1900-01-01");
                        }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"notes"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Notes")}
                      </label>
                      <Textarea
                        className="rounded-2xl resize-none"
                        {...field}
                        placeholder={t("Notes")}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  isPending ||
                  !form.formState.isValid ||
                  form.formState.isSubmitSuccessful
                }
                className="w-full flex-1 cursor-pointer bg-main hover:bg-main/90"
              >
                {isPending ? <LoadingSpinner /> : t("Send Gift")}
              </Button>
              <DialogClose asChild className="flex-1 cursor-pointer">
                <Button variant="outline" className="w-full" type="button">
                  {t("cancel")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
