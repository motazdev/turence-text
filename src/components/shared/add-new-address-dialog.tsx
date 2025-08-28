"use client";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { useLocale, useTranslations } from "next-intl";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

import { useGlobalAppData } from "@/contexts/global/global.context";
import { useAddNewAddressFormSchema } from "@/lib/form-validation-schemas";
import addressService from "@/services/address";
import appService from "@/services/app";
import useCartStore from "@/store/cart";
import { IAddress, ICart, IReturnResponse } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
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
import LoadingSpinner from "./LoadingSpinner";
const AddNewAddressDialog = ({
  openNewAddress,
  setOpenNewAddress,
  setAsCartAddress,
  isCart,
  addAddressOnCart,
}: {
  trigger?: ReactNode;
  addAddressOnCart?: boolean;
  setAsCartAddress?: UseMutateFunction<
    IReturnResponse<ICart>,
    Error,
    {
      address_id: string;
    },
    unknown
  >;

  setOpenNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
  openNewAddress: boolean;
  isCart?: boolean;
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (openNewAddress) {
      setShouldFetch(true);
    }
  }, [openNewAddress]);
  const formSchema = useAddNewAddressFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      city: "",
      region: "",
      phone: "",
      address: "",
    },
  });
  const queryClient = useQueryClient();
  const [, setCountryCode] = useState<null | undefined | string>(null);
  const { setUserAddresses } = useGlobalAppData();

  const { setCart } = useCartStore();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      mobile_country_code: string;
      mobile: string;
      city_id: number;
      description: string;
      region_id: number;
      is_cart: boolean;
      title: string;
    }) => addressService.addAddress(data),
    mutationKey: ["add-address"],
    onSuccess: (data) => {
      if (data?.status) {
        form.reset();
        setOpenNewAddress(false);
        toast.success(data.message);
      }
      setUserAddresses((prev: IAddress[] | null) =>
        prev ? [...prev, data.data] : [data.data]
      );
      if (setOpenNewAddress) {
        setOpenNewAddress(false);
        setOpenNewAddress(false);
      }
      if (isCart) {
        const resp = data.data as unknown as ICart;
        setCart(resp);
      }
      // if (setAsCartAddress) {
      //   setAsCartAddress({ address_id: data.data.id.toString() });
      // } else {
      //   toast.success(data.message);
      // }
      if (addAddressOnCart) {
        queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
      is_cart: isCart ?? false,
      title: values.address,
    });
  }
  const [choosenCity, setChoosenCity] = useState<number | string | null>(null);
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
  return (
    <Dialog open={openNewAddress} onOpenChange={setOpenNewAddress}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Add New Address")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col mt-4 gap-6"
          >
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className=" md:text-base font-medium">
                    {t("City")}
                  </FormLabel>
                  <FormControl>
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
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <FormLabel className=" md:text-base font-medium">
                    {t("region")}
                  </FormLabel>
                  <FormControl>
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
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">{t("Phone")}</FormLabel>
                  <FormControl>
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
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" md:text-base font-medium">
                    {t("Address")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("Enter Your Address Here")}
                    />
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
                  <FormLabel className="">{t("address-short-desc")}</FormLabel>
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
            <DialogFooter className="flex flex-row mt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-main border border-main hover:bg-main/90 hover:border-main/90 cursor-pointer rounded-xl py-6"
              >
                {isPending ? <LoadingSpinner /> : t("save")}
              </Button>
              <DialogClose asChild className="flex-1 cursor-pointer">
                <Button
                  onClick={() => {
                    setOpenNewAddress(true);
                  }}
                  type="button"
                  variant="outline"
                  className="flex-1 border-main text-main py-6 rounded-xl"
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

export default AddNewAddressDialog;
