import { useState } from "react";
import logo from "../assets/clipboard.svg";
import "../styles/animation/buttonLogout.css";
import CustomCard from "./CustomCard";

export default function NavBar({ user }: any) {
  const [openCard, setOpenCard] = useState<boolean>(false);
  const handleCollapse = () => {
    const id: HTMLElement | null = document.getElementById("navbarHamburger");

    if (id!.classList.contains("hidden")) {
      return id!.classList.remove("hidden");
    }
    return id!.classList.add("hidden");
  };

  return (
    <>
      <div className={!openCard ? "hidden" : ""} id="customCardLogout">
        <CustomCard
          title="Desconectar."
          message={`${user.name}, Deseja mesmo desconectar do Site?`}
          handleClose={() => setOpenCard(false)}
          type={"ALERT"}
          idTask={""}
          idUser={""}
          param={"LOGOUT"}
        />
      </div>
      <div className="fixed w-full" style={{ zIndex: "9999" }}>
        <nav className=" border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center">
              <img src={logo} className="h-8 mr-3" alt="clipBoard" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                To-Do List
              </span>
            </a>
            <button
              data-collapse-toggle="navbarHamburger"
              onClick={handleCollapse}
              type="button"
              className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbarHamburger"
              aria-expanded="true"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div className={"hidden w-full"} id="navbarHamburger">
              <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded dark:bg-blue-600"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <div className="inline-flex items-center justify-center ">
                    <button
                      className="Btn"
                      onClick={() => setOpenCard(!openCard)}
                    >
                      <div className="sign">
                        <svg viewBox="0 0 512 512">
                          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                        </svg>
                      </div>

                      <div className="text">Sair</div>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
