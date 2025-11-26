import { render, screen, fireEvent } from "@testing-library/react";
import UpdateCityDialog from "../components/ManageCities/components/UpdateCityDialog";
import { AppProviders } from "@/providers/AppProviders";
import userEvent from "@testing-library/user-event";
import { mockOnSubmitUpdate, selectedCity, validCity } from "../mocks/indext";

describe("Update City Dialog Component", () => {
  const mockOnClose = jest.fn();

  const renderDialog = (open = true) =>
    render(
      <AppProviders>
        <UpdateCityDialog
          open={open}
          onClose={mockOnClose}
          selectedCity={selectedCity}
          onSubmit={mockOnSubmitUpdate}
        />
      </AppProviders>
    );

  const getTextInput = (label: string) =>
    screen.getByRole("textbox", { name: new RegExp(label, "i") });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields with initial values", () => {
    renderDialog();
    expect(getTextInput("City Name")).toHaveValue(selectedCity.name);
    expect(getTextInput("Description")).toHaveValue(selectedCity.description);
  });

  it("updates fields on user input", () => {
    renderDialog();

    fireEvent.change(getTextInput("City Name"), { target: { value: validCity.name } });
    fireEvent.change(getTextInput("Description"), { target: { value: validCity.description } });

    expect(getTextInput("City Name")).toHaveValue(validCity.name);
    expect(getTextInput("Description")).toHaveValue(validCity.description);
  });

  it("validates required fields", async () => {
    renderDialog();

    fireEvent.change(getTextInput("City Name"), { target: { value: "" } });

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    // Wait for the validation error to appear
    expect(await screen.findByText(/city name is required/i)).toBeInTheDocument();
    expect(mockOnSubmitUpdate).not.toHaveBeenCalled();
  });

  it("submits successfully with valid input", async () => {
    renderDialog();
    const user = userEvent.setup();

    await user.clear(getTextInput("City Name"));
    await user.type(getTextInput("City Name"), validCity.name);

    await user.clear(getTextInput("Description"));
    await user.type(getTextInput("Description"), validCity.description);

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(mockOnSubmitUpdate).toHaveBeenCalledWith({
      name: validCity.name,
      description: validCity.description,
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("does not render when dialog is closed", () => {
    renderDialog(false);

    expect(screen.queryByRole("textbox", { name: /City Name/i })).toBeNull();
    expect(screen.queryByRole("textbox", { name: /Description/i })).toBeNull();
  });
});
