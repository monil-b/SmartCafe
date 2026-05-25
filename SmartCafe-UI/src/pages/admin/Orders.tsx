import { useEffect, useState } from "react";

import { getAllOrders, updateOrderStatus } from "@/api/orderApi";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { toast } from "sonner";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;

  user: {
    name: string;
    email: string;
  };
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate = async (orderId: string) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, "Delivered");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order,
        ),
      );

      toast.success("Order marked delivered");
    } catch (error) {
      console.log(error);

      toast.error("Failed to update order");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
          Admin
        </p>

        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Orders</h1>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <Card key={order._id}>
            <CardContent className="space-y-5 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    Order #{order._id.slice(-5)}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {order.user.name} • {order.user.email}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Badge
                  variant={
                    order.status === "Delivered" ? "default" : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </div>

              <div className="space-y-2">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>

                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <p className="text-lg font-bold">₹{order.totalPrice}</p>

                {order.status !== "Delivered" && (
                  <Button onClick={() => handleStatusUpdate(order._id)}>
                    Mark Delivered
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
