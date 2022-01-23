import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../slices/todoSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    todo: todosReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
