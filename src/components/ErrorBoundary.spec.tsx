import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

// Suppress the console.error output from the expected thrown error
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

afterAll(() => {
  consoleErrorSpy.mockRestore();
});

const ThrowingChild = (): JSX.Element => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary fallback={<div>Error fallback</div>}>
        <div>Normal content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Normal content")).toBeInTheDocument();
    expect(screen.queryByText("Error fallback")).not.toBeInTheDocument();
  });

  it("renders the fallback when a child throws", () => {
    render(
      <ErrorBoundary fallback={<div>Error fallback</div>}>
        <ThrowingChild />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Error fallback")).toBeInTheDocument();
    expect(screen.queryByText("Normal content")).not.toBeInTheDocument();
  });

  it("renders the exact fallback element provided", () => {
    render(
      <ErrorBoundary fallback={<h1>Something failed!</h1>}>
        <ThrowingChild />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole("heading", { name: "Something failed!" }),
    ).toBeInTheDocument();
  });
});
