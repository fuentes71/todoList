import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAlert } from "../store/modules/alertSlice";
import {
  TCreateTask,
  createTaskAsyncThunk,
  getTaskAsyncThunk,
} from "../store/modules/tasksSlice";
import "../styles/animation/inputAnimation.css";
const schemaTask = z.object({
  title: z.string().min(6, "minimo de 6 caracteres."),
  message: z.string().min(3, "minimo de 3 caracteres."),
});

type TTask = z.infer<typeof schemaTask>;

export default function CreateTask() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [task, setTask] = useState<TCreateTask>({ title: "", message: "" });
  const {
    formState: { errors },
  } = useForm<TTask>({
    resolver: zodResolver(schemaTask),
  });

  const resetForm = () => setTask({ title: "", message: "" });
  const handleSave = () => {
    dispatch(
      createTaskAsyncThunk({
        idUser: user.id,
        task,
      })
    );
    resetForm();
    dispatch(getTaskAsyncThunk(user.id));

    dispatch(
      setAlert({
        msg: "Recado criado com sucesso!",
        type: "success",
      })
    );
  };

  return (
    <>
      <div className="flex flew-row mt-5 space-x-10 justify-center ">
        <form className="space-y-5  flex flex-row space-x-3">
          <div className="relative">
            {errors.title && (
              <span
                className="absolute w-full block text-red-500"
                style={{ top: "-30px" }}
              >
                {errors.message?.message}
              </span>
            )}
          </div>
          <div className="form-control  ">
            <input
              id="title"
              type="text"
              required
              className="rounded-md py-1.5 bg-transparent"
              value={task.title}
              onChange={(e) =>
                setTask((state) => ({ ...state, title: e.target.value }))
              }
            />{" "}
            <label>
              <span style={{ transitionDelay: "300ms" }}>T</span>
              <span style={{ transitionDelay: "250ms" }}>i</span>
              <span style={{ transitionDelay: "200ms" }}>t</span>
              <span style={{ transitionDelay: "150ms" }}>u</span>
              <span style={{ transitionDelay: "50ms" }}>l</span>
              <span style={{ transitionDelay: "0ms" }}>o</span>
            </label>
          </div>

          <div className="form-control ">
            <input
              id="message"
              type="text"
              value={task.message}
              required
              className=" rounded-md border-0 py-1.5 bg-transparent "
              onChange={(e) =>
                setTask((state) => ({ ...state, message: e.target.value }))
              }
            />{" "}
            <label>
              <span style={{ transitionDelay: "400ms" }}>D</span>
              <span style={{ transitionDelay: "350ms" }}>e</span>
              <span style={{ transitionDelay: "300ms" }}>s</span>
              <span style={{ transitionDelay: "250ms" }}>c</span>
              <span style={{ transitionDelay: "200ms" }}>r</span>
              <span style={{ transitionDelay: "150ms" }}>i</span>
              <span style={{ transitionDelay: "100ms" }}>ç</span>
              <span style={{ transitionDelay: "50ms" }}>ã</span>
              <span style={{ transitionDelay: "0ms" }}>o</span>
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={handleSave}
              className="mt-5 rounded-md bg-gray-900 hover:rgb(173, 216, 230 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
