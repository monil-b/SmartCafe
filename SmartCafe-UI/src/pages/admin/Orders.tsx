import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, ArrowRight, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Orders</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Live order management can plug in here. Until then, this empty state
            keeps the screen useful and focused.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-muted/50 px-4 py-3 text-sm text-muted-foreground shadow-sm">
          <p className="font-medium text-foreground">0 active orders</p>
          <p>Nothing is waiting in the queue.</p>
        </div>
      </div>

      <Card className="border-dashed border-primary/20 bg-card/85">
        <CardContent className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center sm:px-10">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <SearchX className="size-8" />
          </div>

          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl font-semibold">No orders yet</h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              When customers start checking out, new orders will appear here
              with preparation status, payment details, and actions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/admin/products">
                Review products
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link to="/menu">
                <ClipboardList className="size-4" />
                View customer menu
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
