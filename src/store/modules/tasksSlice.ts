import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { axios } from "../../service/api";
import { TCreateTask, TRequestTask, TTask, TUserTask } from "../../types/Types";
import { RootState } from "../rootReducer";
import { logout } from "./userSlice";

export const adapter = createEntityAdapter<TTask>({
  selectId: (task) => task.id,
});

export const createTaskAsyncThunk = createAsyncThunk(
  "tasks/createTask",
  async ({ idUser, task }: TRequestTask, { dispatch }) => {
    const response = await axios.post(`/tasks/${idUser}`, task);
    dispatch(getTaskAsyncThunk(idUser));

    return response.data;
  }
);

export const deleteTaskAsyncThunk = createAsyncThunk(
  "tasks/delete",
  async ({ idUser, idTask }: TUserTask, { dispatch }) => {
    const response = await axios.delete(`/tasks/${idUser}/${idTask}`);
    dispatch(getTaskAsyncThunk(idUser));
    return response.data;
  }
);

export const fileTaskAsyncThunk = createAsyncThunk(
  "tasks/file",
  async ({ idUser, idTask }: TUserTask, { dispatch }) => {
    const response = await axios.put(`/tasks/file/${idUser}/${idTask}`);
    dispatch(getTaskAsyncThunk(idUser));
    return response.data;
  }
);

export const updateTaskAsyncThunk = createAsyncThunk(
  "tasks/update",
  async (
    { idUser, idTask, task }: TUserTask & TCreateTask & TRequestTask,
    { dispatch }
  ) => {
    const response = await axios.put(`/tasks/${idUser}/${idTask}`, task);
    dispatch(getTaskAsyncThunk(idUser));
    return { id: idTask, changes: response.data };
  }
);

export const getTaskAsyncThunk = createAsyncThunk(
  "tasks/getTask",
  async (id: string, { dispatch }) => {
    try {
      const response = await axios.get(`/tasks/${id}`);
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 400) {
        dispatch(logout());
      }
    } finally {
    }
  }
);

export const doneTaskAsyncThunk = createAsyncThunk(
  "tasks/done",
  async ({ idUser, idTask }: TUserTask, { dispatch }) => {
    const response = await axios.put(`/tasks/done/${idUser}/${idTask}`);
    dispatch(getTaskAsyncThunk(idUser));
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: adapter.getInitialState(),
  reducers: {
    updateTask: adapter.updateOne,
  },
  extraReducers(builder) {
    builder
      .addCase(createTaskAsyncThunk.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload);
      })

      .addCase(getTaskAsyncThunk.fulfilled, (state, action) => {
        adapter.setAll(state, action.payload);
      })
      .addCase(deleteTaskAsyncThunk.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload);
      })
      .addCase(doneTaskAsyncThunk.fulfilled, (state, action) => {
        adapter.updateOne(state, action.payload);
      })
      .addCase(fileTaskAsyncThunk.fulfilled, (state, action) => {
        adapter.updateOne(state, action.payload);
      });
  },
});

export const { updateTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const taskAdapter = adapter.getSelectors<RootState>(
  (state) => state.tasks
);

export default tasksSlice;
