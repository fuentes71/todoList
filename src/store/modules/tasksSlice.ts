import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { axios } from "../../service/api";
import { RootState } from "../rootReducer";

export type TTask = {
  id: string;
  title: string;
  message: string;
  file: "NOTFILED" | "FILED";
  done: "PRODUCTION" | "DONE";
};

export type TCreateTask = Omit<TTask, "id" | "file" | "done">;
export type TRequestTask = {
  idUser: string;
  task: TCreateTask;
};
export type TUserTask = {
  idUser: string;
  idTask: string;
};
export type TGetTask = {
  id: string;
  title?: string | null;
  file?: "FILED" | "NOTFILED" | null;
  done?: "PRODUCTION" | "DONE" | null;
};

export const adapter = createEntityAdapter<TTask>({
  selectId: (task) => task.id,
});

export const createTaskAsyncThunk = createAsyncThunk(
  "tasks/createTask",
  async ({ idUser, task }: TRequestTask, { dispatch }) => {
    const response = await axios.post(`/tasks/${idUser}`, task);

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
  async (id: string) => {
    try{

      const response = await axios.get(`/tasks/${id}`);
      return response.data;
    }catch(err){

    }finally{
      
    }
  }
);

export const doneTaskAsyncThunk = createAsyncThunk(
  "tasks/done",
  async ({ idUser, idTask }: TUserTask, { dispatch }) => {
    const response = await axios.put(`/tasks/done/${idUser}/${idTask}`);
    dispatch(getTaskAsyncThunk(idUser));
    return response.data ;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: adapter.getInitialState(),
  reducers: {
    updateTask: adapter.updateOne
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
