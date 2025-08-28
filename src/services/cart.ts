import {
  IAddCartItem,
  IAddToCartResponse,
  ICart,
  ICartPageData,
  ICheckoutGiftBody,
  ICheckoutResponse,
  ICheckoutUserDetailsBody,
  IGenerateCartId,
  IReturnResponse,
  ITrackOrderResponse,
  IUpdateCartItemQuantityByProduct,
} from "@/utils/types";
import request from "@/services/request";

const cartService = {
  getCartItems: (): Promise<IReturnResponse<ICart>> => request.get("/cart"),

  addCartItem: (body: IAddCartItem): Promise<IReturnResponse<ICart>> =>
    request.post("/cart/add", body),

  generateCartId: (): Promise<IReturnResponse<IGenerateCartId>> =>
    request.get("generate-id"),

  addCartItemFromAllProducts: (body: {
    productId: number;
    qty: number;
  }): Promise<IReturnResponse<IAddToCartResponse>> =>
    request.post(`/cart/add-to-cart-from-all-products/${body.productId}`, body),
  deleteCartItem: (id: number): Promise<IReturnResponse<ICart>> =>
    request.post(`/cart/delete/${id}`),

  updateCartItem: (
    id: number,
    body: { qty: number }
  ): Promise<IReturnResponse<ICart>> =>
    request.post(`/cart/update/${id}`, body),

  addUpdateQuantityByProduct: (
    body: IUpdateCartItemQuantityByProduct
  ): Promise<IReturnResponse<ICart>> => request.post(`/cart/add`, body),

  addUpdateAddress: ({
    address_id,
  }: {
    address_id: string;
  }): Promise<IReturnResponse<ICart>> =>
    request.post("cart/add-or-update-address", { address_id }),

  trackOrder: (id: string): Promise<IReturnResponse<ITrackOrderResponse>> =>
    request.post(`tracking-order`, { code: id }),

  applyPromoCode: ({
    promoCode,
  }: {
    promoCode: string;
  }): Promise<IReturnResponse<ICart>> =>
    request.post("cart/coupon/apply", { code: promoCode }),

  removePromoCode: (): Promise<IReturnResponse<ICart>> =>
    request.post("cart/coupon/remove"),

  checkOut: (): Promise<IReturnResponse<ICheckoutResponse>> =>
    request.post("cart/checkout"),
  checkOutGift: (
    body: ICheckoutGiftBody
  ): Promise<IReturnResponse<ICheckoutResponse>> =>
    request.post("cart/checkout", body),
  checkOutNoAuth: (
    body: ICheckoutUserDetailsBody
  ): Promise<IReturnResponse<ICheckoutResponse>> =>
    request.post("cart/checkout", body),
};

export default cartService;
