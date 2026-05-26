import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  Menu,
  Coffee,
  LogOut,
  User,
  X as XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/common/ThemeToggle";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
                  {userInfo.name.charAt(0).toUpperCase()}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                {userInfo.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userInfo");

                    window.location.href = "/login";
                  }}
                  className="text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="rounded-full">
                {open ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
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
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium"
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium"
                >
                  Cart
                </Link>

                {userInfo ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium"
                    >
                      Profile
                    </Link>

                    {userInfo.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="text-lg font-medium"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userInfo");

                        window.location.href = "/login";
                      }}
                      className="text-left text-lg font-medium text-red-500"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
