import AppRoutes from "./routes/AppRoutes";

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <AppRoutes />

      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default App;
