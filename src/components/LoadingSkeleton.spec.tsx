import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { LoadingSkeleton } from "./LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ChakraProvider>
        <LoadingSkeleton />
      </ChakraProvider>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
