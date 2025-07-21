import { API_ROUTES } from "../../constants/apiRoutes";
import { axiosInstance } from "../../libs/axios";

export const SignIn = async (loginData) => {
  return await axiosInstance.post(API_ROUTES.DEALER.LOGIN, loginData);
};

export const AddProduct = async (productDetails) => {
  return await axiosInstance.post(
    API_ROUTES.DEALER.ADD_PRODUCT,
    productDetails
  );
};

export const getMyProfile = async (userId) => {
  return await axiosInstance.get(`${API_ROUTES.DEALER.GET_MY_PROFILE}`);
};

export const getDealerProducts = async (dealerId) => {
  return await axiosInstance.get(
    `${API_ROUTES.DEALER.GET_DEALER_PRODUCTS}/${dealerId}`
  );
};

export const deleteProductById = async (dealerId) => {
  return await axiosInstance.delete(
    `${API_ROUTES.DEALER.DELETE_PRODUCT}/${dealerId}`
  );
};

export const updateProductById = async (productId, updatedData) => {
  return await axiosInstance.patch(
    `${API_ROUTES.DEALER.UPDATE_PRODUCT}/${productId}`,
    updatedData
  );
};
