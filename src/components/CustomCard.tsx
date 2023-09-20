import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import {
  deleteTaskAsyncThunk,
  updateTaskAsyncThunk,
} from "../store/modules/tasksSlice";
import { logout } from "../store/modules/userSlice";
import "../styles/animation/customCard.css";
import { CustomCardProps } from "../types/Interfaces";
import { TTask, schemaTask } from "../types/ZTypes";

export default function CustomCard({
  title,
  message,
  type,
  param,
  handleClose,
  idTask,
  idUser,
}: CustomCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTask>({
    resolver: zodResolver(schemaTask),
  });

  const handleFunction = (value: boolean, typeFunction: string) => {
    if (typeFunction === "DELET" && value) {
      dispatch(
        deleteTaskAsyncThunk({
          idTask: idTask,
          idUser: idUser,
        })
      );
    }
    if (typeFunction === "LOGOUT" && value) {
      dispatch(logout());
      return navigate("/");
    }
  };

  const onSubmit = (data: TTask) => {
    console.log(errors);

    dispatch(
      updateTaskAsyncThunk({
        idTask: idTask,
        idUser: idUser,
        task: data,
        message: data.message,
        title: data.title,
      })
    );
  };

  return (
    <>
      {type == "ALERT" && (
        <div className=" containerCard">
          <div className="card">
            <div className="card-content">
              <p className="card-title">{title}</p>
              <p className="card-para">{message}</p>
              <div className="buttonContainer">
                <button
                  className="acceptButton"
                  onClick={() => {
                    handleFunction(true, param!), handleClose();
                  }}
                >
                  Aceitar
                </button>
                <button className="declineButton" onClick={handleClose}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {type == "EDIT" && (
        <div className="containerCard">
          <div className="form-container">
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault(), handleSubmit(onSubmit);
              }}
            >
              <div className="form-group">
                <label htmlFor="email">Title:</label>
                <input type="text" placeholder={title} {...register("title")} />
              </div>
              <div className="form-group">
                <label htmlFor="textarea">Descriçao:</label>
                <textarea
                  rows={10}
                  cols={20}
                  placeholder={message}
                  {...register("message")}
                ></textarea>
              </div>
              <div className="buttonContainer">
                <button
                  className="acceptButton edit"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Aceitar
                </button>
                <button
                  className="declineButton"
                  onClick={() => {
                    reset();
                    handleClose();
                  }}
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
