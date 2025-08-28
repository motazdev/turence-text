"use client";
import { useAuth } from "@/contexts/auth/auth.context";
import { useUpdateEmailFormSchema } from "@/lib/form-validation-schemas";
import userService from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
const UpdateEmailDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const t = useTranslations();
  const { setUserData } = useAuth();
  const formSchema = useUpdateEmailFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newEmail: "",
      confirmNewEmail: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-email"],
    mutationFn: (data: { email: string; code: string }) =>
      userService.updateEmail(data),
    onSuccess: (data) => {
      if (data.status) {
        setUserData(data.data);
        deleteCookie("user");
        deleteCookie("token");
        setIsOpen(false);
        window.history.replaceState(null, "", window.location.pathname);
        toast.success(data.message);
        setCookie("token", data.data.token, {
          maxAge: 60 * 60 * 24 * 30,
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const searchParams = useSearchParams();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate({
      email: values.newEmail,
      code: searchParams.get("code") || "",
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("New Email")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex mt-6 flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">{t("new-email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder={t("Enter Your Email Here")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">{t("confirm-new-email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder={t("Enter Your Confirm Email Here")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row mt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 disabled:opacity-70 bg-main border border-main hover:bg-main/90 hover:border-main/90 cursor-pointer rounded-2xl py-6"
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

export default UpdateEmailDialog;
