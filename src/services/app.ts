import {
  IAboutUsData,
  IAppQuestionsAnswer,
  IAppSettings,
  ICity,
  IContactUsData,
  IContactUsForm,
  ICustomerFeedback,
  IHomeData,
  IHomeDataServices,
  IPolicy,
  IRegion,
  IReturnResponse,
} from "@/utils/types";
import request from "./request";

const appService = {
  getHomeData: (): Promise<IReturnResponse<IHomeData>> => request.get("home"),
  subscribe: ({
    email,
  }: {
    email: string;
  }): Promise<IReturnResponse<IHomeData>> =>
    request.post("subscriber", { email }),

  getService: ({
    id,
  }: {
    id: number;
  }): Promise<IReturnResponse<IHomeDataServices>> =>
    request.get(`our-services/${id}`),
  getServices: (): Promise<IReturnResponse<IHomeDataServices>> =>
    request.get(`our-services`),
  getAboutUsData: (): Promise<IReturnResponse<IAboutUsData>> =>
    request.get(`data/about-us-page`),
  getAppSettings: (): Promise<IReturnResponse<IAppSettings>> =>
    request.get("data/settings"),
  getPrivacyPolicy: (): Promise<IReturnResponse<IPolicy>> =>
    request.get("data/about/policy"),
  getTermsAndConditions: (): Promise<IReturnResponse<IPolicy>> =>
    request.get("data/about/terms"),
  getRefundPolicy: (): Promise<IReturnResponse<IPolicy>> =>
    request.get("data/about/refund-policy"),
  getCancellationPolicy: (): Promise<IReturnResponse<IPolicy>> =>
    request.get("data/about/cancellation-policy"),
  getAllAppQuestionsAnswers: (): Promise<
    IReturnResponse<IAppQuestionsAnswer[]>
  > => request.get("/data/faqs"),
  getContactUsData: (): Promise<IReturnResponse<IContactUsData>> =>
    request.get("contactus/data"),
  getCustomersFeedback: (): Promise<IReturnResponse<ICustomerFeedback[]>> =>
    request.get("/data/customer-feedback"),
  contactUs: (data: IContactUsForm): Promise<IReturnResponse<null>> =>
    request.post("contactus/send", data),
  getCountries: (): Promise<IReturnResponse<ICity[]>> =>
    request.get("data/countries"),
  getCities: (): Promise<IReturnResponse<ICity[]>> =>
    request.get(`data/cities`),
  getRegions: (id: string | number): Promise<IReturnResponse<IRegion[]>> =>
    request.get(`data/regions/${id}`),

  deleteNotifications: (): Promise<IReturnResponse<null>> =>
    request.post(`notifications/delete-all`),
  readNotification: (id: number): Promise<IReturnResponse<null>> =>
    request.post(`/open-notification/${id}`),
};

export default appService;
