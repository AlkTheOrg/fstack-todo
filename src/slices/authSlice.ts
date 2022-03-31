import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  name: string,
  email: string,
}

export type AuthState = {
  token: string;
  user: User
};

export const initialState: AuthState = {
  token: "",
  user: {
    name: "",
    email: "",
  }
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
