"use client";
import UpperLogo from "@/components/auth/upper-logo";
import EyeViewIcon from "@/components/icons/EyeViewIcon";
import EyeViewOffIcon from "@/components/icons/EyeViewOffIcon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import authService from "@/services/auth";
import { IRegisterForm } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import { toast } from "sonner";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useAuth } from "@/contexts/auth/auth.context";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { z } from "zod";
import { useRegisterFormSchema } from "@/lib/form-validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
const Page = () => {
  const lang = useLocale();
  const router = useRouter();
  const { setUserData } = useAuth();
  const t = useTranslations();
  const [countryCode] = useState<null | string>(null);
  const [isVisibleNewPassword, setIsVisibleNewPassword] =
    useState<boolean>(false);
  const [isVisibleConfirmedPassword, setIsVisibleConfirmedPassword] =
    useState<boolean>(false);
  const toggleVisibility = (input: string) => {
    if (input == "new") {
      setIsVisibleNewPassword(!isVisibleNewPassword);
    } else {
      setIsVisibleConfirmedPassword(!isVisibleConfirmedPassword);
    }
  };
  const formSchema = useRegisterFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      mobile_country_code: countryCode ?? "971",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IRegisterForm) => authService.register(data),
    onSuccess: (data) => {
      if (data.status) {
        deleteCookie("chat_token");
        deleteCookie("user");
        deleteCookie("token");
        setCookie("token", data.data.token, {
          maxAge: 60 * 60 * 24 * 30,
        });
        setUserData(data.data);

        router.replace(`/verify?email=${data.data.email}`);
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const phoneNumber = parsePhoneNumberFromString(
      form.getValues("phoneNumber"),
      {
        defaultCallingCode: values.phoneNumber,
      }
    );
    if (!phoneNumber || !phoneNumber.isValid()) {
      form.setError("phoneNumber", { message: t("invalid-phone-number") });
      return false;
    }

    mutate({
      email: values.email,
      name: values.fullName,
      mobile: phoneNumber.nationalNumber,
      password: values.password,
      password_confirmation: values.confirmPassword,
      mobile_country_code: phoneNumber?.countryCallingCode || "20",
    });
  };
  return (
    <div className="max-w-[549px] relative z-20 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)] p-4 rounded-2xl bg-white mx-auto mt-20">
      <UpperLogo />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="mt-4 flex flex-col gap-4 md:gap-5 pb-4"
        >
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="font-medium md:text-base">
                    {t("fullName")}
                  </FormLabel> */}
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"email"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("fullName")}
                      </label>
                      <Input
                        placeholder={t("Enter Your Full Name Here")}
                        type="text"
                        className="autofill:shadow-[inset_0_0_0px_1000px_theme('colors.background')] autofill:text-black"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="font-medium md:text-base">
                    {t("email")}
                  </FormLabel> */}
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"email"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("email")}
                      </label>
                      <Input
                        placeholder={t("Enter Your Email Here")}
                        type="text"
                        className="autofill:shadow-[inset_0_0_0px_1000px_theme('colors.background')] autofill:text-black"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="font-medium md:text-base">
                    {t("phone")}
                  </FormLabel> */}
                  <FormControl>
                    <div className=" group relative">
                      <label
                        htmlFor={"phone"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                      >
                        {t("phone number")}
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="group relative">
                        <label
                          htmlFor={"password"}
                          className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                        >
                          {t("pass")}
                        </label>
                        <Input
                          type={isVisibleNewPassword ? "text" : "password"}
                          placeholder={t("Enter Your Password Here")}
                          {...field}
                          className="autofill:shadow-[inset_0_0_0px_1000px_theme('colors.background')] autofill:text-black"
                        />
                      </div>

                      <button
                        className="absolute cursor-pointer inset-y-0 end-0 flex h-full w-9 mx-4 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  focus-visible:outline-0 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={() => toggleVisibility("new")}
                        aria-label={
                          isVisibleNewPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={isVisibleNewPassword}
                        aria-controls="password"
                      >
                        {isVisibleNewPassword ? (
                          <EyeViewIcon aria-hidden="true" />
                        ) : (
                          <EyeViewOffIcon aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="group relative">
                        <label
                          htmlFor={"confirm-password"}
                          className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-sm font-normal group-has-disabled:opacity-50"
                        >
                          {t("confirm-password")}
                        </label>
                        <Input
                          type={
                            isVisibleConfirmedPassword ? "text" : "password"
                          }
                          placeholder={t("Enter Your Confirm Password Here")}
                          {...field}
                          className="autofill:shadow-[inset_0_0_0px_1000px_theme('colors.background')] autofill:text-black"
                        />
                      </div>
                      <button
                        className="absolute cursor-pointer inset-y-0 end-0 flex h-full w-9  mx-4 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-0  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={() => toggleVisibility("confirm")}
                        aria-label={
                          isVisibleConfirmedPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={isVisibleConfirmedPassword}
                        aria-controls="password"
                      >
                        {isVisibleConfirmedPassword ? (
                          <EyeViewIcon aria-hidden="true" />
                        ) : (
                          <EyeViewOffIcon aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full py-8 mt-6 font-medium md:text-base bg-main hover:bg-main cursor-pointer text-white px-4 rounded-md ">
            {isPending ? <LoadingSpinner /> : t("create account")}
          </Button>
          <div className="flex items-center w-full">
            <div className="flex-grow h-[1.7px] bg-[#ECECEC]" />
            <span className="px-4 text-sm text-main-black font-medium">OR</span>
            <div className="flex-grow h-[1.7px] bg-[#ECECEC]" />
          </div>
        </form>
      </Form>

      <Link href={"/login"} className="size-full">
        <Button
          variant={"outline"}
          className="w-full py-6  font-normal text-sm border-main hover:border-main cursor-pointer text-main-black px-4 rounded-2xl "
        >
          {t("I Have Account,")}{" "}
          <span className="text-main font-medium">{t("Login Now")}</span>
        </Button>
      </Link>
    </div>
  );
};

export default Page;
