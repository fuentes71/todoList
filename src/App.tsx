import { Route, Routes } from "react-router-dom";
import LoadingAnimation from "./components/animation/LoadingAnimation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import { useAppSelector } from "./store/hooks";
function App() {
  const loading = useAppSelector((state) => state.loading);

  const user = useAppSelector((state) => state.user);
  return (
    <>
      {loading.isLoading ? <LoadingAnimation /> : ""}

      <div className="h-full absolute w-full">
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/singup" element={<SingUp />}></Route>
          {user.id ? <Route path="/home" element={<Home />}></Route> : ""}
        </Routes>
      </div>
    </>
  );
}

export default App;
