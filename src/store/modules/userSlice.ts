import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../service/api";
import { setAlert } from "./alertSlice";
type TLogin = {
  email: string;
  password: string;
};

type TUser = {
  id: string;
  email: string;
  name: string;
};

// type TTask = {
//     id:string,
//     title: string,
//     message: string,
//     file: "NOTFILED" | "FILED",
//     done: "DONE" | "PRODUCTION",
// }

type TCreate = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
};
export let loading = false;
export const singUpAsyncThunk = createAsyncThunk(
  "userLogged/createUser",
  async (data: TCreate, { dispatch }) => {
    try {
      loading = true
      const response = await axios.post("/accounts/singup", data);
      return response;
    } catch (error) {
      loading = false
      dispatch(
        setAlert({
          msg: "Está conta já existe.",
          type: "error",
        })
        );

          loading = false
        throw error;
    }
  }
);

export const loginAsyncThunk = createAsyncThunk(
  "userLogged/login",
  async (data: TLogin, { dispatch }) => {
    try {
      loading = true;
      const response = await axios.post("/accounts/login", data);

      return response;
    } catch (error) {
      loading = false;
      dispatch(
        setAlert({
          msg: "Esta conta não existe.",
          type: "error",
        })
      );
      throw error;
    } finally {
      loading = false;
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState: {} as TUser,
  reducers: {
    logout: (state) => {
      state.id = "";
    state.name = "";
    state.email = "";},
  },
  extraReducers: (builder) => {
    builder.addCase(singUpAsyncThunk.fulfilled, () => {
      window.location.href = "/";
    });
    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      state.id = action.payload.data.id;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;
    });
    
  },
});


export const userReducer = slice.reducer;
export const { logout } = slice.actions;
