import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { mockedAdmin, mockedFaildUser, mockedUser } from "../mocks/users";
import Login from "../Login";
import { handlers } from "../mocks/loginHandlers";
import renderWithProviders from "../../../tests/utils/renderWithProviders";
import { LoginValues } from "../../../types";

const getters = {
  getUsernameInput: () => screen.getByLabelText(/^Username/),
  getPasswordInput: () => screen.getByLabelText(/^Password/),
  getLoginButton: () =>
    screen.getByRole("button", {
      name: /Login/,
    }),
};
export const mockedLogin = async (mockedUser: LoginValues) => {
  const usernameInput = getters.getUsernameInput();
  const passwordInput = getters.getPasswordInput();
  const loginButton = getters.getLoginButton();

  await userEvent.type(usernameInput, mockedUser.userName);
  await userEvent.type(passwordInput, mockedUser.password);

  expect(usernameInput).toHaveValue(mockedUser.userName);
  expect(passwordInput).toHaveValue(mockedUser.password);
  await userEvent.click(loginButton);
};
const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Login Page", () => {
  afterEach(() => jest.resetAllMocks());
  it("should update form fields on user input", async () => {
    renderWithProviders(<Login />);
    const usernameInput = getters.getUsernameInput();
    const passwordInput = getters.getPasswordInput();

    await userEvent.type(usernameInput, mockedUser.userName);
    await userEvent.type(passwordInput, mockedUser.password);

    expect(usernameInput).toHaveValue(mockedUser.userName);
    expect(passwordInput).toHaveValue(mockedUser.password);
  });
  it("should enable Login button when form is valid", async () => {
    renderWithProviders(<Login />);

    const usernameInput = getters.getUsernameInput();
    const passwordInput = getters.getPasswordInput();
    const loginButton = getters.getLoginButton();

    await userEvent.type(usernameInput, mockedUser.userName);
    await userEvent.type(passwordInput, mockedUser.password);

    expect(loginButton).toBeEnabled();
  });
  it("should disable Login button when form is invalid", async () => {
    renderWithProviders(<Login />);
    const loginButton = getters.getLoginButton();
    expect(loginButton).toBeDisabled();
  });
  it("shows error for invalid login", async () => {
    renderWithProviders(<Login />);
    const usernameInput = getters.getUsernameInput();
    const passwordInput = getters.getPasswordInput();
    const loginButton = getters.getLoginButton();

    await userEvent.type(usernameInput, mockedFaildUser.userName);
    await userEvent.type(passwordInput, mockedFaildUser.password);
    await userEvent.click(loginButton);

    const error = await screen.findByText(
      /Request failed with status code 401/i
    );
    expect(error).toBeInTheDocument();
  });
});
