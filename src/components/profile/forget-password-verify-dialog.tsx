"use client";
import { useAuth } from "@/contexts/auth/auth.context";
import { useVerifyIdentityFormSchema } from "@/lib/form-validation-schemas";
import authService from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import ForgetOtpInput from "../ui/ForgetOTPInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
const ForgetPasswordVerifyDialog = ({
  isOpen,
  setIsOpen,
  setIsOpenChangePassword,
}: {
  isOpen: boolean;
  setIsOpenChangePassword: Dispatch<SetStateAction<boolean>>;
  setIsOpen: (value: boolean) => void;
}) => {
  const t = useTranslations();
  const { user } = useAuth();
  const formSchema = useVerifyIdentityFormSchema();
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const resendOTP = () => {
    setMinutes(2);
    setSeconds(0);
  };
  useEffect(() => {
    //interval
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    //interval
    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);
  // submit
  const [loadingResend, setLoadingResend] = useState(false);
  // resend
  const router = useRouter();
  const resend = async () => {
    try {
      if (user === undefined) {
        router.push(`/`);
        return;
      }
      setLoadingResend(true);
      const data = await authService.recoverPassword({
        email: user?.email || "",
      });
      if (data.status) {
        toast.success(data.message);
        resendOTP();
        setLoadingResend(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  useEffect(() => {
    if (!codeSent && user && isOpen) {
      sendCode();
      setCodeSent(true);
      resendOTP();
    }
  }, [isOpen]);
  const { mutate: sendCode } = useMutation({
    mutationKey: ["send-code"],
    mutationFn: () => authService.recoverPassword({ email: user?.email || "" }),
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { code: string }) =>
      authService.verify({ otp: data.code, email: user?.email || "" }),
    mutationKey: ["verify-email"],
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.message);
        setIsOpen(false);
        setIsOpenChangePassword(true);
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set("code", form.getValues("code"));
        const newUrl = `${
          window.location.pathname
        }?${newSearchParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
        form.reset();
        if (redirect) {
          router.replace(redirect as string);
        }
      }
    },
    onError: (error) => {
      form.reset();
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Verify Email")}</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="flex flex-col">
            <p className="text-[#8A8A8A]">
              {t("We have sent a 6-digit code to")}
              <br />
              <span className="text-[#020202] font-medium">{user?.email}</span>
              <br />
              {t("This code will be valid for minutes")}
            </p>
          </div>
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="verify-otp mt-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem dir="ltr">
                      <FormControl>
                        <ForgetOtpInput
                          onChange={(value) => {
                            field.onChange(value);
                            if (value.length === 6) {
                              form.handleSubmit(onSubmit)();
                            }
                          }}
                          value={field.value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-1 justify-center mt-4 font-semibold text-sm">
                  <button
                    onClick={() => {
                      resend();
                    }}
                    type="button"
                    disabled={seconds > 0 || minutes > 0 || loadingResend}
                    className={` disabled:opacity-60 disabled:cursor-default cursor-pointer `}
                  >
                    {loadingResend
                      ? t("Resending") + "..."
                      : t("Resend the code")}
                  </button>
                  <p className="">
                    ( {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds})
                  </p>
                </div>
                <DialogFooter className="flex flex-row mt-4">
                  <Button
                    type="submit"
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
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordVerifyDialog;
