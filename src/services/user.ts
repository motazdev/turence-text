import {
  INotificationData,
  IReturnResponse,
  IUser,
  IWriteProductReviewBody,
} from "@/utils/types";
import request from "./request";

const userService = {
  updateName: (body: { name: string }): Promise<IReturnResponse<IUser>> =>
    request.post("profile/general-setting/update/name", body),
  updateImage: (body: { image: File }): Promise<IReturnResponse<IUser>> => {
    const formData = new FormData();
    formData.append("image", body.image);

    return request.post("profile/general-setting/update/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  changePassword: (body: {
    password: string;
    old_password: string;
  }): Promise<IReturnResponse<IUser>> =>
    request.post("profile/general-setting/update/password", body),

  updateEmail: (body: {
    email: string;
    code: string;
  }): Promise<IReturnResponse<IUser>> =>
    request.post(`profile/general-setting/update/email/change`, body),

  deleteAccount: (body: {
    password: string;
  }): Promise<IReturnResponse<IUser>> => request.post("profile/delete", body),

  verifyEmailIdentity: (body: {
    code: string;
  }): Promise<IReturnResponse<IUser>> =>
    request.post("auth/verify-email", body),

  updateUserMobile: (body: {
    mobile: string;
    mobile_country_code: string;
  }): Promise<IReturnResponse<IUser>> =>
    request.post("profile/update-personal-info/mobile", body),

  getProfile: (): Promise<IReturnResponse<IUser>> =>
    request.get("auth/user-data"),

  writeReview: (
    body: IWriteProductReviewBody
  ): Promise<IReturnResponse<null>> => request.post("products/add-rate", body),

  getNotifications: (
    page: number
  ): Promise<IReturnResponse<INotificationData>> =>
    request.get(`notifications?pag=${page}`),
};

export default userService;
