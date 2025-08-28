import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import EyeViewOffIcon from "../icons/EyeViewOffIcon";
import { useForm } from "react-hook-form";
import EyeViewIcon from "../icons/EyeViewIcon";
import { useDeleteAccountFormSchema } from "@/lib/form-validation-schemas";
import { useMutation } from "@tanstack/react-query";
import userService from "@/services/user";
import { removeCookie } from "@/utils/session";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useAuth } from "@/contexts/auth/auth.context";
const DeleteAccountDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const t = useTranslations();
  const formSchema = useDeleteAccountFormSchema();
  const { logout } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { password: string }) => userService.deleteAccount(data),
    mutationKey: ["delete-account"],
    onSuccess: () => {
      removeCookie("token");
      removeCookie("user");
      form.reset();
      logout();
      window.location.replace("/");
    },
    onError: (error) => {
      form.reset();
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[415px]">
        <DialogHeader>
          <DialogTitle>{t("Delete Account")}</DialogTitle>
        </DialogHeader>
        <p className="text-[#8A8A8A] text-sm py-3 max-w-[85%]">
          {t(
            "Please enter your password to confirm and complete the account deletion process"
          )}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-2">
                    {t("Current Password")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isVisiblePassword ? "text" : "password"}
                        tabIndex={-1}
                        className="rounded-xl py-8 border px-5"
                        placeholder={t("Enter Your Password Here")}
                        {...field}
                      />
                      <button
                        className="absolute mx-2 cursor-pointer inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-0 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={
                          isVisiblePassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={isVisiblePassword}
                        aria-controls="password"
                      >
                        {isVisiblePassword ? (
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
                className="flex-1 bg-[#D90202] border border-[#D90202] hover:bg-[#D90202]/90 hover:border-[#D90202]/90 cursor-pointer rounded-2xl py-6"
              >
                {isPending ? <LoadingSpinner /> : t("delete")}
              </Button>

              <DialogClose
                asChild
                className="flex-1 cursor-pointer rounded-2xl"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-[#D90202] text-[#D90202] hover:text-[#D90202] py-6 rounded-2xl"
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

export default DeleteAccountDialog;
