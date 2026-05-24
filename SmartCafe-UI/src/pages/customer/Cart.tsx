import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();
  // Empty Cart UI
  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-20 text-center text-foreground">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Your Cart is Empty
        </h1>

        <p className="mb-6 max-w-md text-muted-foreground">
          Add delicious food to your cart.
        </p>

        <Link to="/menu">
          <Button className="rounded-full bg-primary px-6 hover:bg-primary/90">
            Explore Menu
          </Button>
        </Link>
      </div>
    );
  }

  // Total Calculation
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
            Checkout
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Your Cart
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <Card key={item._id}>
                <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>

                    <p className="text-muted-foreground">₹{item.price}</p>

                    {/* Quantity */}
                    <div className="mt-3 flex items-center gap-3">
                      <Button
                        size="sm"
                        className="rounded-full"
                        onClick={() => decreaseQuantity(item._id!)}
                      >
                        -
                      </Button>

                      <span>{item.quantity}</span>

                      <Button
                        size="sm"
                        className="rounded-full"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => removeFromCart(item._id!)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹40</span>
                </div>

                <div className="flex justify-between border-t pt-4 text-lg font-bold">
                  <span>Total</span>

                  <span>₹{total + 40}</span>
                </div>
              </div>

              <Button className="mt-6 w-full rounded-full bg-primary hover:bg-primary/90">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
