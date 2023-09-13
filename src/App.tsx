import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./components/Login";
import SingUp from "./components/SingUp";
function App() {
  return (
    <>
      <div className="h-full absolute w-full">
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/singup" element={<SingUp />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
