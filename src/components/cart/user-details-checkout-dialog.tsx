"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import appService from "@/services/app";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CountryCode,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import { z } from "zod";
import LoadingSpinner from "../shared/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cartService from "@/services/cart";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ICheckoutUserDetailsBody } from "@/utils/types";

interface UserDetailsCheckoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface UserDetailsCheckoutFormData {
  friend_name: string;
  friend_email?: string;
  friend_phone: string;
  gift_message: string;
  delivery_date: Date;
  notes: string;
}

export default function UserDetailsCheckoutDialog({
  open,
  onOpenChange,
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
    title: z.string().nonempty({ message: t("required-title") }),
    description: z.string().nonempty({ message: t("required-description") }),
  });
  const router = useRouter();
  type UserDetailsCheckoutFormSchema = z.infer<
    typeof userDetailsCheckoutSchema
  >;
  const form = useForm({
    resolver: zodResolver(userDetailsCheckoutSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      city: "",
      region: "",
      user_phone: "",
      title: "",
      description: "",
    },
  });
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
  const { mutate, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (data: ICheckoutUserDetailsBody) =>
      cartService.checkOutNoAuth(data),
    onSuccess: (data) => {
      router.push(data.data.payment_url);
    },
    onError: (data: AxiosError) => {
      toast.error(data.message);

      if (data.status === 403) {
        router.push("/profile?status=unverified&redirect=/cart");
        toast.error(data.message);
      }
    },
  });
  const onSubmit = (data: UserDetailsCheckoutFormSchema) => {
    const phoneNumber = parsePhoneNumberFromString(
      form.getValues("user_phone"),
      {
        defaultCallingCode: data.user_phone,
      }
    );
    if (!phoneNumber || !phoneNumber.isValid()) {
      form.setError("user_phone", { message: t("invalid-phone-number") });
      return false;
    }

    mutate({
      city_id: parseInt(data.city),
      region_id: parseInt(data.region),
      user_email: data.user_email ?? undefined,
      user_name: data.user_name,
      user_phone: phoneNumber.number,
      title: data.title,
      description: data.description,
    });
  };
  const locale = useLocale();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("Enter Your Own Details")}</DialogTitle>
          <DialogDescription>
            {t("Fill in your own details to complete checkout")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
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
                type="submit"
                disabled={
                  isPending ||
                  !form.formState.isValid ||
                  form.formState.isSubmitSuccessful
                }
                className="w-full flex-1 cursor-pointer bg-main hover:bg-main/90"
              >
                {isPending ? <LoadingSpinner /> : t("Checkout")}
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
