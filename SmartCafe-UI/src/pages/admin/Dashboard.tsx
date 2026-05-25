import { useEffect, useState } from "react";

import DashboardCard from "@/components/admin/DashboardCard";

import { getUsers } from "@/api/authApi";
import { getProducts } from "@/api/productApi";
import { getAllOrders } from "@/api/orderApi";

type Order = {
  totalPrice: number;
};

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalOrders, setTotalOrders] = useState(0);

  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const users = await getUsers();

      const products = await getProducts();

      const orders = await getAllOrders();

      setTotalUsers(users.length);

      setTotalProducts(products.length);

      setTotalOrders(orders.length);

      const totalRevenue = orders.reduce(
        (acc: number, order: Order) => acc + order.totalPrice,
        0,
      );

      setRevenue(totalRevenue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
          Overview
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Dashboard
        </h1>

        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          SmartCafe business analytics overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Orders" value={totalOrders.toString()} />

        <DashboardCard title="Total Users" value={totalUsers.toString()} />

        <DashboardCard title="Products" value={totalProducts.toString()} />

        <DashboardCard title="Revenue" value={`₹${revenue}`} />
      </div>
    </div>
  );
};

export default Dashboard;
