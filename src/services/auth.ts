import {
  IForgetPasswordForm,
  ILoginForm,
  IRegisterForm,
  IResetPasswordForm,
  IReturnResponse,
  IUser,
} from "@/utils/types";
import request from "./request";

const authService = {
  register: (body: IRegisterForm): Promise<IReturnResponse<IUser>> =>
    request.post("auth/register", body),

  login: (body: ILoginForm): Promise<IReturnResponse<IUser>> =>
    request.post("auth/login", body),

  recoverPassword: (
    body: IForgetPasswordForm
  ): Promise<IReturnResponse<null>> =>
    request.post("forget-password/check-email", body),

  resetPassword: (body: IResetPasswordForm): Promise<IReturnResponse<IUser>> =>
    request.post("forget-password/reset-password", body),

  verify: (body: {
    email: string;
    otp: string;
  }): Promise<IReturnResponse<null>> =>
    request.post("/forget-password/check-otp", body),

  resendResetPassword: (body: {
    email: string;
  }): Promise<IReturnResponse<null>> =>
    request.post("/forget-password/check-email", body),

  verifyAccountCodeSend: (): Promise<IReturnResponse<null>> =>
    request.post("auth/verify-email/resend-code"),

  verifyEmail: (body: { code: string }): Promise<IReturnResponse<null>> =>
    request.post("auth/verify-email", body),

  logoutUser: (): Promise<IReturnResponse<null>> =>
    request.post("/auth/logout"),
  emailSendVerifyCode: (): Promise<IReturnResponse<null>> =>
    request.post("profile/general-setting/update/email/send-verify"),
  emailCheckVerifyCode: ({
    code,
  }: {
    code: string;
  }): Promise<IReturnResponse<null>> =>
    request.post(
      `profile/general-setting/update/email/check-verify?code=${code}`
    ),
};

export default authService;
