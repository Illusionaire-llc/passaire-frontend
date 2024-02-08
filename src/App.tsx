import { useEffect, useState } from "react";
import "./App.css";
import FormsPage from "./pages/FormsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    window.document.title = import.meta.env.VITE_TENANT_ID;
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FormsPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
