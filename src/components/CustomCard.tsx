import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeAlert, setAlert } from "../store/modules/alertSlice";
import {
  deleteTaskAsyncThunk,
  updateTaskAsyncThunk,
} from "../store/modules/tasksSlice";
import { logout } from "../store/modules/userSlice";
import "../styles/animation/customCard.css";
import { CustomCardProps } from "../types/Interfaces";
import { TCreateTask } from "../types/Types";
import { TTask } from "../types/ZTypes";

export default function CustomCard({
  title,
  message,
  _type,
  param,
  handleClose,
  idTask,
  idUser,
}: CustomCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { msg, type } = useAppSelector((state) => state.alert);

  const [newTask, setNewTask] = useState<TCreateTask>({
    title: "",
    message: "",
  });
  const [error, setError] = useState<boolean>(false);

  const onSubmit = (data: TTask) => {
    if (!newTask.message.length || !newTask.title.length) {
      setError(!error);
      return dispatch(
        setAlert({
          msg: "Preencha todos os campos.",
          type: "error",
        })
      );
    }
    if (newTask.title.length <= 5) {
      setError(!error);
      return dispatch(
        setAlert({
          msg: "Titulo precisa ser maior ou igual a 6 caracteres.",
          type: "info",
        })
      );
    }
    if (newTask.message.length <= 5) {
      setError(!error);
      return dispatch(
        setAlert({
          msg: "Descriçao precisa ser maior ou igual a 6 caracteres.",
          type: "info",
        })
      );
    }
    setError(!error);

    dispatch(closeAlert());

    dispatch(
      updateTaskAsyncThunk({
        idTask: idTask,
        idUser: idUser,
        task: data,
        title: data.title,
        message: data.message,
      })
    );

    setNewTask({ title: "", message: "" });
    handleClose();
  };

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

  return (
    <>
      {_type == "ALERT" && (
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
      {_type == "EDIT" && (
        <div className="containerCard">
          <div className="form-container">
            {type === "error" && error ? (
              <span className=" text-red-500 font-bold">{msg}</span>
            ) : (
              ""
            )}
            {type === "info" && error ? (
              <span className=" text-yellow-500 font-bold">{msg}</span>
            ) : (
              ""
            )}
            <form className="form">
              <div className="form-group">
                <label htmlFor="email">Title:</label>
                <input
                  maxLength={20}
                  id="title"
                  type="text"
                  required
                  value={newTask.title}
                  placeholder={title}
                  onChange={(e) => {
                    setNewTask((state) => ({
                      ...state,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="textarea">Descriçao:</label>
                <textarea
                  id="message"
                  name="message"
                  maxLength={50}
                  rows={10}
                  cols={20}
                  value={newTask.message}
                  placeholder={message}
                  onChange={(e) => {
                    setNewTask((state) => ({
                      ...state,
                      message: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
              <div className="buttonContainer">
                <button
                  type="button"
                  className="acceptButton edit"
                  onClick={() => {
                    onSubmit(newTask);
                  }}
                >
                  Aceitar
                </button>
                <button
                  type="button"
                  className="declineButton"
                  onClick={() => {
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
