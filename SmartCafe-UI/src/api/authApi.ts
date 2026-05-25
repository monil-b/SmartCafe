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

export interface UpdateProfileData {
  name: string;
  email: string;
  password?: string;
}

export const registerUser = async (userData: RegisterData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

export const loginUser = async (userData: LoginData) => {
  const response = await API.post("/login", userData);
  return response.data;
};

export const updateUserProfile = async (
  userData: UpdateProfileData
) => {
  const userInfo = localStorage.getItem("userInfo");

  const token = userInfo
    ? JSON.parse(userInfo).token
    : null;

  const response = await API.put(
    "/profile",
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  localStorage.setItem(
    "userInfo",
    JSON.stringify(response.data)
  );

  return response.data;
};

export const getUsers = async () => {
  const userInfo = localStorage.getItem("userInfo");

  const token = userInfo
    ? JSON.parse(userInfo).token
    : null;

  const response = await API.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteUser = async (
  userId: string
) => {
  const userInfo = localStorage.getItem("userInfo");

  const token = userInfo
    ? JSON.parse(userInfo).token
    : null;

  const response = await API.delete(
    `/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};