import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import { useAppSelector } from "./store/hooks";
function App() {
  const user = useAppSelector((state) => state.user);
  return (
    <>
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
