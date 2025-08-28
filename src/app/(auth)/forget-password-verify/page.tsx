"use client";
import { Button } from "@/components/ui/button";
import ForgetOtpInput from "@/components/ui/ForgetOTPInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useVerifyIdentityFormSchema } from "@/lib/form-validation-schemas";
import authService from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Page = () => {
  const t = useTranslations();
  const router = useRouter();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("email");
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
  const [, setLoadingResend] = useState(false);
  // resend
  const resend = async () => {
    try {
      if (query === undefined) {
        router.push(`/`);
        return;
      }
      setLoadingResend(true);
      const data = await authService.resendResetPassword({
        email: query as string,
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
      sendCode({ email: query as string });
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
        router.replace(`/new-password?email=${query}&otp=${code}`);
      }
    },
    onError: (error) => {
      form.reset();
      toast.error(error.message);
    },
  });

  function onSubmitForm(values: z.infer<typeof formSchema>) {
    if (query === undefined) {
      router.push(`/`);
    }
    setCode(values.code);
    mutate({ otp: values.code, email: query as string });
  }
  return (
    <div className="max-w-[549px] relative bg-white z-20 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)] rounded-2xl p-4 mx-auto mt-12">
      {/* <UpperLogo /> */}
      <div className="flex flex-col ">
        <div className="flex rtl:rotate-180 w-fit rounded-lg p-2  justify-center items-center bg-white border">
          <ChevronLeft />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-medium text-2xl my-2">
            {t("Verify your identity")}
          </h3>
          <p className="text-[#8A8A8A] text-center">
            {t("We have sent a 6-digit code to")}
            <br />
            <span className="text-[#020202] font-medium">{query}</span>
            <br />
            {t("This code will be valid for minutes")}
          </p>
        </div>
      </div>
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
            <Button className="w-full py-8 mt-6 font-medium md:text-lg bg-main hover:bg-main/90 cursor-pointer text-white px-4 rounded-md ">
              {t("Send")}
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-1 justify-center mt-4 font-semibold text-sm">
          <button
            onClick={() => {
              resend();
            }}
            disabled={seconds > 0 || minutes > 0 || isPending}
            type="submit"
            className={`${
              seconds > 0 || minutes > 0 ? "disable" : "active"
            } disabled:opacity-50 cursor-pointer disabled:cursor-default`}
          >
            {t("Resend Code")}
          </button>
          <p className="">
            ( {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds})
          </p>
        </div>
      </>
    </div>
  );
};

export default Page;
