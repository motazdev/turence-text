import request from "@/services/request";
import {
  IAttributesResponse,
  IPaginatedProductsResponse,
  IProduct,
  IProductAttrCombination,
  IProductCombination,
  IProductDetailsResponse,
  IProductFavoritesResponse,
  IProductSpeficiations,
  IReturnResponse,
} from "@/utils/types";

const productService = {
  getProducts: (
    body: IProductSpeficiations,
    page: number = 1
  ): Promise<IPaginatedProductsResponse<IProduct[]>> =>
    request.post(`products?page=${page}`, body),

  getProductAttrCombination: (
    body: IProductAttrCombination
  ): Promise<IReturnResponse<IProductCombination>> =>
    request.post("products/product-attribute-combinations", body),

  getSingleProduct: (
    product_id: number
  ): Promise<IReturnResponse<IProductDetailsResponse>> =>
    request.get(`products/${product_id}`),

  getPaginatedFeedback: ({
    productId,
    page,
  }: {
    productId: number;
    page: number;
  }): Promise<IReturnResponse<IProductDetailsResponse>> =>
    request.get(`products/${productId}?page=${page}`),
  toggleFavorite: ({
    productId,
  }: {
    productId: number;
  }): Promise<IReturnResponse<IProductFavoritesResponse>> =>
    request.post(`/products/favorites-toggle/${productId}`),
  stockReminder: ({
    productId,
  }: {
    productId: number;
  }): Promise<IReturnResponse<IProduct>> =>
    request.post(`/products/stock-reminder/${productId}`),
  getProductsFilters: (): Promise<IReturnResponse<IAttributesResponse>> =>
    request.get(`/products/attributes-filter`),
};

export default productService;
