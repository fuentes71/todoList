import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTaskAsyncThunk, taskAdapter } from "../../store/modules/tasksSlice";
import "../../styles/animation/animationTask.css";
import CheckBoxDone from "./CheckBoxDone";
import FileTask from "./FileTask";
export default function MapTasks() {
  const user = useAppSelector((state) => state.user);
  const tasks = useAppSelector(taskAdapter.selectAll);
  const dispatch = useAppDispatch();
  useEffect(() => {
    handleTasks();
  }, [tasks.length]);
  const handleTasks = () => {
    dispatch(getTaskAsyncThunk(user.id));
  };
  return (
    <>
      <div className="flex flex-col items-center  justify-center w-100 h-100  ">
        <div>
          <h1 className=" text-[18px] font-bold tracking-wider inset-x-0 text-center">
            Lista de Recados
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tasks?.map((task) => {
            return (
              <div key={task.id}>
                <div className="div-task relative">
                  <div className="flex justify-center  items-center bg-gray-100 border-2  rounded-xl">
                    <div className="pl-1">
                      <CheckBoxDone
                        // isDone={task.done === "DONE" ? true : false}
                        id={user.id}
                        checkTask={task.done}
                        idTask={task.id}
                      />
                    </div>
                    <div
                      onClick={() => {
                        console.log(task);
                      }}
                      className=" pl-4 p-10 flex justify-center items-start rounded-xl flex-col w-full font-bold  h-12"
                    >
                      {task.done === "DONE" ? (
                        <>
                          <p
                            style={{
                              wordBreak: "break-word",
                              animationDelay: "50ms",
                            }}
                            className="line-through "
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
                    <div className=" absolute right-5 top-2 ">
                      <FileTask
                        id={user.id}
                        fileTask={task.id}
                        isDone={task.file}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
