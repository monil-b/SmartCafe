import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await API.get("/products");
  return response.data;
};

export const createProduct = async (
  productData: Product
): Promise<Product> => {
  const response = await API.post("/products", productData);
  return response.data;
};

export const updateProduct = async (
  id: string,
  productData: Product
): Promise<Product> => {
  const response = await API.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};