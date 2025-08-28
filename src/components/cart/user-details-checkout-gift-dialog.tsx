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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { useMutation, useQuery } from "@tanstack/react-query";
import cartService from "@/services/cart";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ICheckoutGiftBody, ICheckoutUserDetailsBody } from "@/utils/types";
import {
  CountryCode,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import appService from "@/services/app";

interface UserDetailsCheckoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setOpenGiftDialog: Dispatch<SetStateAction<boolean>>;
  form: any;
}

export interface UserDetailsCheckoutFormData {
  friend_name: string;
  friend_email?: string;
  friend_phone: string;
  gift_message: string;
  delivery_date: Date;
  notes: string;
}

export default function UserDetailsGiftCheckoutDialog({
  open,
  onOpenChange,
  form,
  setOpenGiftDialog,
}: UserDetailsCheckoutProps) {
  const t = useTranslations();

  const userDetailsCheckoutSchema = z.object({
    user_name: z.string().min(2, t("required-name")),
    user_email: z
      .string()
      .email(t("invalid-email"))
      .optional()
      .or(z.literal("")),
    user_phone: z.string().min(5, t("required-phone")),
    city: z
      .string()
      .nonempty({ message: t("required-city") })
      .min(1, { message: t("required-city") }),
    region: z
      .string()
      .min(1, { message: t("required-region") })
      .nonempty({ message: t("required-region") }),
    title: z.string(),
    description: z.string(),
  });
  const router = useRouter();
  type UserDetailsCheckoutFormSchema = z.infer<
    typeof userDetailsCheckoutSchema
  >;
  const [, setCountryCode] = useState<null | undefined | string>(null);
  useEffect(() => {
    if (open) {
      setShouldFetch(true);
    }
  }, [open]);
  const [choosenCity, setChoosenCity] = useState<number | string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data: cities, isLoading: loadingCities } = useQuery({
    queryKey: ["cities"],
    queryFn: () => appService.getCities(),
    staleTime: 1000 * 60 * 60,
    enabled: shouldFetch,
  });

  const { data: regionsData, isLoading: loadingRegions } = useQuery({
    queryKey: ["regions", choosenCity],
    queryFn: () => appService.getRegions(choosenCity ? choosenCity : 1),
    enabled: shouldFetch && !!choosenCity,
    staleTime: 1000 * 60 * 60,
  });
  const [country, setCountry] = useState<CountryCode>();
  useEffect(() => {
    if (country) {
      const code = getCountryCallingCode(country);
      setCountryCode(code);
    }
  }, [country]);

  const locale = useLocale();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("Enter Your Own Details")}</DialogTitle>
          <DialogDescription>
            {t("Fill in your own details to send your products as a gift")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"name"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("name")}
                      </label>
                      <Input {...field} placeholder={t("name")} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"email"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Email")}
                      </label>
                      <Input
                        {...field}
                        placeholder={t("Email Address")}
                        type="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="user_phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"phone"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Phone")}
                      </label>
                      <PhoneInput
                        labels={locale == "ar" ? ar : en}
                        {...field}
                        onCountryChange={(country) => {
                          setCountry(country);
                        }}
                        className="!text-lg w-full max-w-full"
                        defaultCountry="AE"
                        onChange={field.onChange}
                        placeholder={t("Enter Phone Here")}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"city"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("City")}
                      </label>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setChoosenCity(parseInt(value));
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("select-city")} />
                        </SelectTrigger>
                        <SelectContent defaultValue={"0"}>
                          {loadingCities && (
                            <div className="my-2">
                              <LoadingSpinner />
                            </div>
                          )}
                          {cities?.data?.map((city) => (
                            <SelectItem
                              key={city.id}
                              value={city.id.toString()}
                            >
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* City */}
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"region"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("region")}
                      </label>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("select-region")} />
                        </SelectTrigger>
                        <SelectContent>
                          {loadingRegions && (
                            <div className="my-2">
                              <LoadingSpinner />
                            </div>
                          )}
                          {regionsData?.data?.map((region) => (
                            <SelectItem
                              key={region.id}
                              value={region.id.toString()}
                            >
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"title"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Address")}
                      </label>
                      <Input
                        {...field}
                        placeholder={t("Enter Your Address Here")}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"description"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("Description")}
                      </label>
                      <Input
                        type="text"
                        className="rounded-xl py-8 border px-5"
                        {...field}
                        placeholder={t("placeholder-address-short-desc")}
                      />
                    </div>
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                disabled={false}
                onClick={() => {
                  onOpenChange(false);
                  setOpenGiftDialog(true);
                }}
                className="w-full flex-1 cursor-pointer bg-main hover:bg-main/90"
              >
                {t("Continue")}
              </Button>
              <DialogClose asChild className="flex-1 cursor-pointer">
                <Button variant="outline" className="w-full" type="button">
                  {t("cancel")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
