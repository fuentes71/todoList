//alertSlice
type TFeedback = {
  msg: string;
  type: "error" | "success" | "info";
  show: boolean;
};

//tasksSlice
type TTask = {
  id: string;
  title: string;
  message: string;
  file: "NOTFILED" | "FILED";
  done: "PRODUCTION" | "DONE";
};

type TCreateTask = Omit<TTask, "id" | "file" | "done">;
type TRequestTask = {
  idUser: string;
  task: TCreateTask;
};
type TUserTask = {
  idUser: string;
  idTask: string;
};
type TGetTask = {
  id: string;
  title?: string | null;
  file?: "FILED" | "NOTFILED" | null;
  done?: "PRODUCTION" | "DONE" | null;
};

//userSlice
type TUser = {
  id: string;
  email: string;
  name: string;
  loading: boolean;
};
type TCreate = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
};
type TLogin = {
  email: string;
  password: string;
};
export type {
  TCreate,
  TCreateTask,
  TFeedback,
  TGetTask,
  TLogin,
  TRequestTask,
  TTask,
  TUser,
  TUserTask,
};
