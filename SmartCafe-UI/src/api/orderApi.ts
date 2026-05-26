import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

export interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
}

export const createOrder = async (
  orderItems: OrderItem[],
  totalPrice: number
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
    {
      orderItems,
      totalPrice,
    },
    config
  );

  return data;
};

export const getMyOrders = async () => {
  const userInfo = localStorage.getItem("userInfo");

  const token = userInfo
    ? JSON.parse(userInfo).token
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    `${API_URL}/myorders`,
    config
  );

  return data;
};

export const getAllOrders = async () => {
  const userInfo = localStorage.getItem("userInfo");

  const token = userInfo
    ? JSON.parse(userInfo).token
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    API_URL,
    config
  );

  return data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: string
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
    `${API_URL}/${orderId}`,
    { status },
    config
  );

  return data;
};