import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import todoService, { CreateTodoPage, DeleteTodoPage, UpdateTodoPage } from "../services/todoService";
import { AxiosError } from "axios";
import { ValidationErrors } from "./authSlice";
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

export const initialState: TodosState = {
  byPageId: {
    // "0": [
    //   { id: "0", name: "example0", color: "red", pageId: "0", due: new Date(Date.now()), completed: false },
    //   { id: "1", name: "example1", color: "yellow", pageId: "0", due: new Date(Date.now()), completed: false },
    // ],
  },
  pages: {
    // "0": {name: "groceries", sortKey: "due", sortOrder: "asc"},
    // "1": {name: "job related", sortKey: "due", sortOrder: "asc"}
  },
  // curPageId: "0",
  curPageId: "",
  curEditingTodoId: ""
};

export const removePage = createAsyncThunk(
  "todoPage/remove",
  async (deleteParams: DeleteTodoPage, thunkAPI) => {
    try {
      console.log("todoPage/remove dispatched");
      return await todoService.deleteTodoPage(deleteParams);
    } catch (error) {
      let err = error as AxiosError<ValidationErrors>;
      if (!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const createPage = createAsyncThunk(
  "todoPage/create",
  async (createParams: CreateTodoPage, thunkAPI) => {
    try {
      console.log('todoPage/create dispatched');
      return await todoService.createTodoPage(createParams);
    } catch (error) {
      let err = error as AxiosError<ValidationErrors>;
      if (!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
)

export const updatePage = createAsyncThunk(
  "todoPage/update",
  async (updateParams: UpdateTodoPage, thunkAPI) => {
    try {
      console.log("todoPage/update dispatched");
      return await todoService.updateTodoPage(updateParams);
    } catch (error) {
      let err = error as AxiosError<ValidationErrors>;
      if (!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

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
    pageUpdated: (state, action: PayloadAction<[string, Partial<Page>]>) => {
      const [pageId, partialPage] = action.payload;
      state.pages[pageId] = { ...state.pages[pageId], ...partialPage };
    },
    setCurPage: (state, action: PayloadAction<string>) => {
      state.curPageId = action.payload;
    },
    setCurEditingTodoId: (state, action: PayloadAction<string>) => {
      state.curEditingTodoId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removePage.pending, (state, action) => {
        const { tpId } = action.meta.arg;
        todoSlice.caseReducers.pageRemoved(state, {...action, payload: tpId})
        console.log('removePage pending:', action.meta.arg);
      })
      .addCase(removePage.fulfilled, (state, action) => {
        console.log('removePage fulfilled:', action.payload);
      })
      .addCase(createPage.pending, (state, action) => {

      })
      .addCase(createPage.fulfilled, (state, action) => {
        
      })
      .addCase(updatePage.pending, (state, action) => {
        const { tpId, todoPage } = action.meta.arg;
        todoSlice.caseReducers.pageUpdated(state, { ...action, payload: [tpId, todoPage] })
        console.log('updatePage pending:', action.meta.arg);
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        console.log('updatePage fulfilled:', action.payload);
      })
  }
});

export const {
  setTodos,
  todoAdded,
  todoRemoved,
  todoUpdated,
  pageAdded,
  pageRemoved,
  pageUpdated,
  setCurPage,
  setCurEditingTodoId,
} = todoSlice.actions;
export default todoSlice.reducer;
