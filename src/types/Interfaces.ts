import { TTask, TUser } from "./Types";
interface MapTasksProps {
  tasks: TTask[];
  user: TUser;
}

interface customCardValuesMapProps {
  idTask?: string;
  title: string;
  message: string;
  type: "EDIT" | "ALERT";
  typeFunction: "LOGOUT" | "DELET" | "EDIT" | null;
  open: boolean;
}
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
  _type: "ALERT" | "EDIT";
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
  MapTasksProps,
  checkBoxProps,
  customCardValuesMapProps,
};
