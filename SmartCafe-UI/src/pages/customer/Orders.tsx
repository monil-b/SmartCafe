import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Orders = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

        <div className="space-y-6">
          {/* Order Card */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Order #1024</h2>

                  <p className="text-sm text-muted-foreground">22 May 2026</p>
                </div>

                <Badge>Delivered</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Cold Coffee x1</span>
                  <span>₹120</span>
                </div>

                <div className="flex justify-between">
                  <span>Burger x2</span>
                  <span>₹360</span>
                </div>
              </div>

              <div className="mt-5 border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>₹480</span>
              </div>
            </CardContent>
          </Card>

          {/* Second Order */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Order #1025</h2>

                  <p className="text-sm text-muted-foreground">21 May 2026</p>
                </div>

                <Badge variant="secondary">Preparing</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Pizza x1</span>
                  <span>₹250</span>
                </div>

                <div className="flex justify-between">
                  <span>Pasta x1</span>
                  <span>₹200</span>
                </div>
              </div>

              <div className="mt-5 border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>₹450</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Orders;
