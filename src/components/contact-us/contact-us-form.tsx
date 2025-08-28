"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import SentSuccessDialog from "./sent-success-dialog";
import SentFailedDialog from "./sent-failed-dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import appService from "@/services/app";
import { IContactUsForm } from "@/utils/types";
import { toast } from "sonner";
import LoadingSpinner from "../shared/LoadingSpinner";
const ContactUsForm = () => {
  const locale = useLocale();
  const t = useTranslations();
  // const formSchema = z.object({
  //   name: z.string().nonempty({ message: t("Please enter your name") }),
  //   email: z.string().email({ message: t("Please enter a valid email") }),
  //   mobile: z
  //     .string()
  //     .nonempty({ message: t("Please enter your phone number") }),
  //   message: z.string().nonempty({ message: t("Please enter your message") }),
  // });
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     mobile: "",
  //     message: "",
  //   },
  // });
  const [isOpenSuccessMessageSent, setIsOpenSuccessMessageSent] =
    useState(false);
  const [isOpenFailedMessageSent, setIsOpenFailedMessageSent] = useState(false);
  const formSchema = z.object({
    name: z.string().nonempty({ message: t("Please enter your name") }),
    email: z.string().email({ message: t("Please enter a valid email") }),
    mobile: z
      .string()
      .nonempty({ message: t("Please enter your phone number") }),
    message: z.string().nonempty({ message: t("Please enter your message") }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["contactUs"],
    mutationFn: (data: IContactUsForm) => appService.contactUs(data),
    onSuccess: () => {
      form.reset();
      setIsOpenSuccessMessageSent(true);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsOpenFailedMessageSent(true);
    },
  });
  const [countryCode, setCountryCode] = useState<null | string>(null);
  const [country, setCountry] = useState<CountryCode>();
  useEffect(() => {
    if (country) {
      const code = getCountryCallingCode(country);
      setCountryCode(code);
    }
  }, [country]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const phoneNumber = parsePhoneNumberFromString(form.getValues("mobile"), {
      defaultCallingCode: values.mobile,
    });
    if (!phoneNumber || !phoneNumber.isValid()) {
      form.setError("mobile", { message: t("invalid-phone-number") });
      return false;
    }
    mutate({
      ...values,
      mobile: phoneNumber.nationalNumber,
      mobile_country_code: countryCode || "20",
    });
  };

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["contactUs"],
  //   mutationFn: (data: IContactUsForm) => appService.contactUs(data),
  //   onSuccess: (data) => {
  //     form.reset();
  //     setSuccess(true);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });
  // const { lang } = useGlobalAppData();
  useEffect(() => {
    if (country) {
      const code = getCountryCallingCode(country);
      setCountryCode(code);
    }
  }, [country]);
  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   const phoneNumber = parsePhoneNumberFromString(form.getValues("mobile"), {
  //     defaultCallingCode: values.mobile,
  //   });
  //   if (!phoneNumber || !phoneNumber.isValid()) {
  //     form.setError("mobile", { message: t("invalid-phone-number") });
  //     return false;
  //   }
  //   mutate({ ...values, mobile_country_code: countryCode || "20" });
  // };

  return (
    <div className="border p-8 rounded-2xl">
      <SentSuccessDialog
        isOpen={isOpenSuccessMessageSent}
        setIsOpen={setIsOpenSuccessMessageSent}
      />
      <SentFailedDialog
        isOpen={isOpenFailedMessageSent}
        setIsOpen={setIsOpenFailedMessageSent}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* the name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">{t("Full Name")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("Enter Full Name Here")} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">{t("Email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("Enter Email Here")}
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Phone */}
          <FormField
            control={form.control}
            name="mobile"
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
                    className="!text-lg"
                    defaultCountry="AE"
                    onChange={field.onChange}
                    placeholder={t("Enter Phone Here")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Message */}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">{t("Messages")}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={t("Enter your Messages Here")}
                    className="resize-none !border rounded-lg h-36 md:h-52 p-3 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 "
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* buttons */}
          <div className="mt-1 md:mt-5 flex items-center gap-3">
            <button
              type="submit"
              disabled={
                isPending ||
                form.formState.isSubmitting ||
                !form.formState.isValid
              }
              className="py-4 disabled:opacity-60 text-center cursor-pointer text-base  w-full rounded-2xl text-white bg-main "
            >
              {isPending ? <LoadingSpinner /> : t("Send")}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactUsForm;
