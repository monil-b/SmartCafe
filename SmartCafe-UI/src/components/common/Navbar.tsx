import { Link, useLocation } from "react-router-dom";

import { ShoppingCart, Menu, Coffee } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/common/ThemeToggle";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { cartItems } = useCart();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Menu",
      path: "/menu",
    },

    {
      name: "Orders",
      path: "/orders",
    },
  ];

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Coffee className="size-4" />
          </span>
          <span>SmartCafe</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />

            <Badge className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full bg-primary px-1 text-primary-foreground">
              {totalItems}
            </Badge>
          </Link>

          <ThemeToggle />

          {/* Buttons */}
          <Link to="/login">
            <Button variant="outline" className="rounded-full">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button className="rounded-full bg-primary hover:bg-primary/90">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-10 flex flex-col gap-5">
                <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 px-4 py-3">
                  <div>
                    <p className="text-lg font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">
                      Customer view
                    </p>
                  </div>

                  <ThemeToggle />
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-lg font-medium"
                  >
                    {link.name}
                  </Link>
                ))}

                <Link to="/cart" className="text-lg font-medium">
                  Cart
                </Link>

                <Link to="/login" className="text-lg font-medium">
                  Login
                </Link>

                <Link to="/register" className="text-lg font-medium">
                  Register
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
