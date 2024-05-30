// Define your base URL
export const BASE_URL = "http://127.0.0.1:8080/api";

// Define your URL configuration
export const API_URLS = {
  SIGN_UP: `${BASE_URL}/signup`,
  LOGIN: `${BASE_URL}/login`,
  GET_ALL_PRODUCTS: `${BASE_URL}/products`,
  GET_PRODUCT_DATA: `${BASE_URL}/productData`,
  GET_PRODUCT_BY_ID: `${BASE_URL}/productById`,
  GET_PRODUCTS_BY_CATEGORY_ID: `${BASE_URL}/productsByCategory`,
  SEARCH_PRODUCTS: `${BASE_URL}/searchProducts`,
  FETCH_CATEGORIES: `${BASE_URL}/categories`,
  ADD_TO_CART: `${BASE_URL}/addToCart`,
  GET_CART_DATA: `${BASE_URL}/getCartData`,
  CONTACT_US: `${BASE_URL}/contactUs`,
};
