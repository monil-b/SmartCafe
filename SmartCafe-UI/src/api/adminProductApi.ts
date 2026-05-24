import axios from "axios";

const API_URL = "http://localhost:8000/api/products";

export interface ProductData {
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const createProduct = async (
  productData: ProductData
) => {
  const userInfo = localStorage.getItem("userInfo");

  const token = userInfo
    ? JSON.parse(userInfo).token
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    API_URL,
    productData,
    config
  );

  return data;
};

export const deleteProduct = async (
  productId: string
) => {
  const userInfo = localStorage.getItem("userInfo");

  const token = userInfo
    ? JSON.parse(userInfo).token
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(
    `${API_URL}/${productId}`,
    config
  );

  return data;
};

export const updateProduct = async (
  productId: string,
  productData: ProductData
) => {
  const userInfo = localStorage.getItem("userInfo");

  const token = userInfo
    ? JSON.parse(userInfo).token
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${API_URL}/${productId}`,
    productData,
    config
  );

  return data;
};