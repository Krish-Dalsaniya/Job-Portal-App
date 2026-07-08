import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Context } from "./Context";

const queryClient = new QueryClient();

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider
        value={{
          isAuthorized,
          setIsAuthorized,
          user,
          setUser,
        }}
      >
        <App />
      </Context.Provider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
