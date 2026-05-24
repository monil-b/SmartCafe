import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

import Home from "@/pages/customer/Home";
import Menu from "@/pages/customer/Menu";
import Cart from "@/pages/customer/Cart";
import Orders from "@/pages/customer/Orders";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/admin/Products";
import Users from "@/pages/admin/Users";
import AdminOrders from "@/pages/admin/Orders";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
