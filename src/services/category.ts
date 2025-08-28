import request from "@/services/request";
import {
  ICategory,
  IPaginatedReturnResponse,
  IReturnResponse,
  ISubcategory,
} from "@/utils/types";

const categoryService = {
  getAllCategories: (
    page: number
  ): Promise<IPaginatedReturnResponse<ICategory[]>> =>
    request.get(`data/categories?page=${page}`),

  getSubCategory: (
    categId: number,
    page: number
  ): Promise<IReturnResponse<ISubcategory>> =>
    request.get(`categories/sub/${categId}?page=${page}`),
};

export default categoryService;
