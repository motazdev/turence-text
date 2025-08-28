import { IAddress, IReturnResponse } from "@/utils/types";
import request from "@/services/request";

const addressService = {
  getAllAddresses: (): Promise<IReturnResponse<IAddress[]>> =>
    request.get("profile/my-address"),

  deleteAddress: (id: number): Promise<IReturnResponse<IAddress[]>> =>
    request.post(`profile/my-address/delete/${id}`),
  updateAddress: (
    id: number,
    body: {
      mobile_country_code: string;
      mobile: string;
      city_id: number;
      description: string;
      region_id: number;
    }
  ): Promise<IReturnResponse<IAddress>> =>
    request.post(`profile/my-address/update/${id}`, body),

  addAddress: (body: {
    mobile_country_code: string;
    mobile: string;
    city_id: number;
    description: string;
    title: string;
    region_id: number;
  }): Promise<IReturnResponse<IAddress>> =>
    request.post("profile/my-address/create", body),

  setDefaultAddress: (id: number): Promise<IReturnResponse<IAddress[]>> =>
    request.post(`profile/my-address/set-default/${id}`),
};

export default addressService;
