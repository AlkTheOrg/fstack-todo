import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { AxiosError } from "axios";

export type User = {
  id: string;
  username: string;
  email: string;
};

export type UnregisteredUser = {
  username: string;
  email: string;
  password: string;
};

export type UserLogin = {
  username: string;
  password: string
}

export type AuthState = {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

export const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export interface ValidationErrors {
  message: string
}
// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user: UnregisteredUser, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      // error.response.data is the action.payload for a rejected action.
      let err = error as AxiosError<ValidationErrors>;
      if (!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserLogin, thunkAPI) => {
    try {
      console.log('login dispatched')
      return await authService.login(user);
    } catch(err) {
      let error = err as AxiosError<ValidationErrors>;
      if (!error.response) throw err;
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
})

export const remove = createAsyncThunk(
  "user/remove",
  async (userId: string, thunkAPI) => {
    try {
      console.log('login dispatched')
      return await authService.remove(userId);
    } catch(err) {
      let error = err as AxiosError<ValidationErrors>;
      if (!error.response) throw err;
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export type UpdateUser = {
  userId: string,
  user: UserLogin
}

export const update = createAsyncThunk(
  "user/update",
  async ({ userId, user }: UpdateUser, thunkAPI) => {
    try {
      console.log('update user dispatched')
      return await authService.update(userId, user);
    } catch(err) {
      let error = err as AxiosError<ValidationErrors>;
      if (!error.response) throw err;
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      console.log('setUser:', action.payload);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload && typeof action.payload === 'string') {
          state.message = action.payload;
        }
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload && typeof action.payload === 'string') {
          state.message = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(remove.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(remove.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        authSlice.caseReducers.reset(state);
      })
      .addCase(remove.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload && typeof action.payload === 'string') {
          state.message = action.payload;
        }
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state) => {
        state.isLoading = false;
        state.message = 'Your profile has been updated';
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload && typeof action.payload === 'string') {
          state.message = action.payload;
        }
      })
  },
});

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
