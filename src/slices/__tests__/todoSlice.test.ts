import { Action } from "@reduxjs/toolkit";
import reducer, {
  setTodos,
  todoAdded,
  todoRemoved,
  todoUpdated,
  pageRemoved,
  setCurPage,
  TodosState,
  initialState,
  Todo,
} from "../todoSlice";

const pageOneTodos = [
  { id: "2", name: "example2", color: "green", pageId: "1", due: Date.now() },
  { id: "3", name: "example3", color: "brown", pageId: "1", due: Date.now() },
];
const newTodo: Todo = {
  color: "red",
  due: Date.now(),
  id: "12",
  name: "do it",
  pageId: "0",
};

it("should return the initial state", () => {
  expect(reducer(undefined, {} as Action)).toEqual(initialState);
});

it("should take a todos Record and set it as new state", () => {
  const previousState: TodosState = {
    byPageId: {},
    curPageId: "123",
  };
  const newState: TodosState = {
    curPageId: previousState.curPageId,
    byPageId: initialState.byPageId,
  };
  expect(reducer(previousState, setTodos(newState.byPageId))).toEqual(newState);
});

it("should add todo to an existing page", () => {
  const previousState = initialState;
  const pageId = newTodo.pageId;

  expect(reducer(previousState, todoAdded(newTodo))).toEqual({
    curPageId: previousState.curPageId,
    byPageId: {
      ...previousState.byPageId,
      [pageId]: [newTodo, ...previousState.byPageId[pageId]],
    },
  });
});

it("should add todo to a new page", () => {
  const previousState: TodosState = {
    curPageId: "",
    byPageId: {},
  };

  expect(previousState.byPageId[newTodo.pageId]).toBe(undefined);
  expect(reducer(previousState, todoAdded(newTodo))).toEqual({
    curPageId: previousState.curPageId,
    byPageId: {
      [newTodo.pageId]: [newTodo],
    },
  });
});

it("should remove an existing todo", () => {
  const previousState: TodosState = {
    curPageId: "0",
    byPageId: {
      "0": [newTodo],
    },
  };
  expect(reducer(previousState, todoRemoved(newTodo))).toEqual({
    curPageId: "0",
    byPageId: {
      "0": [],
    },
  });
});

it("should not update the state while removing an unexistent todo", () => {
  const previousState: TodosState = {
    curPageId: "0",
    byPageId: {
      "0": [],
    },
  };
  expect(reducer(previousState, todoRemoved(newTodo))).toEqual(previousState);
});

it("should update an existing todo", () => {
  const previousState: TodosState = {
    curPageId: "0",
    byPageId: {
      "0": [newTodo],
    },
  };
  const updatedTodo = { ...newTodo, id: "12", name: "dont do it" };
  expect(reducer(previousState, todoUpdated(updatedTodo))).toEqual({
    curPageId: "0",
    byPageId: {
      "0": [updatedTodo],
    },
  });
});

it("should not update the state while updating an unexistent todo", () => {
  const previousState: TodosState = {
    curPageId: "0",
    byPageId: {
      "0": [],
    },
  };
  const updatedTodo = { ...newTodo, id: "12", name: "dont do it" };
  expect(reducer(previousState, todoUpdated(updatedTodo))).toEqual(previousState);
});

it("should remove an existing page", () => {
  const previoustState: TodosState = {
    curPageId: initialState.curPageId,
    byPageId: {
      ...initialState.byPageId,
      [pageOneTodos[0].pageId]: pageOneTodos,
    },
  };
  expect(reducer(previoustState, pageRemoved(pageOneTodos[0].pageId))).toEqual(
    initialState
  );
});

it("should update the current page id", () => {
  expect(reducer(initialState, setCurPage("125"))).toEqual({
    ...initialState,
    curPageId: "125",
  });
});
