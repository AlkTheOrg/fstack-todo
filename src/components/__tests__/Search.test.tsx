import { fireEvent, render, screen } from "@testing-library/react";
import { FiSearch } from "react-icons/fi";
import { Provider } from "react-redux";
import { setSearchString } from "../../slices/todoSlice";
/* eslint-disable testing-library/no-node-access */
import { store } from "../../store";
import Search, { Props } from "../Search";
import userEvent from "@testing-library/user-event";

describe("<Search />", () => {
  const renderSearch = (props: Props) => {
    render(
      <Provider store={store}>
        <Search {...props} />
      </Provider>
    );
  };

  const searchProps: Props = {
    onChange: (str: string) => store.dispatch(setSearchString(str)),
    defaultValue: "",
    isSubmittable: false,
    onSubmit: () => {},
    buttonClassname: "",
    buttonText: "Submit",
    closeOnClickOutside: false,
    SearchIcon: FiSearch,
  };

  it("should render Search", () => {
    renderSearch(searchProps);
    const search = document.querySelector(".Search");
    expect(search).toBeInTheDocument();
  });

  it("should update the value onchage", () => {
    renderSearch(searchProps);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe(searchProps.defaultValue);

    const newText = "my new text";
    userEvent.type(input, newText);
    expect(input.value).toBe(newText);
  });

  it("should have open class when clicked", () => {
    renderSearch(searchProps);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    const searchIcn = screen.getByTestId("search-icon");
    fireEvent.click(searchIcn);
    expect(input.className).toContain("open");
  });

  it("when closed the open class should be gone", () => {
    renderSearch(searchProps);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    const searchIcn = screen.getByTestId("search-icon");
    fireEvent.click(searchIcn);
    fireEvent.click(searchIcn);
    expect(input.className).not.toContain("open");
  });

  it("should be a submit button if submittable", () => {
    renderSearch({...searchProps, isSubmittable: true});
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  it("onSubmit should be called", () => {
    const customOnSubmit = jest.fn();
    renderSearch({...searchProps, isSubmittable: true, onSubmit: customOnSubmit});
    const btn = screen.getByRole('button');
    fireEvent.submit(btn);
    expect(customOnSubmit).toHaveBeenCalled();
  });

  it("should be closable", () => {
    renderSearch({...searchProps, closeOnClickOutside: true});
    const searchIcn = screen.getByTestId("search-icon");
    fireEvent.click(searchIcn);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.classList).toContain('open')

    const body = document.querySelector('body') as HTMLBodyElement;
    fireEvent.click(body);

    expect(input.classList).not.toContain('open')
  });
});
