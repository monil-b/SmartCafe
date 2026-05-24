import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/users",
});

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

export const loginUser = async (userData: LoginData) => {
  const response = await API.post("/login", userData);
  return response.data;
};