import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todosReducer from "../slices/todoSlice";
import authReducer from "../slices/authSlice";
import pageSettingsReducer from "../slices/pageSettingsSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  todo: todosReducer,
  auth: authReducer,
  pageSettings: pageSettingsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
