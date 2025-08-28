"use client";
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
import { useRecoverPasswordFormSchema } from "@/lib/form-validation-schemas";
import authService from "@/services/auth";
import { IForgetPasswordForm } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Page = () => {
  const t = useTranslations();
  const formSchema = useRecoverPasswordFormSchema();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: (data: IForgetPasswordForm) =>
      authService.recoverPassword(data),
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message);
        router.push(`/forget-password-verify?email=${form.getValues("email")}`);
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="max-w-[549px] relative bg-white z-20 shadow-[0_0_140px_-56px_rgba(0,0,0,0.25)] rounded-2xl p-4 mx-auto mt-12">
      <div className="flex flex-col ">
        <div className="flex cursor-pointer rtl:rotate-180 w-fit rounded-lg p-2  justify-center items-center bg-white border">
          <ChevronLeft />
        </div>
        <div className="flex justify-center flex-col items-center text-center">
          <h3 className="font-medium text-2xl my-2">{t("Account recovery")}</h3>
          <p className="text-[#8A8A8A] max-w-xs">
            {t("Please enter your email so we can send you the code")}
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 md:mt-8 flex flex-col gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
          </div>

          <Button
            disabled={isPending}
            className="w-full py-8 font-medium md:text-lg bg-main hover:bg-main/90 cursor-pointer text-white px-4 rounded-md "
          >
            {isPending ? <LoadingSpinner size={28} /> : t("send")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
