import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../service/api";
import { TCreate, TLogin, TUser } from "../../types/Types";
import { setAlert } from "./alertSlice";

export const singUpAsyncThunk = createAsyncThunk(
  "userLogged/createUser",
  async (data: TCreate, { dispatch }) => {
    try {
      const response = await axios.post("/accounts/singup", data);
      dispatch(
        setAlert({
          msg: "Conta criada com sucesso.",
          type: "success",
        })
      );
      return response;
    } catch (error) {
      return dispatch(
        setAlert({
          msg: "Esta conta já existe.",
          type: "error",
        })
      );
    }
  }
);

export const loginAsyncThunk = createAsyncThunk(
  "userLogged/login",
  async (data: TLogin, { dispatch }) => {
    try {
      const response = await axios.post("/accounts/login", data);
      return response;
    } catch (error) {
      dispatch(
        setAlert({
          msg: "Esta conta não existe.",
          type: "error",
        })
      );
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    name: "",
    loading: false,
  } as TUser,
  reducers: {
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(singUpAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(singUpAsyncThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(singUpAsyncThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.data.id;
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
      })
      .addCase(loginAsyncThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
