import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import Sidebar, { Props, defaultProps } from "../side/Sidebar";

describe("<Sidebar />", () => {
  const renderSidebar = (
    props: Props = defaultProps,
    children?: React.ReactNode
  ) => {
    return render(<Sidebar {...props}>{children}</Sidebar>);
  };
  /* eslint-disable testing-library/no-node-access */

  it("renders sidebar with given classes", () => {
    renderSidebar({ ...defaultProps, classes: ["abcd"] });
    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.classList).toContain("abcd");
  });

  //TODO Uncomment below after finishing the design of siebar
  // it("should be detached amd be invisible by default", () => {
  //   renderSidebar();
  //   const sidebar = screen.getByRole("complementary");
  //   expect(sidebar.classList).toContain("isDetached");
  //   expect(sidebar.classList).not.toContain("isVisible");
  // });

  // should render the passed title
  it("should render the passed title", () => {
    renderSidebar(defaultProps, <h1>Headingh1</h1>);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Headingh1");
  });

  it("should render an invisible box when title is not passed", () => {
    renderSidebar();
    const invisibleBox = document.querySelector(".invisible-box");
    // console.log(prettyDOM(invisibleBox))

    expect(invisibleBox?.getAttribute("aria-hidden")).toBe("true");
    expect(invisibleBox?.textContent).toBe("");
  });

  it("should be visible when rendered in attached mode", () => {
    renderSidebar({ ...defaultProps, isDetached: false });
    const sidebar = screen.getByRole("complementary");
    expect(sidebar.classList).toContain("isVisible");
    expect(sidebar.classList).toContain("isAttached");
  });

  it("should switch to dettached mode when clicked to detach btn", async () => {
    renderSidebar({ ...defaultProps, isDetached: false });
    const sidebar = screen.getByRole("complementary");

    const detachBtn = screen.getByRole("button");
    fireEvent.click(detachBtn);

    expect(sidebar.classList).not.toContain("isAttached");
  });

  it("should open/close the sidebar on mouse enter/leave", () => {
    renderSidebar({ ...defaultProps, isDetached: true});
    const sidebar = screen.getByRole("complementary");
    const hiderDiv = document.querySelector('.hide-btn-container') as HTMLDivElement;
    expect(sidebar.classList).not.toContain("isVisible");

    fireEvent.mouseEnter(hiderDiv);
    expect(sidebar.classList).toContain("isVisible");

    fireEvent.mouseLeave(sidebar);
    expect(sidebar.classList).not.toContain("isVisible");
  });

  it("should close the sidebar when clicked to hide icon", () => {
    renderSidebar();
    const sidebar = screen.getByRole("complementary");
    const hiderDiv = document.querySelector('.hide-btn-container') as HTMLDivElement;
    const hideBtn = document.querySelector('.hide-btn') as HTMLButtonElement;

    fireEvent.mouseEnter(hiderDiv);
    expect(sidebar.classList).toContain("isVisible");

    fireEvent.click(hideBtn);
    expect(sidebar.classList).not.toContain("isVisible");
  })
});
