import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

type MenuCardProps = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

const MenuCard = ({ _id, name, price, image, description }: MenuCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={image || "/placeholder.jpg"}
            alt={name}
            className="h-56 w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

          <Badge className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-black shadow-sm">
            Popular
          </Badge>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description || "No description available."}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-bold text-foreground">₹{price}</span>

            <Button
              onClick={() => {
                addToCart({
                  _id,
                  name,
                  price,
                  image: image || "",
                  quantity: 1,
                });

                toast.success(`${name} added to cart`);
              }}
              className="rounded-full bg-primary px-5 hover:bg-primary/90"
            >
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
