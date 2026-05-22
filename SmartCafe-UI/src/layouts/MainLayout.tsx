import { Outlet } from "react-router-dom";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const MainLayout = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="smartcafe-customer-theme"
    >
      <div>
        <Navbar />

        <main className="min-h-screen">
          <Outlet />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
