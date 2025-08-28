"use client";
import { useChangePasswordFormSchema } from "@/lib/form-validation-schemas";
import userService from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import EyeViewIcon from "../icons/EyeViewIcon";
import EyeViewOffIcon from "../icons/EyeViewOffIcon";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import authService from "@/services/auth";
import { IResetPasswordForm } from "@/utils/types";
import { useAuth } from "@/contexts/auth/auth.context";
import { useSearchParams } from "next/navigation";
const UpdateForgetPasswordDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const t = useTranslations();
  const formSchema = useChangePasswordFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmNewPassword: "",
      newPassword: "",
    },
  });
  // const [openOtp, setOpenOtp] = useState<boolean>(false);

  const [isVisibleOldPassword, setIsVisibleOldPassword] =
    useState<boolean>(false);
  const [isVisibleNewPassword, setIsVisibleNewPassword] =
    useState<boolean>(false);
  const [isVisibleConfirmedPassword, setIsVisibleConfirmedPassword] =
    useState<boolean>(false);
  const toggleVisibility = (input: string) => {
    if (input == "current") {
      setIsVisibleOldPassword(!isVisibleOldPassword);
    } else if (input == "new") {
      setIsVisibleNewPassword(!isVisibleNewPassword);
    } else {
      setIsVisibleConfirmedPassword(!isVisibleConfirmedPassword);
    }
  };
  const searchParams = useSearchParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IResetPasswordForm) => authService.resetPassword(data),
    mutationKey: ["update-password"],
    onSuccess: (data) => {
      if (data?.status) {
        setIsOpen(false);
        form.reset();
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { user } = useAuth();
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      email: user?.email || "",
      otp: searchParams.get("code") || "",
      password_confirmation: values.confirmNewPassword,
      password: values.newPassword,
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Change password")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col mt-6 gap-6"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("new-password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isVisibleNewPassword ? "text" : "password"}
                        className=""
                        placeholder={t("Enter Your New Password Here")}
                        {...field}
                      />
                      <button
                        className="absolute mx-2 cursor-pointer inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-0 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirm-new-password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isVisibleConfirmedPassword ? "text" : "password"}
                        className=""
                        placeholder={t("Enter Your Confirm New Password Here")}
                        {...field}
                      />
                      <button
                        className="absolute mx-2 inset-y-0 cursor-pointer end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-0 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={() => toggleVisibility("confirmed")}
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

            <DialogFooter className="flex flex-row mt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-main disabled:opacity-70 border border-main hover:bg-main/90 hover:border-main/90 cursor-pointer rounded-2xl py-6"
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
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForgetPasswordDialog;
