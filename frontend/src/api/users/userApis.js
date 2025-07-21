import { API_ROUTES } from "../../constants/apiRoutes";
import { axiosInstance } from "../../libs/axios";

export const getAllProducts = async (query) => {
  return await axiosInstance.get(
    `${API_ROUTES.COMMON.GET_ALL_PRODUCTS}?${query}}`
  );
};
