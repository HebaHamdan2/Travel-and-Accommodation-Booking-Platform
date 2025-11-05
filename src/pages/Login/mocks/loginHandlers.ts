import { http, HttpResponse, HttpHandler } from "msw";
import { mockedAdmin, mockedFaildUser, mockedUser } from "./users";
import { LoginValues } from "../../../types";
export const handlers: HttpHandler[] = [
  http.post("*/api/auth/authenticate", async ({ request }) => {
    const { userName, password } = (await request.json()) as LoginValues;

    if (
      userName === mockedFaildUser.userName &&
      password === mockedFaildUser.password
    ) {
     return HttpResponse.json(
    { title: "Invalid username or password" },
    { status: 401 }
  );}

    if (
      userName === mockedAdmin.userName &&
      password === mockedAdmin.password
    ) {
      return HttpResponse.json(
        { authentication: "Admin-token", userType: "Admin" },
        { status: 200 }
      );
    }

    if (userName === mockedUser.userName && password === mockedUser.password) {
      return HttpResponse.json(
        { authentication: "User-token", userType: "User" },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { title: "Invalid username or password" },
      { status: 401 }
    );
  }),
];
