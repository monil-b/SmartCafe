import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BadgeCheck,
  ChefHat,
  Coffee,
  Cookie,
  Flame,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "@/api/productApi";
import { useCart } from "@/context/CartContext";

const categories = [
  {
    name: "Coffee",
    description: "Smooth brews and seasonal specials.",
    icon: Coffee,
  },
  {
    name: "Pizza",
    description: "Freshly baked, cheesy, and shareable.",
    icon: Flame,
  },
  {
    name: "Burgers",
    description: "Rich, stacked, and built to satisfy.",
    icon: ChefHat,
  },
  {
    name: "Desserts",
    description: "Sweet finishes with a premium touch.",
    icon: Cookie,
  },
];

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch {
    }
  };

  return (
    <div className="space-y-0">
      <section className="relative min-h-[80vh] overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-6 py-20">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
              <BadgeCheck className="size-4 text-orange-400" />
              Fresh coffee, fast service, premium presentation
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              SmartCafe makes ordering feel modern, fast, and premium.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
              A cafe dashboard and customer experience designed with stronger
              spacing, warm orange accents, and clean card layouts that feel
              more polished at a glance.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/menu">
                <Button className="rounded-full bg-primary px-7 text-base hover:bg-primary/90">
                  Explore Menu
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {[
                ["120+", "orders served daily"],
                ["4.9/5", "customer rating"],
                ["10 min", "average prep time"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur"
                >
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="mt-1 text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-20 text-foreground dark:bg-zinc-900 dark:text-foreground">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
              Categories
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Built for coffee, food, and fast service
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Large spacing, stronger type hierarchy, and reusable cards give
              the whole system a more intentional feel.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Card
                  key={category.name}
                  className="bg-white text-slate-900 dark:bg-zinc-100 dark:text-slate-900"
                >
                  <CardContent className="space-y-5 p-6">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                      <Icon className="size-6" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {category.name}
                      </h3>
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-600">
                        {category.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-foreground dark:bg-background">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
              Featured items
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Popular picks with a stronger visual rhythm
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.slice(0, 3).map((item) => (
              <Card
                key={item.name}
                className="overflow-hidden text-slate-900 dark:bg-zinc-100 dark:text-slate-900"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-56 w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="space-y-4 p-6">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-600">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">₹{item.price}</span>
                      <Button
                        className="rounded-full bg-primary px-5 hover:bg-primary/90"
                        onClick={() =>
                          addToCart({
                            _id: item._id!,
                            name: item.name,
                            price: item.price,
                            image: item.image || "",
                            quantity: 1,
                          })
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-20 text-foreground dark:bg-zinc-900 dark:text-foreground">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
              Testimonials
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              The layout feels more premium instantly
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Amazing food and very fast delivery.", "Monil"],
              ["Beautiful UI and smooth ordering experience.", "Rahul"],
              ["Best burgers and coffee in town.", "Priya"],
            ].map(([quote, name]) => (
              <Card
                key={name}
                className="bg-white text-slate-900 dark:bg-zinc-100 dark:text-slate-900"
              >
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-1 text-orange-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-base leading-7 text-slate-600 dark:text-slate-600">
                    {quote}
                  </p>

                  <p className="font-semibold">{name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-orange-500 to-red-500 px-8 py-10 text-center md:flex-row md:text-left">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm uppercase tracking-[0.32em] text-white/80">
              Start now
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Build the cafe experience customers remember.
            </h2>
            <p className="text-white/85">
              Strong color contrast, larger spacing, and reusable premium cards
              make the interface feel designed rather than assembled.
            </p>
          </div>

          <Link to="/menu">
            <Button className="rounded-full bg-white px-7 text-base text-black hover:bg-white/90">
              Order Now
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
