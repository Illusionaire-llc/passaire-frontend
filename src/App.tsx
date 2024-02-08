import { useEffect, useState } from "react";
import "./App.css";
import FormsPage from "./pages/FormsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tenantID } from "./models";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (tenantID) {
      window.document.title = tenantID;
    }
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
