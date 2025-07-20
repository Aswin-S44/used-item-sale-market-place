import { API_ROUTES } from "../../constants/apiRoutes";
import { axiosInstance } from "../../libs/axios";

export const getProductById = async (productId) => {
  return await axiosInstance.get(
    `${API_ROUTES.COMMON.PRODUCT_DETAILS}/${productId}`
  );
};
