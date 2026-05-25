import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ClipboardList,
  Menu,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const SidebarContent = () => {
  const location = useLocation();

  const navItems = [
    {
      to: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/admin/products",
      label: "Products",
      icon: ShoppingBag,
    },
    {
      to: "/admin/orders",
      label: "Orders",
      icon: ClipboardList,
    },
    {
      to: "/admin/users",
      label: "Users",
      icon: Users,
    },
  ];

  return (
    <div className="flex h-full flex-col border-r border-border/70 bg-card/90 text-card-foreground shadow-xl backdrop-blur-xl">
      <Link
        to="/"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background transition hover:bg-muted"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <div className="border-b border-border/70 px-5 py-6">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          SmartCafe
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Admin Panel
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage menu, orders, and team activity.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-border/70 p-4">
        <div className="flex items-center justify-between rounded-2xl bg-muted/70 px-4 py-3 ring-1 ring-border/60">
          <div>
            <p className="text-sm font-medium">Theme</p>
            <p className="text-xs text-muted-foreground">Optional dark mode</p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sticky top-0 hidden h-screen w-72 md:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="p-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-2xl bg-card/80 shadow-sm backdrop-blur"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[18rem] p-0 bg-card/95">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
