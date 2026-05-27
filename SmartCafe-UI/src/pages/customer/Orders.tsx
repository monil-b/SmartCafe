import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getMyOrders } from "@/api/orderApi";

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
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();

      setOrders(data);
    } catch {
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

        {!isAuthenticated ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold">Sign in to view orders</h2>

            <p className="mt-2 text-muted-foreground">
              Your order history will appear here after you log in.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>

              <Button asChild variant="outline">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        ) : !orders.length ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold">No orders yet</h2>

            <p className="mt-2 text-muted-foreground">
              Start ordering from SmartCafe.
            </p>

            <Button asChild className="mt-6">
              <Link to="/menu">Order Now</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Order #{order._id.slice(-5)}
                      </h2>

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
                      <div key={index} className="flex justify-between">
                        <span>
                          {item.name} x{item.quantity}
                        </span>

                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-between border-t pt-4 text-lg font-bold">
                    <span>Total</span>

                    <span>₹{order.totalPrice}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
