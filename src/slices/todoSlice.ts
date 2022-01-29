import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { current } from "immer"

export const findTodoIndex: (todos: Todo[], id: string) => number = (
  todos,
  id
) => todos.findIndex((todo) => todo.id === id);

export interface Todo {
  id: string;
  name: string;
  due: Date;
  color: string;
  pageId: string;
};

// export type TodosByPageId = {
//   [page: string]: Todo[];
// };

export type TodosState = {
  // byPageId: TodosByPageId;
  byPageId: Record<string, Todo[]>;
  curPageId: string;
};

export const initialState: TodosState = {
  byPageId: {
    "0": [
      { id: "0", name: "example0", color: "red", pageId: "0", due: new Date(Date.now()) },
      { id: "1", name: "example1", color: "yellow", pageId: "0", due: new Date(Date.now()) },
    ],
  },
  curPageId: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Record<string, Todo[]>>) => {
      state.byPageId = action.payload;
    },
    todoAdded: (state, action: PayloadAction<Todo>) => {
      if (state.byPageId[action.payload.pageId])
        state.byPageId[action.payload.pageId].unshift(action.payload);
      else
        state.byPageId[action.payload.pageId] = [action.payload];
    },
    todoRemoved: (state, action: PayloadAction<Todo>) => {
      const toBeDeleted = action.payload;
      const index = findTodoIndex(
        state.byPageId[toBeDeleted.pageId],
        toBeDeleted.id
      );
      if (index >= 0)
        state.byPageId[toBeDeleted.pageId].splice(index, 1);
    },
    todoUpdated: (state, action: PayloadAction<Todo>) => {
      const updatedTodo = action.payload;
      const index = findTodoIndex(
        state.byPageId[updatedTodo.pageId],
        updatedTodo.id
      );
      if (index >= 0)
        state.byPageId[updatedTodo.pageId][index] = updatedTodo;
    },
    pageRemoved: (state, action: PayloadAction<string>) => {
      if (state.byPageId[action.payload])
        delete state.byPageId[action.payload];
    },
    setCurPage: (state, action: PayloadAction<string>) => {
      state.curPageId = action.payload;
    },
  },
});

export const { setTodos, todoAdded, todoRemoved, todoUpdated, pageRemoved, setCurPage } = todoSlice.actions;
export default todoSlice.reducer;
