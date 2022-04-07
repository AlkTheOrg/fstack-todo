import { Action, configureStore } from "@reduxjs/toolkit";
import todoService, {
  CreateTodo,
  CreateTodoPage,
  DeleteTodo,
  DeleteTodoPage,
  TodoPageReponse,
  TodoResponse,
} from "../../services/todoService";
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
  removePage, //Thunk tests
  createPage,
  removeTodo,
  createTodo,
  Page,
} from "../todoSlice";

const pageOneTodos: Todo[] = [
  {
    id: "2",
    name: "example2",
    color: "green",
    pageId: "1",
    due: new Date(Date.now()),
    completed: false,
  },
  {
    id: "3",
    name: "example3",
    color: "brown",
    pageId: "1",
    due: new Date(Date.now()),
    completed: false,
  },
];
const newTodo: Todo = {
  color: "red",
  due: new Date(Date.now()),
  id: "12",
  name: "do it",
  pageId: "0",
  completed: false,
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
    curEditingTodoId: "",
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
  const pageExists =
    previousState.byPageId.length && previousState.byPageId[pageId];
  const toBeDestructed = pageExists ? previousState.byPageId[pageId] : [];

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
    curEditingTodoId: "",
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
    curEditingTodoId: "",
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
    curEditingTodoId: "",
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
    curEditingTodoId: "",
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
    curEditingTodoId: "",
  };
  const updatedTodo = { ...newTodo, id: "12", name: "dont do it" };
  expect(reducer(previousState, todoUpdated(updatedTodo))).toEqual(
    previousState
  );
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
    curEditingTodoId: "",
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

it("should reset the state to initial state", () => {
  const previoustState: TodosState = {
    pages: { "0": { name: "name", sortKey: "due", sortOrder: "asc" } },
    isLoading: true,
    searchString: "fdsafdasfdsa",
    curPageId: "0",
    byPageId: {
      [pageOneTodos[0].pageId]: pageOneTodos,
    },
    curEditingTodoId: "0",
  };

  expect(reducer(previoustState, reset())).toEqual(initialState);
});

it("should add a new page", () => {
  const page: Page = { name: "name", sortKey: "due", sortOrder: "asc" };

  expect(
    reducer(
      initialState,
      pageAdded({
        ...page,
        id: "0",
      })
    )
  ).toEqual({
    ...initialState,
    pages: { "0": page },
    byPageId: {
      "0": [],
    },
    curPageId: "0",
  });
});

it("should update an existing page", () => {
  const page: Page = { name: "name", sortKey: "due", sortOrder: "asc" };
  const updatedPage: Page = {
    name: "name2",
    sortKey: "name",
    sortOrder: "desc",
  };
  const previousState: TodosState = {
    ...initialState,
    pages: { "0": page },
    byPageId: {
      "0": [],
    },
  };

  expect(reducer(previousState, pageUpdated(["0", updatedPage]))).toEqual({
    ...previousState,
    pages: { "0": updatedPage },
  });
});

it("should not update an non existent page", () => {
  expect(reducer(initialState, pageUpdated(["0", {}]))).toEqual(initialState);
});

it("should set the search string", () => {
  const searchString = "my search string";
  expect(reducer(initialState, setSearchString(searchString))).toEqual({
    ...initialState,
    searchString,
  });
});

// async tests
it("should dispatch createPage", async () => {
  const page: Page = { name: "name", sortKey: "due", sortOrder: "asc" };
  const toBeCreatedPage: CreateTodoPage = { todoPage: page, userId: "0" };
  const spy = jest.spyOn(todoService, "createTodoPage");
  const mockReponse: TodoPageReponse = {
    __v: 0,
    _id: "0",
    name: "name",
    sortKey: "due",
    sortOrder: "asc",
    todos: [],
  };
  spy.mockReturnValue(Promise.resolve(mockReponse));

  const store = configureStore({
    reducer: function (state: TodosState = initialState, action) {
      switch (action.type) {
        case "todoPage/create/fulfilled":
          return action.payload; // Returning the payload to test if it arrived with no problem
        default:
          return state;
      }
    },
  });
  await store.dispatch(createPage(toBeCreatedPage));
  expect(spy).toBeCalledWith(toBeCreatedPage);
  expect(store.getState()).toEqual(mockReponse);
});

it("should dispatch createTodo", async () => {
  const todo: Todo = pageOneTodos[0];
  const toBeCreatedTodo: CreateTodo = { userId: "0", todo, tpId: "0 " };
  const spy = jest.spyOn(todoService, "createTodo");
  const mockResponse: TodoResponse = {
    __v: 0,
    _id: "0",
    name: todo.name,
    due: todo.due.toString(),
    color: todo.color,
    completed: false,
  };
  spy.mockReturnValue(Promise.resolve(mockResponse));
  const store = configureStore({
    reducer: function (state: TodosState = initialState, action) {
      switch (action.type) {
        case "todo/create/fulfilled":
          return action.payload;
        default:
          return state;
      }
    },
  });
  await store.dispatch(createTodo(toBeCreatedTodo));
  expect(spy).toBeCalledWith(toBeCreatedTodo);
  expect(store.getState()).toEqual(mockResponse);
});

it("should dispatch removeTodo", async () => {
  const todo: Todo = pageOneTodos[0];
  const toBeRemovedTodo: DeleteTodo = { userId: "0", todo, tpId: "0 " };
  const spy = jest.spyOn(todoService, "deleteTodo");
  spy.mockReturnValue(Promise.resolve(true));

  const store = configureStore({
    reducer: function (state: TodosState = initialState, action) {
      switch (action.type) {
        case "todo/remove/fulfilled":
          return action.payload;
        default:
          return state;
      }
    },
  });

  await store.dispatch(removeTodo(toBeRemovedTodo));
  expect(spy).toBeCalledTimes(1);
  expect(store.getState()).toEqual(true);
});

it("should dispatch removePage", async () => {
  const toBeRemovedPage: DeleteTodoPage = { userId: "0", tpId: "0 " };
  const spy = jest.spyOn(todoService, "deleteTodoPage");
  spy.mockReturnValue(Promise.resolve(true));

  const store = configureStore({
    reducer: function (state: TodosState = initialState, action) {
      switch (action.type) {
        case "todoPage/remove/fulfilled":
          return action.payload;
        default:
          return state;
      }
    },
  });

  await store.dispatch(removePage(toBeRemovedPage));
  expect(spy).toBeCalledTimes(1);
  expect(store.getState()).toEqual(true);
});
