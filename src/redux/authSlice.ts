import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

type UserData = {
  email: string;
  password: string;
  token: any;
};

const initialState: AuthState = {
  token: null,
  isLoading: false,
  error: null,
};

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password, token }: UserData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Failed to sign in');

      const data = await response.json();

      if (token && data.token) {
        token(data.token);
      }

      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
