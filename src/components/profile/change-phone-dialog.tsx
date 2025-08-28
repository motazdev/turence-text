"use client";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";
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
import { useEffect } from "react";
import { useAuth } from "@/contexts/auth/auth.context";
import { useMutation } from "@tanstack/react-query";
import userService from "@/services/user";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePhoneFormSchema } from "@/lib/form-validation-schemas";
import parsePhoneNumberFromString from "libphonenumber-js";
import LoadingSpinner from "../shared/LoadingSpinner";
const ChangePhoneDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const t = useTranslations();
  const formSchema = useUpdatePhoneFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      mobile_country_code: "",
    },
  });
  const { user, setUserData } = useAuth();
  // const [openOtp, setOpenOtp] = useState<boolean>(false);
  useEffect(() => {
    form.setValue(
      "phoneNumber",
      user ? `+${user.mobile_country_code}${user.mobile}` : ""
    );
    form.setValue("mobile_country_code", user ? user.mobile_country_code : "");
  }, [user, form, isOpen]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-name"],
    mutationFn: ({
      mobile,
      mobile_country_code,
    }: {
      mobile: string;
      mobile_country_code: string;
    }) =>
      userService.updateUserMobile({
        mobile,
        mobile_country_code,
      }),
    onSuccess: (data) => {
      toast.success(data.message);
      setUserData(data.data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const phoneNumber = parsePhoneNumberFromString(
      form.getValues("phoneNumber"),
      {
        defaultCallingCode: values.phoneNumber,
      }
    );
    if (!phoneNumber || !phoneNumber.isValid()) {
      form.setError("phoneNumber", { message: t("invalid-phone-number") });
      return false;
    }
    mutate({
      mobile: phoneNumber.nationalNumber,
      mobile_country_code: phoneNumber?.countryCallingCode || "971",
    });
  };

  const userMobile = user ? `+${user.mobile_country_code}${user.mobile}` : "";

  const locale = useLocale();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("change-phone")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="w-full mt-6 flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phone number")}</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="AE"
                      labels={locale == "ar" ? ar : en}
                      initialValueFormat="national"
                      value={field.value}
                      placeholder={t("Enter Your Phone Here")}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-row mt-4">
              <Button
                type="submit"
                disabled={
                  isPending || userMobile === form.getValues("phoneNumber")
                }
                className="flex-1 bg-main border disabled:opacity-70 disabled:cursor-default border-main hover:bg-main/90 hover:border-main/90 cursor-pointer rounded-2xl py-6"
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

export default ChangePhoneDialog;
