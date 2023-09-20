import { TUser } from "./Types";

interface CreateTaskProps {
  user: TUser;
}

interface BtnProps {
  handleFunction: () => void;
}

interface checkBoxProps {
  checked: boolean;
  idTask: string;
  handleChange(type: string, idTask: string): void;
}
interface FilterTasksProps {
  handleChangeFilter: (type: string, value?: string) => void;
}
interface CustomCardProps {
  idTask: string;
  idUser: string;
  type: "ALERT" | "EDIT";
  title: string;
  message: string;
  param: "LOGOUT" | "DELET" | "EDIT" | null;
  handleClose: () => void;
}
export type {
  BtnProps,
  CreateTaskProps,
  CustomCardProps,
  FilterTasksProps,
  checkBoxProps,
};
