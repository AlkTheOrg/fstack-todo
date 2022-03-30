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
};

export type SortKey = {
  key: "name" | "due",
  order: "asc" | "desc",
}

export type Pages = Record<string, string>; // pageId: name

// export type TodosByPageId = {
//   [page: string]: Todo[];
// };

export type TodosState = {
  // byPageId: TodosByPageId;
  byPageId: Record<string, Todo[]>;
  pages: Pages
  curPageId: string;
  curEditingTodoId?: string;
};

export const initialState: TodosState = {
  byPageId: {
    "0": [
      { id: "0", name: "example0", color: "red", pageId: "0", due: new Date(Date.now()) },
      { id: "1", name: "example1", color: "yellow", pageId: "0", due: new Date(Date.now()) },
    ],
  },
  pages: {
    "0": "groceries",
    "1": "job related"
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
    pageAdded: (state, action: PayloadAction<string>) => {
      //TODO replace randId with id returned from backend
      if (action.payload) {
        const randId = Math.floor(Math.random() * 100) + 100
        state.byPageId[randId] = [];
        state.pages[randId] = action.payload;
        state.curPageId = randId.toString();
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
        state.pages[pageId] = newName;
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
    sortByKey: (state, action: PayloadAction<SortKey>) => {
      const { key, order } = action.payload;
      const [val1, val2] = order === 'desc' ? [1, -1] : [-1, 1]
      state.byPageId[state.curPageId].sort((a, b) => {
        let x = a[key]; let y = b[key];
        return ((x < y) ? val1 : ((x > y) ? val2 : 0));
      })
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
