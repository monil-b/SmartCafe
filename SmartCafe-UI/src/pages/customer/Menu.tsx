import { useState, useEffect } from "react";

import MenuCard from "@/components/menu/MenuCard";
import { getProducts, type Product } from "@/api/productApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["All", "Beverage", "Fast Food", "Pizza", "Italian"];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = products.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
            Menu
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Our Menu
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground">
            Search, filter, and explore items with more breathing room and a
            cleaner visual hierarchy.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto my-10 max-w-xl">
          <Input
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-full border-input bg-background/80 px-5 shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              className="rounded-full px-5"
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuCard
              key={item._id}
              _id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
