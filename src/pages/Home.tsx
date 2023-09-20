import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import CreateTask from "../components/tasks/CreateTask";
import MapTasks from "../components/tasks/MapTasks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getTaskAsyncThunk, taskAdapter } from "../store/modules/tasksSlice";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  const tasks = useAppSelector(taskAdapter.selectAll);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.id) {
      dispatch(getTaskAsyncThunk(user.id));
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <NavBar user={user} />
      <main className="h-screen w-full flex flex-col item-center">
        <div className="flex flex-col justify-center  mt-20">
          <CreateTask user={user} />
          <MapTasks tasks={tasks} user={user} />
        </div>
      </main>
    </>
  );
}
