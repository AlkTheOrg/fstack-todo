import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { current } from "immer"

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
  completed: boolean;
};

export type SortKey = "name" | "due";
export type SortOrder = "asc" | "desc"

export type SortProps = {
  key: SortKey,
  order: SortOrder,
}

export interface Page {
  name: string,
  sortKey: SortKey,
  sortOrder: SortOrder
}

export interface PageWithId extends Page {
  id: string
}

export type Pages = Record<string, Page>; // pageId: Page

export type TodosState = {
  byPageId: Record<string, Todo[]>;
  pages: Pages
  curPageId: string;
  curEditingTodoId?: string;
};

//TODO change the initial state once api is connected
export const initialState: TodosState = {
  byPageId: {
    "0": [
      { id: "0", name: "example0", color: "red", pageId: "0", due: new Date(Date.now()), completed: false },
      { id: "1", name: "example1", color: "yellow", pageId: "0", due: new Date(Date.now()), completed: false },
    ],
  },
  pages: {
    "0": {name: "groceries", sortKey: "due", sortOrder: "asc"},
    "1": {name: "job related", sortKey: "due", sortOrder: "asc"}
  },
  curPageId: "0",
  curEditingTodoId: ""
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Record<string, Todo[]>>) => {
      state.byPageId = action.payload;
    },
    todoAdded: (state, action: PayloadAction<Todo>) => {
      if(!action.payload.name) return;
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
    pageAdded: (state, action: PayloadAction<PageWithId>) => {
      if (action.payload) {
        const { name, sortKey, sortOrder, id } = action.payload;
        state.byPageId[id] = [];
        state.pages[id] = { name: name, sortKey: sortKey, sortOrder: sortOrder };
        state.curPageId = id.toString();
      }
    },
    pageRemoved: (state, action: PayloadAction<string>) => {
      if (state.byPageId[action.payload])
        delete state.byPageId[action.payload];
      if (state.curPageId === action.payload) {
        state.curPageId = "";
        //TODO either implement previous page state or assign this to the first page
      }
      if (state.pages[action.payload])
        delete state.pages[action.payload];
    },
    pageRenamed: (state, action: PayloadAction<[string, string]>) => {
      const [pageId, newName] = action.payload
      if (pageId && newName)
        state.pages[pageId].name = newName;
      else {
        console.log('either pageId or newName is empty')
      }
    },
    setCurPage: (state, action: PayloadAction<string>) => {
      state.curPageId = action.payload;
    },
    setCurEditingTodoId: (state, action: PayloadAction<string>) => {
      state.curEditingTodoId = action.payload;
    },
    sortByKey: (state, action: PayloadAction<[string, SortProps]>) => {
      const [pageId, {key, order}] = action.payload;
      if (state.pages[pageId]) {
        state.pages[pageId].sortKey = key
        state.pages[pageId].sortOrder = order
      }
    },
  },
});

export const {
  setTodos,
  todoAdded,
  todoRemoved,
  todoUpdated,
  pageAdded,
  pageRemoved,
  pageRenamed,
  setCurPage,
  setCurEditingTodoId,
  sortByKey,
} = todoSlice.actions;
export default todoSlice.reducer;
