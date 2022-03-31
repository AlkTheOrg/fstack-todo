import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todosReducer from "../slices/todoSlice";
import authReducer from "../slices/authSlice";
import pageSettingsReducer from "../slices/pageSettingsSlice";

export const store = configureStore({
  reducer: {
    todo: todosReducer,
    auth: authReducer,
    pageSettings: pageSettingsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
