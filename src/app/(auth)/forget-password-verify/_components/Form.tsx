"use client";
import "./style.css";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useVerifyIdentityFormSchema } from "@/lib/form-validation-schemas";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";

import { useAuth } from "@/contexts/auth/auth.context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ForgetOtpInput from "@/components/ui/ForgetOTPInput";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
interface OtpProps {
  query?: string;
}

const OtpForm: FC<OtpProps> = ({ query }: OtpProps) => {
  const t = useTranslations();
  const router = useRouter();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
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
  const resend = async () => {
    try {
      if (email === undefined) {
        router.push(`/`);
        return;
      }
      setLoadingResend(true);
      const data = await authService.resendResetPassword({
        email: email as string,
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
  const { mutate: sendCode } = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: (data: { email: string }) =>
      authService.resendResetPassword(data),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  useEffect(() => {
    if (!codeSent) {
      setCodeSent(true);
    }
  }, []);
  const formSchema = useVerifyIdentityFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
  const resetCountdown = () => {
    const newEndTime = Date.now() + 2 * 60 * 1000; // 2 minutes from now
    localStorage.setItem("otpEndTime", newEndTime.toString());
    setMinutes(2);
    setSeconds(0);
  };
  useEffect(() => {
    const savedEndTime = localStorage.getItem("otpEndTime");
    if (savedEndTime) {
      const remaining = Math.max(
        0,
        Math.floor((+savedEndTime - Date.now()) / 1000)
      );
      if (remaining > 0) {
        setMinutes(Math.floor(remaining / 60));
        setSeconds(remaining % 60);
        setCodeSent(true); // don't send again
        return;
      }
    }

    // Only send if timer is expired or never set
    if (!codeSent) {
      sendCode({ email: email as string });
      setCodeSent(true);
      resetCountdown();
    }
  }, []);
  const [code, setCode] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { email: string; otp: string }) =>
      authService.verify(data),
    mutationKey: ["verify-email"],
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.message);
        form.reset();
        router.replace(`/new-password?email=${email}&otp=${code}`);
      }
    },
    onError: (error) => {
      form.reset();
      toast.error(error.message);
    },
  });

  function onSubmitForm(values: z.infer<typeof formSchema>) {
    if (email === undefined) {
      router.push(`/`);
    }
    setCode(values.code);
    mutate({ otp: values.code, email: email as string });
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="verify-otp mt-5 md:mt-8"
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
                        form.handleSubmit(onSubmitForm)();
                      }
                    }}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className={`bg-main flex-c font-medium md:text-xl text-white px-4 rounded-[18px] h-[60px] md:h-[70px] w-full mt-4 ${
              seconds > 0 || minutes > 0 ? "opacity-50" : "active"
            }`}
            disabled={seconds > 0 || minutes > 0 || isPending}
          >
            {isPending ? <LoadingSpinner /> : t("send")}
          </button>
        </form>
      </Form>

      <div className="flex items-center   gap-1 justify-center mt-4 font-semibold text-sm">
        <button
          onClick={() => {
            resend();
            // resendOTP();
          }}
          disabled={seconds > 0 || minutes > 0}
          type="submit"
          className={`text-gray disabled:opacity-60 ${
            seconds > 0 || minutes > 0 ? "disable" : "active"
          }`}
        >
          {t("Resend the code")}
        </button>
        <p className="">
          ( {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds})
        </p>
      </div>
    </>
  );
};

export default OtpForm;
