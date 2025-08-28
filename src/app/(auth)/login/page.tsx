"use client";
import UpperLogo from "@/components/auth/upper-logo";
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
import { useLoginFormSchema } from "@/lib/form-validation-schemas";
import authService from "@/services/auth";
import { ILoginForm } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import useSession from "../use-session";

const Page = () => {
  const t = useTranslations();
  const [showPass, setShowPass] = useState(false);
  const { setUserData } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const formSchema = useLoginFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useSession();
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILoginForm) => authService.login(data),
    onSuccess: (data) => {
      if (data.status) {
        login(data.data);
        toast.success(data.message);
        deleteCookie("user");
        deleteCookie("token");

        setCookie("token", data.data.token, {
          maxAge: 60 * 60 * 24 * 30,
        });
        setUserData(data.data);
        if (
          searchParams.has("redirect") &&
          searchParams.get("redirect") !== "/login"
        ) {
          router.replace(searchParams.get("redirect") as string);
        } else {
          router.replace("/");
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };
  return (
    <div className="max-w-[549px] z-20 relative bg-white mx-auto mt-20 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)] rounded-2xl p-4">
      <UpperLogo />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="mt-4 md:mt-12 flex flex-col gap-8 pb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>{t("email")}</FormLabel> */}
                  <FormControl>
                    <div className="group relative">
                      <label
                        htmlFor={"email"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-base font-normal group-has-disabled:opacity-50"
                      >
                        {t("email")}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("Enter Your Email Here")}
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative group">
                      <label
                        htmlFor={"email"}
                        className="bg-background text-main-black absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-base font-normal group-has-disabled:opacity-50"
                      >
                        {t("pass")}
                      </label>
                      <Input
                        placeholder={t("Enter Your Password Here")}
                        type={showPass ? "text" : "password"}
                        className="autofill:shadow-[inset_0_0_0px_1000px_theme('colors.background')] autofill:text-black"
                        {...field}
                      />
                      <button
                        className="absolute cursor-pointer inset-y-0 end-0 flex h-full w-9 mx-4 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  focus-visible:outline-0 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        aria-controls="password"
                      >
                        {showPass ? <EyeViewIcon /> : <EyeViewOffIcon />}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Link href={"/recovery"} className="text-main font-medium text-sm">
              {t("forget password")}
            </Link>
          </div>

          <Button
            disabled={isPending}
            className="w-full py-8 mt-6 font-medium md:text-base bg-main hover:bg-main/90 cursor-pointer text-white px-4 rounded-2xl"
          >
            {isPending ? <LoadingSpinner /> : t("Login")}
          </Button>
          <div className="flex items-center w-full my-6">
            <div className="flex-grow h-[1.7px] bg-[#ECECEC]" />
            <span className="px-4 text-sm text-main-black font-medium">
              {t("OR")}
            </span>
            <div className="flex-grow h-[1.7px] bg-[#ECECEC]" />
          </div>
        </form>
      </Form>
      <Link href={"/register"} className="size-full">
        <Button
          variant={"outline"}
          className="w-full py-6  font-normal text-sm border-main hover:border-main cursor-pointer text-main-black px-4 rounded-2xl "
        >
          {t("I Don't Have Account,")}{" "}
          <span className="text-main font-medium">{t("Sign Up Now")}</span>
        </Button>
      </Link>
    </div>
  );
};

export default Page;
