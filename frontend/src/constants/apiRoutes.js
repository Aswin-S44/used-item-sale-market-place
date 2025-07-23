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
    UPDATE_PRODUCT_STATUS: `${BACKEND_URL}/api/v1/dealer/product`,
    UPDATE_PROFILE: `${BACKEND_URL}/api/v1/dealer`,
    VERIFY_PASSWORD: `${BACKEND_URL}/api/v1/dealer/password/check`,
    CHANGE_PASSWORD: `${BACKEND_URL}/api/v1/dealer/password/verify-and-reset`,
    VIEW_ANALYTICS: `${BACKEND_URL}/api/v1/dealer/analytics`,
  },
  PRODUCT: {},
  COMMON: {
    PRODUCT_DETAILS: `${BACKEND_URL}/api/v1/dealer/product`,
    GET_ALL_PRODUCTS: `${BACKEND_URL}/api/v1/user/products`,
  },
};
