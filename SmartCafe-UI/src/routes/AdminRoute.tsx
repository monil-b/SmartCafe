import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userInfo = localStorage.getItem("userInfo");

  const user = userInfo ? JSON.parse(userInfo) : null;

  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;