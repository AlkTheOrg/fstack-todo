import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "../Login";
import { User, setUser } from "../../slices/authSlice";
import userEvent from "@testing-library/user-event";

describe("Login page", () => {
  const renderLoginPage = (user: User | null = null) => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    if (user) store.dispatch(setUser(user));
  };

  it("should be rendered", () => {
    renderLoginPage();
    const login = screen.getAllByText("Login")[0];
    expect(login).toBeInTheDocument();
  });

  it("should update the username value on change", () => {
    renderLoginPage();
    const username = screen.getByRole("textbox") as HTMLInputElement;
    const newValue = "sometext";
    userEvent.type(username, newValue);
    expect(username.value).toBe(newValue);
  });

  it("should update the password value on change", () => {
    renderLoginPage();
    // eslint-disable-next-line testing-library/no-node-access
    const password = document.querySelector('#password') as HTMLInputElement;
    const newValue = "sometext";
    userEvent.type(password, newValue);
    expect(password.value).toBe(newValue);
  });

  // const mockUser: User = {
  //   email: "test@gamil.com",
  //   id: "1",
  //   username: "test",
  // };

  // TODO check how to test async hook in a proper way. Is setTimeout the expected way? etc.
  // it("should redirect to home if User exists", async () => {
  //   renderLoginPage(mockUser);
  //   await new Promise((resolve) => setTimeout(resolve, 1));
  //   const home = screen.queryByText("Home");
  //   expect(home).toBeTruthy();
  // });
});
