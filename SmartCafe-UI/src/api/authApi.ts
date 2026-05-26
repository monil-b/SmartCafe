import axios from "axios";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/users`,
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

export const forgotPassword = async (
  email: string
) => {
  const response = await API.post(
    "/forgot-password",
    { email }
  );

  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string
) => {
  const response = await API.put(
    `/reset-password/${token}`,
    { password }
  );

  return response.data;
};

export const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    const result =
      await signInWithPopup(
        auth,
        provider
      );

    const user = result.user;

    const response = await API.post(
      "/google-login",
      {
        name: user.displayName,
        email: user.email,
      }
    );

    localStorage.setItem(
      "userInfo",
      JSON.stringify(response.data)
    );

    return response.data;
  };

export const verifyOTP =
  async (
    email: string,
    otp: string
  ) => {
    const response =
      await API.post(
        "/verify-otp",
        {
          email,
          otp,
        }
      );

    return response.data;
  };

export const resendOTP =
  async (email: string) => {
    const response =
      await API.post(
        "/resend-otp",
        { email }
      );

    return response.data;
  };