import { BACKEND_URL } from "../libs/axios";

export const API_ROUTES = {
  DEALER: {
    SIGNUP: `${BACKEND_URL}/api/v1/dealer/signup`,
    LOGIN: `/api/v1/dealer/signin`,
    ADD_PRODUCT: `${BACKEND_URL}/api/v1/dealer/product`,
    GET_MY_PROFILE: `${BACKEND_URL}/api/v1/dealer/me`,
    GET_DEALER_PRODUCTS: `${BACKEND_URL}/api/v1/dealer/products`,
    DELETE_PRODUCT: `${BACKEND_URL}/api/v1/dealer/product`,
    UPDATE_PRODUCT: `${BACKEND_URL}/api/v1/dealer/product`,
  },
  PRODUCT: {},
  COMMON: {
    PRODUCT_DETAILS: `${BACKEND_URL}/api/v1/dealer/product`,
  },
};
