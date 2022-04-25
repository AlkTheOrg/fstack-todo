import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import Navbar from "../Navbar";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { setUser } from "../../slices/authSlice";
import Profile from '../../pages/Profile';
import { Login } from '../../pages/Login';

describe("<Navbar />", () => {
  const renderNavbar = () =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  const testUser = {
    email: "test@gmail.com",
    id: "1",
    username: "test user",
  };

  it("should render navbar", () => {
    renderNavbar();
    const sidebarHeader = screen.getByText("Toodo");
    expect(sidebarHeader).toBeInTheDocument();
  });

  it("should render login when no user is logged in", () => {
    renderNavbar();
    const login = screen.getByText("Login");
    expect(login).toBeInTheDocument();
  });

  it("should navigate to login when clicked to Login", () => {
    renderNavbar();
    const login = screen.getByText('Login');
    fireEvent.click(login);
    const loginBtn: HTMLButtonElement = screen.getByRole('button');
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn.type).toBe('submit');
  });

  it("should render profile when a user is logged in", () => {
    renderNavbar();
    store.dispatch(setUser(testUser));
    const profile = screen.getByText("Profile");
    expect(profile).toBeInTheDocument();
  });

  it("should navigate to profile when clicked to Profile", async() => {
    renderNavbar();
    store.dispatch(setUser(testUser));
    const profile = screen.getByText("Profile");
    expect(profile).toBeInTheDocument();
    fireEvent.click(profile);
    
    const update = screen.getByText('UPDATE');
    // console.log(prettyDOM(update));
    expect(update).toBeInTheDocument()
  });
});
