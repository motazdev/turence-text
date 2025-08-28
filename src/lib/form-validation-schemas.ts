import { useTranslations } from "next-intl";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const useDeleteAccountFormSchema = () => {
  const t = useTranslations();
  return z.object({
    password: z
      .string()
      .nonempty({ message: t("password-required") })
      .regex(passwordRegex, t("password-input-error"))
      .min(8, { message: t("password-length") }),
  });
};

export const usePasswordFormSchema = () => {
  const t = useTranslations();
  return z
    .object({
      currentPassword: z
        .string()
        .nonempty({ message: t("password-required") })
        .regex(passwordRegex, t("password-input-error"))
        .min(8, { message: t("password-length") }),
      newPassword: z
        .string()
        .nonempty({ message: t("new-password-required") })
        .regex(passwordRegex, t("password-input-error"))
        .min(8, { message: t("password-length") }),
      confirmNewPassword: z
        .string()
        .nonempty({ message: t("confirm-password-required") })
        .min(8, { message: t("password-length") }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("password-not-match"),
      path: ["confirmNewPassword"],
    });
};

export const useChangePasswordFormSchema = () => {
  const t = useTranslations();
  return z
    .object({
      newPassword: z
        .string()
        .nonempty({ message: t("password-required") })
        .regex(passwordRegex, t("password-input-error"))
        .min(8, { message: t("password-length") }),
      confirmNewPassword: z
        .string()
        .nonempty({ message: t("confirm-password-required") })
        .min(8, { message: t("password-length") }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("password-not-match"),
      path: ["confirmNewPassword"],
    });
};

export const useAddNewAddressFormSchema = () => {
  const t = useTranslations();

  return z.object({
    city: z
      .string()
      .nonempty({ message: t("required-city") })
      .min(1, { message: t("required-city") }),
    region: z
      .string()
      .min(1, { message: t("required-region") })
      .nonempty({ message: t("required-region") }),
    phone: z
      .string()
      .min(1, { message: t("required-phone") })
      .nonempty({ message: t("required-phone") }),
    address: z
      .string()
      .min(1, { message: t("required-address") })
      .nonempty({ message: t("required-address") }),
    description: z
      .string()
      .min(1, { message: t("required-description") })
      .nonempty({ message: t("required-description") }),
  });
};
export const useGiftFormSchema = () => {
  const t = useTranslations();

  return z.object({
    friend_name: z.string().min(2, t("required-name")),
    friend_email: z
      .string()
      .email(t("invalid-email"))
      .optional()
      .or(z.literal("")),
    friend_phone: z.string().min(5, t("required-phone")),
    gift_message: z.string().min(1, t("required-message")),
    delivery_date: z.date().refine(
      (date) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d >= today;
      },
      { message: t("Delivery date is required") }
    ),
    notes: z.string().optional(),
    user_name: z.string().min(2, t("required-name")),
    user_email: z
      .string()
      .email(t("invalid-email"))
      .optional()
      .or(z.literal("")),
    user_phone: z.string().min(5, t("required-phone")),
    city: z
      .string()
      .nonempty({ message: t("required-city") })
      .min(1, { message: t("required-city") }),
    region: z
      .string()
      .min(1, { message: t("required-region") })
      .nonempty({ message: t("required-region") }),
    title: z.string(),
    description: z.string(),
  });
};

export const useRegisterFormSchema = () => {
  const t = useTranslations();
  return z
    .object({
      fullName: z.string().nonempty({ message: t("required-name") }),
      email: z
        .string()
        .nonempty({ message: t("email-required") })
        .email({ message: t("invalid-email") }),

      phoneNumber: z
        .string()
        .nonempty({ message: t("required-phone") })
        .refine(isValidPhoneNumber, { message: "invalid-phone-number" }),
      password: z
        .string()
        .nonempty({ message: t("password-required") })
        .regex(passwordRegex, t("password-input-error"))
        .min(8, { message: t("password-length") }),
      confirmPassword: z.string().min(8, { message: t("password-length") }),
      mobile_country_code: z.string().min(1),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("password-not-match"),
      path: ["confirmPassword"],
    });
};
export const usePlanPaymentFormSchema = () => {
  const t = useTranslations();
  return z.object({
    fullName: z.string().nonempty({ message: t("required-name") }),
    email: z
      .string()
      .nonempty({ message: t("email-required") })
      .email({ message: t("invalid-email") }),

    phoneNumber: z
      .string()
      .nonempty({ message: t("required-phone") })
      .refine(isValidPhoneNumber, { message: "invalid-phone-number" }),

    mobile_country_code: z.string().min(1),
  });
};
export const useUpdateNameFormSchema = () => {
  const t = useTranslations();
  return z.object({
    fullName: z.string().nonempty({ message: t("required-name") }),
  });
};

export const useUpdateEmailFormSchema = () => {
  const t = useTranslations();
  return z
    .object({
      newEmail: z
        .string()
        .nonempty({ message: t("email-required") })
        .email({ message: t("invalid-email") }),
      confirmNewEmail: z
        .string()
        .nonempty({ message: t("confirm-email-required") })
        .email({ message: t("invalid-email") }),
    })
    .refine((data) => data.newEmail === data.confirmNewEmail, {
      message: t("email-not-match"),
      path: ["confirmNewEmail"],
    });
};
export const useUpdatePhoneFormSchema = () => {
  const t = useTranslations();
  return z.object({
    phoneNumber: z
      .string()
      .nonempty({ message: t("required-phone") })
      .refine(isValidPhoneNumber, { message: "invalid-phone-number" }),
    mobile_country_code: z.string().min(1),
  });
};
export const useLoginFormSchema = () => {
  const t = useTranslations();
  return z.object({
    email: z.string().email({ message: t("invalid-email") }),
    password: z
      .string()
      .nonempty({ message: t("password-required") })
      .regex(passwordRegex, t("password-input-error"))
      .min(8, { message: t("password-length") }),
  });
};

export const useRecoverPasswordFormSchema = () => {
  const t = useTranslations();
  return z.object({
    email: z
      .string()
      .nonempty({ message: t("email-required") })
      .email({ message: t("invalid-email") }),
  });
};

export const useCreateNewPasswordFormSchema = () => {
  const t = useTranslations();
  return z
    .object({
      email: z
        .string()
        .nonempty({ message: t("email-required") })
        .email({ message: t("invalid-email") }),
      otp: z.string().min(6, { message: t("otp-error") }),
      password: z
        .string()
        .regex(passwordRegex, t("password-input-error"))
        .nonempty({ message: t("password-required") })
        .min(8, { message: t("password-length") }),
      password_confirmation: z
        .string()
        .nonempty({ message: t("confirm-password-required") })
        .min(8, { message: t("password-length") }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("password-not-match"),
      path: ["password_confirmation"],
    });
};

export const useWriteReviewFormSchema = () => {
  const t = useTranslations();
  return z.object({
    product_id: z.number(),
    rate: z.number().min(1, { message: t("Rate is required") }),
    comment: z
      .string()
      .nonempty({ message: t("comment is required") })
      .min(1, { message: t("comment is required") }),
  });
};

export const useContactUsFormSchema = () => {
  const t = useTranslations();
  return z.object({
    name: z.string().min(1, { message: t("required-name") }),
    email: z
      .string()
      .nonempty({ message: t("email-required") })
      .email({ message: t("invalid-email") }),
    mobile: z.string().min(1, { message: t("required-phone") }),
    message: z
      .string()
      .nonempty({ message: t("required-message") })
      .min(5, { message: t("contact-us-message-error") }),
  });
};

export const useVerifyIdentityFormSchema = () => {
  const t = useTranslations();
  return z.object({
    code: z.string().length(6, { message: t("invalid-code") }),
  });
};
