import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCityDialog from "../components/ManageCities/components/AddCityDialog";
import { AppProviders } from "@/providers/AppProviders";
import { mockOnSubmit, validCity } from "../mocks/indext";

const getTextInput = (name: string) =>
  screen.getByRole("textbox", { name: new RegExp(name, "i") });

const getButton = (name: string) =>
  screen.getByRole("button", { name: new RegExp(name, "i") });

describe("AddCityDialog Component", () => {
  const mockOnClose = jest.fn();

  const renderDialog = (open = true) =>
    render(
      <AppProviders>
        <AddCityDialog
          open={open}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </AppProviders>
    );

  it("renders form fields when open", () => {
    renderDialog();

    expect(getTextInput("City Name")).toBeInTheDocument();
    expect(getTextInput("Description")).toBeInTheDocument();
  });

  it("updates fields on user input", async () => {
    renderDialog();
    const user = userEvent.setup();

    await user.type(getTextInput("City Name"), validCity.name);
    await user.type(getTextInput("Description"), validCity.description);

    expect(getTextInput("City Name")).toHaveValue(validCity.name);
    expect(getTextInput("Description")).toHaveValue(validCity.description);
  });

  it("validates required fields", async () => {
    renderDialog();
    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });

  it("submits successfully with valid input", async () => {
    renderDialog();
    const user = userEvent.setup();

    await user.type(getTextInput("City Name"), validCity.name);
    await user.type(getTextInput("Description"), validCity.description);
    await user.click(getButton("Add"));

    expect(mockOnSubmit).toHaveBeenCalledWith(
      validCity.name,
      validCity.description,
      expect.any(Function) // resetForm
    );
  });

  it("does not render when dialog is closed", () => {
    renderDialog(false);

    expect(screen.queryByRole("textbox", { name: /City Name/i })).toBeNull();
    expect(screen.queryByRole("textbox", { name: /Description/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /Add/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /Cancel/i })).toBeNull();
  });
});
