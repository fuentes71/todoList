import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../service/api";
import { RootState } from "../rootReducer";

export type TTask = {
    id: string,
    title: string,
    message: string,
    file: "NOTFILED" | "FILED",
    done: "PRODUCTION" | "DONE",
}

export type TCreateTask = Omit<TTask, 'id' | 'file' | 'done'>;

type TRequestTask = {
  idUser:string
  task: TCreateTask
}

type TUserTask = {
  idUser: string,
  idTask: string,
}
const adapter = createEntityAdapter<TTask>({
    selectId: (task) => task.id,
  });

 
  export const createTaskAsyncThunk = createAsyncThunk('tasks/createTask', async ({idUser, task}:TRequestTask) => {
    const response = await axios.post(`/tasks/${idUser}`,task);
    return response;
  });
  
  export const getTaskAsyncThunk = createAsyncThunk("tasks/getTask",async (id: string)=>{
    const response = await axios.get(`/tasks/${id}`)
    return response.data;
    })

    export const deleteTaskAsyncThunk = createAsyncThunk("tasks/delete",async({idUser,idTask}:TUserTask)=>{
  const response = await axios.delete(`/tasks/${idUser}/${idTask}`);
  return response.data
})

export const doneTaskAsyncThunk = createAsyncThunk("tasks/done",async({idUser,idTask}:TUserTask)=>{
  const response = await axios.put(`/tasks/done/${idUser}/${idTask}`);
  return response.data
})
export const fileTaskAsyncThunk = createAsyncThunk("tasks/done",async({idUser,idTask}:TUserTask)=>{
  const response = await axios.put(`/tasks/file/${idUser}/${idTask}`);
  return response.data
})

  const slice = createSlice({
    name: 'tasks',
    initialState: adapter.getInitialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(createTaskAsyncThunk.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload.data);
      });
      builder.addCase(getTaskAsyncThunk.fulfilled, (state, action) => {
        adapter.setAll(state, action.payload);
      });

      builder.addCase(deleteTaskAsyncThunk.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload);
      });
      // builder.addCase(doneTaskAsyncThunk.fulfilled, (state, action) => {
      //   console.log(state,action.payload);
        
      //   adapter.updateOne(state, action.payload);
      // });
      builder.addCase(fileTaskAsyncThunk.fulfilled, (state, action) => {
        console.log(state,action.payload);
        
        adapter.updateOne(state, action.payload);
      });
      // builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      //   console.log(payload);
  
      //   adapter.updateOne(state, { id: payload.id, changes: payload.task });
      // });

    },
  });

  export const tasksReducer = slice.reducer;
export const taskAdapter = adapter.getSelectors<RootState>((state) => state.tasks);