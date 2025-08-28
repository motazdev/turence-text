import request from "@/services/request";
import {
  ICart,
  IOrder,
  IPaginatedReturnResponse,
  IReturnResponse,
} from "@/utils/types";

const orderService = {
  getAllOrders: (page: number): Promise<IPaginatedReturnResponse<IOrder[]>> =>
    request.get(`profile/orders?page=${page}`),

  getSingleOrder: (
    orderId: number,
    seenNotif: number
  ): Promise<IReturnResponse<ICart>> =>
    request.get(`profile/orders/${orderId}`, {
      params: { from_notification_id: seenNotif },
    }),
};

export default orderService;
