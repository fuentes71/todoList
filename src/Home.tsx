import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import FilterTasks from "./components/FilterTasks";
import MapTasks from "./components/MapTasks";
import NavBar from "./components/navBar";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getTaskAsyncThunk } from "./store/modules/tasksSlice";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  // const tasks = useAppSelector(taskAdapter.selectAll);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);

    if (!user.id) {
      navigate("/");
    }
    dispatch(getTaskAsyncThunk(user.id));
  }, [user]);

  const handleTitle = (title: boolean) => {
    console.log(title);

    return title;
  };
  const handleDone = (done: boolean) => {
    console.log(done);

    return done;
  };
  const handleFile = (file: boolean) => {
    console.log(file);

    return file;
  };

  return (
    <>
      {/* <main className="h-100 w-full flex-col flex items-center justify-center  "> */}
      <NavBar />
      <main className="h-screen w-full flex flex-col item-center">
        <div className="flex flex-col justify-center  mt-20">
          <CreateTask />
          <FilterTasks
            handleTitle={handleTitle}
            handleDone={handleDone}
            handleFile={handleFile}
          />
          <MapTasks />
        </div>
      </main>
    </>
  );
}
