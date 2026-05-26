import { Outlet } from "react-router-dom";

import Sidebar from "@/components/admin/Sidebar";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { ThemeProvider } from "@/components/theme-provider";

const AdminLayout = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="smartcafe-admin-theme"
    >
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <div className="mb-4 flex items-center justify-between gap-3 rounded-3xl border border-border/70 bg-card/80 px-4 py-3 shadow-sm backdrop-blur md:hidden">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  SmartCafe Admin
                </p>
                <h1 className="text-lg font-semibold tracking-tight">
                  Operations center
                </h1>
              </div>

              <ThemeToggle />
            </div>

            <div className="rounded-[1.75rem] border border-border/70 bg-card/75 p-4 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
