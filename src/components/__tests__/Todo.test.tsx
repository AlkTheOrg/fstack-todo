import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";
import Todo from "../Todo";
/* eslint-disable testing-library/no-node-access */
import { Todo as TodoType } from "../../slices/todoSlice";
import { mockTodos } from "../../temp/mockData";

describe("<Todo />", () => {
  const todoOne = mockTodos[0];
  const onClickTodoFunction = () => {};

  const renderTodo = (
    todoProps: TodoType,
    onClickTodo: () => any = onClickTodoFunction
  ) => {
    render(
      <Provider store={store}>
        <Todo {...todoProps} onClickTodo={onClickTodo} />
      </Provider>
    );
  };

  it("should render Todo page", () => {
    renderTodo(todoOne);
    const todo = document.querySelector(".Todo");
    expect(todo).toBeInTheDocument();
  });

  it("should have completed className", () => {
    renderTodo({ ...todoOne, completed: true });
    const todo = document.querySelector(".Todo");
    expect(todo).toBeInTheDocument();
    expect(todo?.classList).toContain("completed");
  });

  it("should have green color if completed", () => {
    renderTodo({ ...todoOne, completed: true });
    const todoName = document.querySelector(".Todo-name") as HTMLDivElement;
    expect(todoName).toBeInTheDocument();
    expect(todoName?.style.color).toBe("green");
  });

  it("should show edit button on mouse enter", () => {
    renderTodo(todoOne);
    const todo = document.querySelector(".Todo") as HTMLDivElement;
    fireEvent.mouseEnter(todo);
    const edit = document.querySelector(".icon-wrapper");
    expect(edit).toBeInTheDocument();
  });

  it("should hide the edit button on mouse leave", () => {
    renderTodo(todoOne);
    const todo = document.querySelector(".Todo") as HTMLDivElement;
    fireEvent.mouseEnter(todo);
    fireEvent.mouseLeave(todo);
    const edit = document.querySelector(".icon-wrapper");
    expect(edit).not.toBeInTheDocument();
  });

  it("should not render the whole text if longer than 54 chars", () => {
    const stringW55Chars = 'a'.repeat(55);
    renderTodo({...todoOne, name: stringW55Chars});
    const todoName = document.querySelector(".Todo-name") as HTMLDivElement;
    expect(todoName.textContent).toBe(stringW55Chars.slice(0, -1) + '...');
  })
});
