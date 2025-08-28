"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth/auth.context";
import userService from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
import { toast } from "sonner";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Label } from "../ui/label";
import ChangePasswordDialog from "./change-password-dialog";
import ChangePhoneDialog from "./change-phone-dialog";
import DeleteAccountDialog from "./delete-account-dialog";
import UpdateEmailDialog from "./update-email-dialog";
import VerifyEmailChangeDialog from "./verify-email-change-dialog";
import ForgetPasswordVerifyDialog from "./forget-password-verify-dialog";
import UpdateForgetPasswordDialog from "./update-forget-password-dialog";
const AccountInfo = () => {
  const t = useTranslations();
  const { user, setUserData } = useAuth();
  const form = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      password: "",
    },
  });

  const { mutate: mutateUpdateName, isPending: isPendingUpdateName } =
    useMutation({
      mutationKey: ["update-name"],
      mutationFn: ({ name }: { name: string }) =>
        userService.updateName({ name }),
      onSuccess: (data) => {
        toast.success(data.message);
        setUserData(data.data);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  useEffect(() => {
    if (user) {
      form.setValue("email", user?.email);
      form.setValue("fullName", user.name);
      form.setValue(
        "phone",
        user ? `+${user.mobile_country_code}${user.mobile}` : ""
      );
    }
  }, [user, form]);

  const [country, setCountry] = useState<CountryCode>();
  const [, setCountryCode] = useState<null | string>(null);
  const locale = useLocale();

  useEffect(() => {
    if (country) {
      const code = getCountryCallingCode(country);
      setCountryCode(code);
    }
  }, [country]);
  const onFormSubmit = () => {
    // mutate(values);
  };
  const [isOpenChangeEmail, setIsOpenChangeEmail] = useState(false);
  const [isOpenVerifyEmail, setIsOpenVerifyEmail] = useState(false);
  const [isOpenDeleteAccount, setIsOpenDeleteAccount] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [isOpenChangePhone, setIsOpenChangePhone] = useState(false);
  const [isOpenverifyResetPass, setIsOpenVerifyResetPass] = useState(false);
  const [isOpenUpdateForgetPassword, setIsOpenUpdateForgetPassword] =
    useState(false);

  return (
    <div className="account-info">
      <UpdateEmailDialog
        isOpen={isOpenChangeEmail}
        setIsOpen={setIsOpenChangeEmail}
      />
      <ForgetPasswordVerifyDialog
        isOpen={isOpenverifyResetPass}
        setIsOpen={setIsOpenVerifyResetPass}
        setIsOpenChangePassword={setIsOpenUpdateForgetPassword}
      />
      <UpdateForgetPasswordDialog
        isOpen={isOpenUpdateForgetPassword}
        setIsOpen={setIsOpenUpdateForgetPassword}
      />
      <VerifyEmailChangeDialog
        isOpen={isOpenVerifyEmail}
        setIsOpen={setIsOpenVerifyEmail}
        setIsOpenChangeEmail={setIsOpenChangeEmail}
      />
      <DeleteAccountDialog
        isOpen={isOpenDeleteAccount}
        setIsOpen={setIsOpenDeleteAccount}
      />
      <ChangePasswordDialog
        isOpen={isOpenChangePassword}
        setIsOpen={setIsOpenChangePassword}
      />
      <ChangePhoneDialog
        isOpen={isOpenChangePhone}
        setIsOpen={setIsOpenChangePhone}
      />
      <h2 className="font-semibold text-lg ">{t("Account Info")}</h2>
      <div className="data mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="grid grid-cols-2 gap-y-4"
          >
            <div className="grid md:grid-cols-2 col-span-2 grid-cols-1 w-full gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Full Name")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          className="pe-[75px]"
                          placeholder={t("Enter Your Full Name Here")}
                          {...field}
                        />
                        <button
                          disabled={
                            !form.getFieldState("fullName").isDirty ||
                            form.getValues("fullName") === user?.name
                          }
                          onClick={() =>
                            mutateUpdateName({ name: field.value })
                          }
                          className="text-main disabled:opacity-70 disabled:cursor-default font-medium select-none underline cursor-pointer absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50"
                        >
                          {isPendingUpdateName ? <LoadingSpinner /> : t("save")}
                        </button>
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
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          readOnly
                          className="peer pe-12 read-only:bg-[#F5F5F5]"
                          placeholder={t("Enter Your Email Here")}
                          type="email"
                          value={field.value}
                        />
                        <span
                          onClick={() => setIsOpenVerifyEmail(true)}
                          className="text-main font-medium select-none underline cursor-pointer absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50"
                        >
                          {t("Change")}
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Phone */}
            <div className="md:col-span-1 col-span-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">{t("Phone")}</FormLabel>
                    <FormControl>
                      <div className="relative ">
                        <PhoneInput
                          readOnly
                          labels={locale == "ar" ? ar : en}
                          {...field}
                          onCountryChange={(country) => {
                            setCountry(country);
                          }}
                          className="!text-lg w-full !bg-[#F5F5F5] cursor-text max-w-full"
                          defaultCountry="AE"
                          onChange={field.onChange}
                          placeholder={t("Enter Phone Here")}
                        />
                        <span
                          onClick={() => setIsOpenChangePhone(true)}
                          className="text-main font-medium select-none underline cursor-pointer absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50"
                        >
                          {t("Change")}
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col mt-8">
                <h3 className="font-semibold text-lg">{t("My Password")}</h3>
                <div className="password mt-4 space-y-2">
                  <Label htmlFor="password">{t("Password")}</Label>

                  <div className="relative">
                    <Input
                      id="password"
                      readOnly
                      onChange={() => {}}
                      defaultValue={"1234567"}
                      className="peer pe-[75px] read-only:bg-[#F5F5F5]"
                      type="password"
                      placeholder={t("Enter Your Password Here")}
                    />
                    <span
                      onClick={() => setIsOpenChangePassword(true)}
                      className="text-main font-medium select-none underline cursor-pointer absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50"
                    >
                      {t("Change")}
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <p className="font-medium text-xs max-w-xs">
                      {t("forget_pass")}{" "}
                      <span
                        onClick={() => setIsOpenVerifyResetPass(true)}
                        className="text-main"
                      >
                        {t("Forget your password?")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="flex flex-col space-y-2">
                  <h3 className="font-semibold text-lg">{t("My Account")}</h3>
                  <p className="text-sm mb-4 text-[#8A8A8A] font-medium">
                    {t("Would you like to delete your account")}
                  </p>
                  <p
                    onClick={() => setIsOpenDeleteAccount(true)}
                    className="cursor-pointer text-[#D90202] font-semibold underline"
                  >
                    {t("del-acc-confirm")}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AccountInfo;
