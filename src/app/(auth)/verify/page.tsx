"use client";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import ForgetOtpInput from "@/components/ui/ForgetOTPInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/auth/auth.context";
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
  //   const router = useRouter();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const router = useRouter();
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
  const resend = async () => {
    try {
      if (query === undefined) {
        router.push(`/`);
        return;
      }
      const data = await authService.verifyAccountCodeSend();
      if (data.status) {
        toast.success(data.message);
        resendOTP();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  const { mutate: sendCode } = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: () => authService.verifyAccountCodeSend(),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const { user } = useAuth();
  useEffect(() => {
    if (!codeSent && user) {
      sendCode();
      setCodeSent(true);
      resendOTP();
    }
  }, []);
  const formSchema = useVerifyIdentityFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { code: string }) => authService.verifyEmail(data),
    mutationKey: ["verify-email"],
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.message);
        form.reset();
        router.replace(`/`);
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
    mutate({ code: values.code });
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
            <Button
              disabled={isPending}
              className="w-full py-8 mt-6 font-medium md:text-lg bg-main hover:bg-main/90 cursor-pointer text-white px-4 rounded-md "
            >
              {isPending ? <LoadingSpinner /> : t("Login")}
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
