import { useEffect, useMemo, useState } from "react";

import {
  createProduct,
  deleteProduct,
  updateProduct,
  type ProductData,
} from "@/api/adminProductApi";
import { getProducts } from "@/api/productApi";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Sparkles } from "lucide-react";

type Product = {
  _id?: string;
  name: string;
  price: number;
  category: string;
  status?: "Live" | "Draft";
  description: string;
  image?: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Beverage",
    status: "Live" as Product["status"],
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const productCount = useMemo(() => products.length, [products]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const productData: ProductData = {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        image: form.image,
        description: form.description,
      };

      if (editProductId) {
        const updatedProduct = await updateProduct(editProductId, productData);

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editProductId ? updatedProduct : product,
          ),
        );

        toast.success("Product updated");
      } else {
        const newProduct = await createProduct(productData);

        setProducts((prevProducts) => [newProduct, ...prevProducts]);

        toast.success("Product created successfully");
      }

      setForm({
        name: "",
        price: "",
        category: "Beverage",
        status: "Live",
        image: "",
        description: "",
      });
      setEditProductId(null);

      setDialogOpen(false);
    } catch (error) {
      console.log(error);

      toast.error("Failed to create product");
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId),
      );

      toast.success("Product deleted");
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
            Catalog
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Products</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Add, edit, and stage menu items from a layout that stays usable on
            small screens.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-border/70 bg-muted/50 px-4 py-3 text-sm shadow-sm">
            <p className="text-muted-foreground">Total items</p>
            <p className="text-lg font-semibold">{productCount}</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-sm">
                <Plus className="size-4" />
                Add Product
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editProductId ? "Edit Product" : "Add Product"}
                </DialogTitle>
                <DialogDescription>
                  Capture the essentials first. You can expand this later with
                  images, stock tracking, and modifier groups.
                </DialogDescription>
              </DialogHeader>

              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder="Iced latte"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="1"
                      value={form.price}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          price: event.target.value,
                        }))
                      }
                      placeholder="150"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) =>
                        setForm((current) => ({
                          ...current,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger id="category" className="w-full">
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beverage">Beverage</SelectItem>
                        <SelectItem value="Fast Food">Fast Food</SelectItem>
                        <SelectItem value="Dessert">Dessert</SelectItem>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(value) =>
                        setForm((current) => ({
                          ...current,
                          status: value as Product["status"],
                        }))
                      }
                    >
                      <SelectTrigger id="status" className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Live">Live</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>

                  <Input
                    id="image"
                    value={form.image}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        image: event.target.value,
                      }))
                    }
                    placeholder="https://example.com/burger.jpg"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Short description for the menu card"
                    rows={4}
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">
                    <Sparkles className="size-4" />
                    Save Product
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-border/70 bg-card/85 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Menu inventory</CardTitle>
          <CardDescription>
            Clean table spacing, clearer actions, and stronger mobile overflow
            handling.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="pl-6 font-medium">
                    {product._id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="max-w-[22rem] text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge
                        variant={
                          product.status === "Live" ? "default" : "outline"
                        }
                        className={
                          product.status === "Live"
                            ? "bg-emerald-100 text-emerald-800 border-transparent"
                            : ""
                        }
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={() => {
                          setEditProductId(product._id!);

                          setForm({
                            name: product.name,
                            price: String(product.price),
                            category: product.category,
                            status: product.status || "Live",
                            image: product.image || "",
                            description: product.description,
                          });

                          setDialogOpen(true);
                        }}
                        aria-label={`Edit ${product.name}`}
                        title="Edit"
                      >
                        <Pencil className="size-4" />
                      </Button>

                      <Button
                        size="icon-sm"
                        variant="destructive"
                        onClick={() => handleDelete(product._id!)}
                        aria-label={`Delete ${product.name}`}
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
