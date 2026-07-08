import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Context } from "../src/Context";
import React from "react";

const queryClient = new QueryClient();

describe("App", () => {
  it("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Context.Provider
          value={{
            isAuthorized: false,
            setIsAuthorized: vi.fn(),
            user: {},
            setUser: vi.fn(),
          }}
        >
          <App />
        </Context.Provider>
      </QueryClientProvider>
    );
    expect(screen.getByText(/Login As/i)).toBeInTheDocument();
  });
});
