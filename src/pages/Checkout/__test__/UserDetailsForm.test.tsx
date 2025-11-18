import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormTestWrapper from "../../../tests/utils/FormTestWrapper";
import {
  invalidCreditCardInfo,
  invalidEmailUser,
  userDetailsInfo,
  validCreditCardInfo,
} from "../mock";

const getTextInput = (name: string) =>
  screen.getByRole("textbox", { name: new RegExp(name, "i") });

const getSelect = (name: string) =>
  screen.getByRole("combobox", { name: new RegExp(name, "i") });

const getButton = (name: string) =>
  screen.getByRole("button", { name: new RegExp(name, "i") });

describe("UserDetailsForm Component", () => {
  const renderForm = (onValidSubmit: any) =>
    render(<FormTestWrapper onValidSubmit={onValidSubmit} />);

  it("renders form fields", () => {
    renderForm(jest.fn());

    expect(getTextInput("Full Name")).toBeInTheDocument();
    expect(getTextInput("Email")).toBeInTheDocument();
    expect(getSelect("Payment Method")).toBeInTheDocument();
  });

  it("updates fields on user input", async () => {
    renderForm(jest.fn());
    const user = userEvent.setup();

    await user.type(getTextInput("Full Name"), userDetailsInfo.fullName);
    await user.type(getTextInput("Email"), userDetailsInfo.email);

    expect(getTextInput("Full Name")).toHaveValue(userDetailsInfo.fullName);
    expect(getTextInput("Email")).toHaveValue(userDetailsInfo.email);
  });

  it("conditionally shows credit card fields when Credit Card selected", async () => {
    renderForm(jest.fn());
    const user = userEvent.setup();

    await user.click(getSelect("Payment Method"));
    await user.click(screen.getByRole("option", { name: /credit card/i }));

    expect(getTextInput("Card Number")).toBeInTheDocument();
    expect(getTextInput("Expiry Date")).toBeInTheDocument();
    expect(getTextInput("CVV")).toBeInTheDocument();
  });

  it("does NOT show credit card fields when PayPal selected", async () => {
    renderForm(jest.fn());
    const user = userEvent.setup();

    await user.click(getSelect("Payment Method"));
    await user.click(screen.getByRole("option", { name: /paypal/i }));

    expect(screen.queryByRole("textbox", { name: /Card Number/i })).toBeNull();
  });

  it("validates required fields", async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);
    const user = userEvent.setup();

    await user.click(getButton("TriggerSubmit"));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText(/full name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/payment method is required/i)
    ).toBeInTheDocument();
  });

  it("shows error for invalid email format", async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);
    const user = userEvent.setup();

    await user.type(getTextInput("Full Name"), invalidEmailUser.fullName);
    await user.type(getTextInput("Email"), invalidEmailUser.email);

    await user.click(getSelect("Payment Method"));
    await user.click(screen.getByRole("option", { name: /paypal/i }));

    await user.click(getButton("TriggerSubmit"));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
  });

  it("shows errors for invalid credit card details", async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);
    const user = userEvent.setup();

    await user.type(getTextInput("Full Name"), invalidCreditCardInfo.fullName);
    await user.type(getTextInput("Email"), invalidCreditCardInfo.email);

    await user.click(getSelect("Payment Method"));
    await user.click(screen.getByRole("option", { name: /credit card/i }));

    await user.type(
      getTextInput("Card Number"),
      invalidCreditCardInfo.cardNumber
    );
    await user.type(
      getTextInput("Expiry Date"),
      invalidCreditCardInfo.cardExpiry
    );
    await user.type(getTextInput("CVV"), invalidCreditCardInfo.cardCvv);

    await user.click(getButton("TriggerSubmit"));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText(/card number must be 16 digits/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/enter expiry as mm\/yy/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/enter 3 or 4 digit cvv/i)
    ).toBeInTheDocument();
  });

  it("calls onValidSubmit with correct values for PayPal", async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);
    const user = userEvent.setup();

    await user.type(getTextInput("Full Name"), userDetailsInfo.fullName);
    await user.type(getTextInput("Email"), userDetailsInfo.email);

    await user.click(getSelect("Payment Method"));
    await user.click(screen.getByRole("option", { name: /paypal/i }));

    await user.click(getButton("TriggerSubmit"));

    expect(mockSubmit).toHaveBeenCalledWith(userDetailsInfo);
  });

  it("submits successfully with valid credit card details", async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);
    const user = userEvent.setup();

    await user.type(getTextInput("Full Name"), validCreditCardInfo.fullName);
    await user.type(getTextInput("Email"), validCreditCardInfo.email);

    await user.click(getSelect("Payment Method"));
    await user.click(screen.getByRole("option", { name: /credit card/i }));

    await user.type(
      getTextInput("Card Number"),
      validCreditCardInfo.cardNumber
    );
    await user.type(
      getTextInput("Expiry Date"),
      validCreditCardInfo.cardExpiry
    );
    await user.type(getTextInput("CVV"), validCreditCardInfo.cardCvv);

    await user.click(getButton("TriggerSubmit"));

    expect(mockSubmit).toHaveBeenCalledWith(validCreditCardInfo);
  });
});
