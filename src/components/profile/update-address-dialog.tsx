"use client";
import { useGlobalAppData } from "@/contexts/global/global.context";
import { useAddNewAddressFormSchema } from "@/lib/form-validation-schemas";
import addressService from "@/services/address";
import appService from "@/services/app";
import { IAddress } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import { toast } from "sonner";
import { z } from "zod";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
const UpdateAddressDialog = ({
  address,
  isOpen,
  setIsOpen,
}: {
  address: IAddress;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const lang = useLocale();
  const t = useTranslations();
  const formSchema = useAddNewAddressFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: address.region.id.toString(),
      phone: address.mobile,
      address: address.description,
    },
  });
  const { setUserAddresses } = useGlobalAppData();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      mobile_country_code: string;
      mobile: string;
      city_id: number;
      region_id: number;
      description: string;
      is_cart: boolean;
      title: string;
    }) => addressService.updateAddress(address.id, data),
    mutationKey: ["update-address"],
    onSuccess: (data) => {
      if (data?.status) {
        setIsOpen(false);
        setUserAddresses((prev: IAddress[] | null) =>
          prev
            ? prev.map((add) => (add.id == data.data.id ? data.data : add))
            : null
        );
        toast.success(data.message);
        form.reset();
      }
    },
    onError: (error) => {
      form.reset();

      toast.error(error.message);
    },
  });
  const [shouldFetch, setShouldFetch] = useState(false); // Track when queries should start

  useEffect(() => {
    if (isOpen) {
      setShouldFetch(true); // Enable fetching when the dialog opens
    }
  }, [isOpen]);
  useEffect(() => {
    form.reset({
      city: address.city.id.toString(),
      phone: address.mobile?.startsWith("+")
        ? address.mobile
        : `+${address.mobile_country_code}${address.mobile}`,
      address: address.title,
      description: address.description,
      region: address.region.id.toString(),
    });
  }, [address, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const phoneNumber = parsePhoneNumberFromString(form.getValues("phone"), {
      defaultCallingCode: values.phone,
    });
    if (!phoneNumber || !phoneNumber.isValid()) {
      form.setError("phone", { message: t("invalid-phone-number") });
      return false;
    }

    mutate({
      city_id: parseInt(values.city),
      region_id: parseInt(values.region),
      description: values.description,
      mobile: phoneNumber.nationalNumber,
      mobile_country_code: phoneNumber?.countryCallingCode || "20",
      is_cart: false,
      title: values.address,
    });
  }
  const [choosenCity, setChoosenCity] = useState<number | string>(
    address.city.id
  );
  const [choosenRegion, setChoosenRegion] = useState<number | string | null>(
    address.region.id
  );

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Update Address")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-y-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base text-sm">
                      {t("city")}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setChoosenCity(parseInt(value));
                        }}
                        defaultValue={field.value}
                      >
                        {loadingCities ? (
                          <Skeleton className="w-full h-16 rounded-2xl" />
                        ) : (
                          <SelectTrigger
                            className={
                              "w-full border border-solid  py-8 md:rounded-2xl rounded-xl"
                            }
                          >
                            <SelectValue placeholder={t("select-city")} />
                          </SelectTrigger>
                        )}

                        <SelectContent>
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
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base text-sm">
                      {t("region")}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setChoosenRegion(parseInt(value));
                        }}
                        defaultValue={field.value}
                      >
                        {loadingRegions ? (
                          <Skeleton className="w-full h-16 rounded-2xl" />
                        ) : (
                          <SelectTrigger
                            disabled={choosenRegion == null}
                            className="w-full border border-solid  py-8 md:rounded-2xl rounded-xl"
                          >
                            <SelectValue placeholder={t("select-region")} />
                          </SelectTrigger>
                        )}
                        <SelectContent>
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
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base text-sm">
                      {t("phone")}
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        labels={lang == "ar" ? ar : en}
                        {...field}
                        defaultCountry="AE"
                        onChange={field.onChange}
                        placeholder={t("Enter Your Phone Here")}
                      />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base text-sm">
                      {t("Address")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="rounded-xl py-8 border px-5"
                        {...field}
                        placeholder={t("Enter Your Address Here")}
                      />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">
                      {t("address-short-desc")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="rounded-xl py-8 border px-5"
                        {...field}
                        placeholder={t("placeholder-address-short-desc")}
                      />
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex flex-row mt-4">
              <Button
                type="submit"
                disabled={isPending || loadingCities || loadingRegions}
                className="flex-1 bg-main border border-main hover:bg-main/90 hover:border-main/90 cursor-pointer rounded-2xl py-6"
              >
                {isPending ? <LoadingSpinner /> : t("save")}
              </Button>
              <DialogClose
                asChild
                className="flex-1 cursor-pointer rounded-2xl"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-main text-main py-6 rounded-2xl"
                >
                  {t("cancel")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressDialog;
