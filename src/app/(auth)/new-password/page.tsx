"use client";
import EyeViewIcon from "@/components/icons/EyeViewIcon";
import EyeViewOffIcon from "@/components/icons/EyeViewOffIcon";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth/auth.context";
import { useCreateNewPasswordFormSchema } from "@/lib/form-validation-schemas";
import authService from "@/services/auth";
import { IResetPasswordForm } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Page = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const otp = searchParams.get("otp");
  const email = searchParams.get("email");
  if (!otp || !email) {
    redirect("/recovery");
  }

  const { setUserData } = useAuth();
  const formSchema = useCreateNewPasswordFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      otp: otp,
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data: IResetPasswordForm) => authService.resetPassword(data),
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message);
        deleteCookie("user");
        deleteCookie("token");
        setCookie("token", data.data.token, {
          maxAge: 60 * 60 * 24 * 30,
        });
        setUserData(data.data);
        router.replace("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

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
  return (
    <div className="max-w-[549px] mx-auto mt-20 relative bg-white z-20 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)] rounded-2xl p-4">
      <div className="flex flex-col ">
        <div className="flex cursor-pointer rtl:rotate-180 w-fit rounded-lg p-2  justify-center items-center bg-white border">
          <ChevronLeft />
        </div>
        <div className="flex justify-center flex-col items-center text-center">
          <h3 className="font-medium text-2xl my-2">
            {t("Create a password")}
          </h3>
          <p className="text-[#8A8A8A] max-w-sm">
            {t(
              "Enter a strong password that contains at least 8 characters of letters and numbers"
            )}
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 md:mt-8 flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="group relative">
                      <label
                        htmlFor={"phone"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-base font-normal group-has-disabled:opacity-50"
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
                      className="absolute inset-y-0 cursor-pointer end-0 flex h-full w-9 mx-4 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  focus-visible:outline-0 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={() => toggleVisibility("new")}
                      aria-label={
                        isVisibleNewPassword ? "Hide password" : "Show password"
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
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="group relative">
                      <label
                        htmlFor={"phone"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-base font-normal group-has-disabled:opacity-50"
                      >
                        {t("confirm-password")}
                      </label>
                      <Input
                        type={isVisibleConfirmedPassword ? "text" : "password"}
                        placeholder={t("Enter Your Confirm Password Here")}
                        {...field}
                        className="autofill:shadow-[inset_0_0_0px_1000px_theme('colors.background')] autofill:text-black"
                      />
                    </div>
                    <button
                      className="absolute inset-y-0 cursor-pointer end-0 flex h-full w-9  mx-4 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-0  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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

          <Button
            disabled={isPending}
            className="w-full py-8 mt-6 font-medium md:text-lg bg-main hover:bg-main/90 cursor-pointer text-white px-4 rounded-md "
          >
            {isPending ? <LoadingSpinner /> : t("confirm")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
