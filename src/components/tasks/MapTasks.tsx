import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  doneTaskAsyncThunk,
  fileTaskAsyncThunk,
  getTaskAsyncThunk,
} from "../../store/modules/tasksSlice";
import "../../styles/animation/animationTask.css";
import "../../styles/animation/filterTasks.css";
import {
  MapTasksProps,
  customCardValuesMapProps,
} from "../../types/Interfaces";
import { TTask } from "../../types/Types";
import CustomCard from "../CustomCard";
import BtnDelete from "./BtnDelete";
import BtnEdit from "./BtnEdit";
import CheckBoxDone from "./CheckBoxDone";
import FileTask from "./FileTask";

export default function MapTasks({ tasks, user }: MapTasksProps) {
  const [CustomCardValues, setCustomCardValues] =
    useState<customCardValuesMapProps>({
      idTask: "",
      title: "",
      message: "",
      type: "EDIT",
      typeFunction: null,
      open: false,
    });
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    title: { active: false, value: "" },
    completed: { active: false },
    archived: { active: false },
  });

  useEffect(() => {
    //verifica se o "pesquisar" do filtro esta vazio e desativa ele
    if (filters.title.value === "") {
      setFilters({
        ...filters,
        title: { ...filters.title, active: false },
      });
    }
  }, [filters.title.value.length]);

  const applyFilters = () => {
    //se algum filtro estiver ativo, faça o filtro na linha seguinte
    return tasks.filter((task) => {
      const titleFilter =
        !filters.title.active || task.title.includes(filters.title.value);
      const completedFilter = !filters.completed.active || task.done === "DONE";
      const archivedFilter = !filters.archived.active || task.file === "FILED";

      // verefica se todos os filtros estão desativados
      const allFiltersDisabled =
        !filters.title.active &&
        !filters.completed.active &&
        !filters.archived.active;

      // Retorne todas as tarefas não arquivadas quando todos os filtros estiverem desativados
      if (allFiltersDisabled) {
        return task.file !== "FILED";
      }
      return titleFilter && completedFilter && archivedFilter;
    });
  };

  const filteredTasks = applyFilters();

  const handleChange = (type: string, idTask: string, positionTask: number) => {
    const updatedTasks = [...filteredTasks];
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
      <div className={!CustomCardValues.open ? "hidden" : ""}>
        <CustomCard
          idTask={CustomCardValues.idTask!}
          idUser={user.id}
          _type={CustomCardValues.type}
          title={CustomCardValues.title}
          message={CustomCardValues.message}
          param={CustomCardValues.typeFunction}
          handleClose={() => {
            setCustomCardValues({
              ...CustomCardValues,
              idTask: "",
              message: "",
              open: false,
              title: "",
              typeFunction: null,
            });
          }}
        />
      </div>
      <div>
        <div className="customCheckBoxHolder justify-center space-y-10">
          <input
            className="customCheckBoxInput hidden"
            id="cCB1"
            type="checkbox"
            checked={filters.title.active}
            onChange={() => {}}
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
                    <div className="flex  relative items-center  bg-gray-100 border-2   rounded-xl">
                      <div className="pl-1">
                        <CheckBoxDone
                          checked={task.done === "DONE" ? true : false}
                          idTask={task.id}
                          handleChange={() => {
                            handleChange("completed", task.id, index);
                          }}
                        />
                      </div>
                      <div className="  pl-5 p-5  w-full font-bold relative h-auto">
                        <p
                          className={task.done === "DONE" ? "line-through" : ""}
                        >
                          {task.title}
                        </p>
                        <p
                          style={{ animationDelay: "100ms" }}
                          className={
                            task.done === "DONE"
                              ? "line-through break-words"
                              : "break-words"
                          }
                        >
                          {task.message}
                        </p>
                      </div>
                      <div>
                        <div className="absolute top-2 right-5">
                          <FileTask
                            checked={task.file === "FILED" ? true : false}
                            idTask={task.id}
                            handleChange={() => {
                              handleChange("archived", task.id, index);
                            }}
                          />
                        </div>
                        <div className="flex flex-wrap gap-8 bottom-4 right-5 absolute">
                          <BtnEdit
                            handleFunction={() => {
                              setCustomCardValues({
                                ...CustomCardValues,
                                idTask: task.id,
                                message: task.message,
                                open: true,
                                title: task.title,
                                typeFunction: "EDIT",
                                type: "EDIT",
                              });
                            }}
                          />
                          <BtnDelete
                            handleFunction={() => {
                              setCustomCardValues({
                                ...CustomCardValues,
                                idTask: task.id,
                                message: `Deseja deletar o recado: ${task.message}?`,
                                open: true,
                                type: "ALERT",
                                title: "Deletar Tarefa.",
                                typeFunction: "DELET",
                              });
                            }}
                          />
                        </div>
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
