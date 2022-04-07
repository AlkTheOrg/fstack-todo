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
  reset,
  pageAdded,
  pageUpdated,
  setSearchString,
  removePage, //Thunks
  createPage,
  updatePage,
  removeTodo,
  updateTodo,
  createTodo
} from "../todoSlice";

const pageOneTodos: Todo[] = [
  { id: "2", name: "example2", color: "green", pageId: "1", due: new Date(Date.now()), completed: false },
  { id: "3", name: "example3", color: "brown", pageId: "1", due: new Date(Date.now()), completed: false },
];
const newTodo: Todo = {
  color: "red",
  due: new Date(Date.now()),
  id: "12",
  name: "do it",
  pageId: "0",
  completed: false
};

it("should return the initial state", () => {
  expect(reducer(undefined, {} as Action)).toEqual(initialState);
});

it("should take a todos Record and set it as new state", () => {
  const previousState: TodosState = {
    byPageId: {},
    curPageId: "123",
    pages: {},
    isLoading: false,
    searchString: "",
    curEditingTodoId: ""
  };
  const newState: TodosState = {
    ...previousState,
    byPageId: initialState.byPageId,
  };
  expect(reducer(previousState, setTodos(newState.byPageId))).toEqual(newState);
});

it("should add todo to an existing page", () => {
  const previousState = initialState;
  const pageId = newTodo.pageId;
  const pageExists = previousState.byPageId.length && previousState.byPageId[pageId]
  const toBeDestructed = pageExists ? previousState.byPageId[pageId] : []

  expect(reducer(previousState, todoAdded(newTodo))).toEqual({
    ...previousState,
    curPageId: previousState.curPageId,
    byPageId: {
      ...previousState.byPageId,
      [pageId]: [newTodo, ...toBeDestructed],
    },
  });
});

it("should add todo to a new page", () => {
  const previousState: TodosState = {
    byPageId: {},
    curPageId: "",
    pages: {},
    isLoading: false,
    searchString: "",
    curEditingTodoId: ""
  };

  expect(previousState.byPageId[newTodo.pageId]).toBe(undefined);
  expect(reducer(previousState, todoAdded(newTodo))).toEqual({
    ...previousState,
    curPageId: previousState.curPageId,
    byPageId: {
      [newTodo.pageId]: [newTodo],
    },
  });
});

it("should remove an existing todo", () => {
  const previousState: TodosState = {
    pages: {},
    isLoading: false,
    searchString: "",
    curPageId: "0",
    byPageId: {
      "0": [newTodo],
    },
    curEditingTodoId: ""
  };
  expect(reducer(previousState, todoRemoved(newTodo))).toEqual({
    ...previousState,
    curPageId: "0",
    byPageId: {
      "0": [],
    },
  });
});

it("should not update the state while removing an unexistent todo", () => {
  const previousState: TodosState = {
    pages: {},
    isLoading: false,
    searchString: "",
    curPageId: "0",
    byPageId: {
      "0": [],
    },
    curEditingTodoId: ""
  };
  expect(reducer(previousState, todoRemoved(newTodo))).toEqual(previousState);
});

it("should update an existing todo", () => {
  const previousState: TodosState = {
    pages: {},
    isLoading: false,
    searchString: "",
    curPageId: "0",
    byPageId: {
      "0": [newTodo],
    },
    curEditingTodoId: ""
  };
  const updatedTodo = { ...newTodo, id: "12", name: "dont do it" };
  expect(reducer(previousState, todoUpdated(updatedTodo))).toEqual({
    ...previousState,
    curPageId: "0",
    byPageId: {
      "0": [updatedTodo],
    },
  });
});

it("should not update the state while updating an unexistent todo", () => {
  const previousState: TodosState = {
    pages: {},
    isLoading: false,
    searchString: "",
    curPageId: "0",
    byPageId: {
      "0": [],
    },
    curEditingTodoId: ""
  };
  const updatedTodo = { ...newTodo, id: "12", name: "dont do it" };
  expect(reducer(previousState, todoUpdated(updatedTodo))).toEqual(previousState);
});

it("should remove an existing page", () => {
  
  const previoustState: TodosState = {
    pages: {},
    isLoading: false,
    searchString: "",
    curPageId: initialState.curPageId,
    byPageId: {
      ...initialState.byPageId,
      [pageOneTodos[0].pageId]: pageOneTodos,
    },
    curEditingTodoId: ""
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
