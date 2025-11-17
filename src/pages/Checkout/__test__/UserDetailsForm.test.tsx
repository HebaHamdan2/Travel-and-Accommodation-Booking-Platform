import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { INITIAL_USER_DETAILS } from "../constans";
import FormTestWrapper from "../../../tests/utils/FormTestWrapper";

describe("UserDetailsForm Component", () => {
  const renderForm = (onValidSubmit: any) =>
    render(<FormTestWrapper onValidSubmit={onValidSubmit} />);

  const getField = (label: string) =>
    screen.getByLabelText(new RegExp(label, "i"));

  it("renders form fields", () => {
    renderForm(jest.fn());

    expect(getField("Full Name")).toBeInTheDocument();
    expect(getField("Email")).toBeInTheDocument();
    expect(getField("Payment Method")).toBeInTheDocument();
  });

  it("updates fields on user input", async () => {
    renderForm(jest.fn());
    const user = userEvent.setup();

    await user.type(getField("Full Name"), "Heba Hamdan");
    await user.type(getField("Email"), "heba@test.com");

    expect(getField("Full Name")).toHaveValue("Heba Hamdan");
    expect(getField("Email")).toHaveValue("heba@test.com");
  });

  it("conditionally shows credit card fields when Credit Card selected", async () => {
    renderForm(jest.fn());
    const user = userEvent.setup();

    await user.click(getField("Payment Method"));
    await user.click(screen.getByRole("option", { name: /credit card/i }));

    expect(getField("Card Number")).toBeInTheDocument();
    expect(getField("Expiry Date")).toBeInTheDocument();
    expect(getField("CVV")).toBeInTheDocument();
  });

  it("does NOT show credit card fields when PayPal selected", async () => {
    renderForm(jest.fn());
    const user = userEvent.setup();

    await user.click(getField("Payment Method"));
    await user.click(screen.getByRole("option", { name: /paypal/i }));

    expect(screen.queryByLabelText(/Card Number/i)).toBeNull();
  });

  it("validates required fields", async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /TriggerSubmit/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText(/full name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/payment method is required/i)
    ).toBeInTheDocument();
  });

  it("calls onValidSubmit with correct values", async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);
    const user = userEvent.setup();

    await user.type(getField("Full Name"), "Heba");
    await user.type(getField("Email"), "heba@test.com");

    await user.click(getField("Payment Method"));
    await user.click(screen.getByRole("option", { name: /paypal/i }));

    await user.click(screen.getByRole("button", { name: /TriggerSubmit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      ...INITIAL_USER_DETAILS,
      fullName: "Heba",
      email: "heba@test.com",
      paymentMethod: "PayPal",
      specialRequests: "",
    });
  });
});
