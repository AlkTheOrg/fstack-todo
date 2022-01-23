import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  token: string;
  name: string;
  id: string;
};

export const initialState: AuthState = {
  token: "",
  name: "",
  id: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (_, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
    resetAuth: (_) => { return initialState}
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
