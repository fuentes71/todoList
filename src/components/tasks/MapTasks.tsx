import { useEffect, useState } from "react";
import "../../styles/animation/animationTask.css";
import "../../styles/animation/filterTasks.css";

import { useAppDispatch } from "../../store/hooks";
import {
  TTask,
  doneTaskAsyncThunk,
  fileTaskAsyncThunk,
  getTaskAsyncThunk,
} from "../../store/modules/tasksSlice";
import { TUser } from "../../store/modules/userSlice";
import CheckBoxDone from "./CheckBoxDone";
import FileTask from "./FileTask";
import ViewTask from "./ViewTask";

interface MapTasksProps {
  tasks: TTask[];
  user: TUser;
}
export default function MapTasks({ tasks, user }: MapTasksProps) {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState({
    title: { active: false, value: "" },
    completed: { active: false },
    archived: { active: false },
  });

  useEffect(() => {
    if (filters.title.value === "") {
      setFilters({
        ...filters,
        title: { ...filters.title, active: false },
      });
    }
  }, [filters.title.value.length]);

  const applyFilters = () => {
    return tasks.filter((task) => {
      const titleFilter =
        !filters.title.active || task.title.includes(filters.title.value);
      const completedFilter = !filters.completed.active || task.done === "DONE";
      const archivedFilter = !filters.archived.active || task.file === "FILED";

      return titleFilter && completedFilter && archivedFilter;
    });
  };

  const filteredTasks = applyFilters();

  const handleChange = (type: string, idTask: string, positionTask: number) => {
    const updatedTasks = [...filteredTasks]; // Crie uma cópia do array de tasks

    if (type === "completed") {
      updatedTasks[positionTask] = {
        ...updatedTasks[positionTask],
        done:
          updatedTasks[positionTask].done === "DONE" ? "PRODUCTION" : "DONE",
      };
      dispatch(doneTaskAsyncThunk({ idUser: user?.id, idTask }));
    } else if (type === "archived") {
      updatedTasks[positionTask] = {
        ...updatedTasks[positionTask],
        file:
          updatedTasks[positionTask].file === "FILED" ? "NOTFILED" : "FILED",
      };
      dispatch(fileTaskAsyncThunk({ idUser: user?.id, idTask }));
    }

    dispatch(getTaskAsyncThunk(user?.id));
  };

  return (
    <>
      <div>
        <div className="customCheckBoxHolder justify-center space-y-10">
          <input
            className="customCheckBoxInput hidden"
            id="cCB1"
            type="checkbox"
            checked={filters.title.active}
          />
          <label className="customCheckBoxWrapper" htmlFor="cCB1">
            <div className="customCheckBox">
              <input
                type="text"
                className="w-full max-w-[160px] bg-transparent  pl-2  font-semibold border-e-transparent "
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    title: { active: true, value: e.target.value },
                  });
                }}
              />
              <div className="inner absolute">
                {filters.title.value === "" ? "Pesquisar" : ""}
              </div>
            </div>
          </label>

          <input
            className="customCheckBoxInput hidden"
            id="cCB2"
            type="checkbox"
            onChange={(e) =>
              setFilters({
                ...filters,
                completed: { ...filters.completed, active: e.target.checked },
              })
            }
          />
          <label className="customCheckBoxWrapper" htmlFor="cCB2">
            <div className="customCheckBox">
              <div className="inner">Concluidas</div>
            </div>
          </label>

          <input
            className="customCheckBoxInput hidden"
            id="cCB3"
            type="checkbox"
            onChange={(e) =>
              setFilters({
                ...filters,
                archived: { ...filters.archived, active: e.target.checked },
              })
            }
          />
          <label className="customCheckBoxWrapper" htmlFor="cCB3">
            <div className="customCheckBox">
              <div className="inner">Arquivadas</div>
            </div>
          </label>
        </div>
        <div className="flex flex-col items-center  justify-center w-100 h-100  ">
          <div>
            <h1 className=" text-[18px] font-bold tracking-wider inset-x-0 text-center">
              Lista de Recados
            </h1>
          </div>
          <div className="grid  md:grid-cols-1  gap-4  w-3/5">
            {filteredTasks.map((task: TTask, index) => {
              return (
                <div key={task.id}>
                  <div className="div-task relative w-full ">
                    <div className="flex justify-center relative items-center  bg-gray-100 border-2   rounded-xl">
                      <div className="pl-1   ">
                        <CheckBoxDone
                          checked={task.done === "DONE" ? true : false}
                          idTask={task.id}
                          handleChange={() => {
                            handleChange("completed", task.id, index);
                          }}
                        />
                      </div>
                      <div className="  pl-4 p-10 flex justify-center items-start rounded-xl flex-col w-full font-bold  h-24">
                        {task.done === "DONE" ? (
                          <>
                            <p
                              style={{
                                wordBreak: "break-word",
                                animationDelay: "50ms",
                              }}
                              className=" line-through "
                            >
                              {task.title}
                            </p>
                          </>
                        ) : (
                          <p
                            style={{
                              wordBreak: "break-word",
                              animationDelay: "50ms",
                            }}
                          >
                            {task.title}
                          </p>
                        )}
                      </div>
                      <div className=" absolute right-5 top-2">
                        <FileTask
                          checked={task.file === "FILED" ? true : false}
                          idTask={task.id}
                          handleChange={() => {
                            handleChange("archived", task.id, index);
                          }}
                        />
                      </div>

                      <div className=" absolute right-1 bottom-2 ">
                        <ViewTask
                          handleChange={function (id: string): void {
                            throw new Error("Function not implemented.");
                          }}
                          id={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
