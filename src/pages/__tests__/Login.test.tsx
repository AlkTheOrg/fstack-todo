import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "../Login";

describe("Login page", () => {
  const renderLoginPage = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/", "/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it("should render the Login page", () => {
    renderLoginPage();
    const login = screen.getAllByText("Login")[0];
    expect(login).toBeInTheDocument();
  });

  // 
});
