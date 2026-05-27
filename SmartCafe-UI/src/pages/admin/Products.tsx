import { useEffect, useMemo, useState } from "react";

import {
  createProduct,
  deleteProduct,
  updateProduct,
  type ProductData,
} from "@/api/adminProductApi";
import { getProducts } from "@/api/productApi";
import { uploadImage } from "@/api/uploadApi";

import { toast } from "sonner";

import Loader from "@/components/common/Loader";
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
import { Plus, Pencil, Trash2 } from "lucide-react";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
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
    } catch {
    }
  };

  const productCount = useMemo(() => products.length, [products]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      const productData: ProductData = {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        status: form.status,
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
    } catch {

      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete?._id) return;

    setDeleteLoading(true);

    try {
      await deleteProduct(productToDelete._id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productToDelete._id),
      );

      toast.success("Product deleted");

      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch {

      toast.error("Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setImageUploading(true);

      const imageUrl = await uploadImage(file);

      setForm((current) => ({
        ...current,
        image: imageUrl,
      }));

      toast.success("Image uploaded successfully");
    } catch {

      toast.error("Image upload failed");
    } finally {
      setImageUploading(false);
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
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Total Items
              </p>

              <p className="text-2xl font-bold">{productCount}</p>
            </div>
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
                  <Label htmlFor="image">Product Image</Label>

                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                  {imageUploading && (
                    <p className="text-sm text-muted-foreground">
                      Uploading image...
                    </p>
                  )}

                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-32 w-32 rounded-xl object-cover border"
                    />
                  )}
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
                  <Button type="submit" disabled={loading}>
                    {loading ? <Loader /> : "Save Product"}
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
                <TableHead className="px-6">ID</TableHead>
                <TableHead className="min-w-[280px] px-6">Name</TableHead>
                <TableHead className="w-[180px] px-6">Category</TableHead>
                <TableHead className="w-[120px] text-right px-6">
                  Price
                </TableHead>
                <TableHead className="w-[120px] px-6">Status</TableHead>
                <TableHead className="px-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="px-6 font-medium text-muted-foreground">
                    #{product._id?.slice(-6)}
                  </TableCell>
                  <TableCell className="min-w-[280px] px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="h-14 w-14 rounded-xl object-cover border"
                      />

                      <div>
                        <p className="font-medium text-foreground">
                          {product.name}
                        </p>

                        <p className="max-w-[14rem] text-sm text-muted-foreground">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px] px-6">
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[120px] text-right font-semibold px-6">
                    ₹{product.price}
                  </TableCell>
                  <TableCell className="w-[120px] px-6">
                    <div className="flex items-center">
                      <Badge
                        className={
                          (product.status || "Live") === "Draft"
                            ? "border border-amber-500/20 bg-amber-500/15 px-3 py-1 text-amber-600 hover:bg-amber-500/15"
                            : "border border-emerald-500/20 bg-emerald-500/15 px-3 py-1 text-emerald-600 hover:bg-emerald-500/15"
                        }
                      >
                        {product.status || "Live"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="px-6">
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
                        onClick={() => {
                          setProductToDelete(product);
                          setDeleteDialogOpen(true);
                        }}
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

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);

          if (!open) {
            setProductToDelete(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
            <DialogDescription>
              This will permanently remove{" "}
              {productToDelete?.name || "this product"}
              from the menu.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
