import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  test("renders dashboard page", async () => {
    const queryClient = new QueryClient(); 

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText("Task Tracker")).toBeInTheDocument();
  });
});
