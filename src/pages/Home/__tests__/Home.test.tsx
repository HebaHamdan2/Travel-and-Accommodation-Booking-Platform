import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import HomeLayout from "../components/HomeLayout";
import renderWithProviders from "../../../tests/utils/renderWithProviders";
import { homeHandlers } from "../mocks/homeHandlers";

const server = setupServer(...homeHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home Page", () => {
  afterEach(() => jest.resetAllMocks());
  it("renders Featured Deals and Trending Destinations Cards after successful fetch", async () => {
    renderWithProviders(<HomeLayout />);
    await waitFor(() => {
      expect(screen.getByText("Hotel A")).toBeInTheDocument();
      expect(screen.getByText("Hotel B")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Paris")).toBeInTheDocument();
      expect(screen.getByText("Tokyo")).toBeInTheDocument();
    });
  });
});
