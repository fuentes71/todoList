import { useState } from "react";
import "../styles/animation/filterTasks.css";

interface filterTasksProps {
  handleTitle(title: boolean): void;
  handleDone(done: boolean): void;
  handleFile(file: boolean): void;
}
export default function FilterTasks({
  handleTitle,
  handleDone,
  handleFile,
}: filterTasksProps) {
  const [title, setTitle] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [file, setFile] = useState<boolean>(false);

  return (
    <>
      <div className="customCheckBoxHolder justify-center space-y-10">
        <input
          className="customCheckBoxInput hidden"
          id="cCB1"
          type="checkbox"
        />
        <label className="customCheckBoxWrapper" htmlFor="cCB1">
          <div className="customCheckBox">
            <input
              type="text"
              className="w-full max-w-[160px] bg-transparent  pl-2  font-semibold border-e-transparent "
              placeholder="pesquisar"
              style={{ outline: "0" }}
            />
            <div
              className="inner"
              onChange={() => {
                setTitle(!title);
                handleTitle(title);
              }}
            >
              <input
                type="button"
                value="Search"
                className="customCheckBoxWrappe p-2   transition-colors"
                id="cCB1"
              />
            </div>

            {/* <input type="text" />
            <div
              className="inner"
              onChange={() => {
                setTitle(!title);
                handleTitle(title);
              }}
            >
              Pesquisar
            </div> */}
          </div>
        </label>

        <input
          className="customCheckBoxInput hidden"
          id="cCB2"
          type="checkbox"
        />
        <label className="customCheckBoxWrapper" htmlFor="cCB2">
          <div className="customCheckBox">
            <div
              className="inner"
              onChange={() => {
                setDone(!done);
                handleDone(done);
              }}
            >
              Concluidas
            </div>
          </div>
        </label>

        <input
          className="customCheckBoxInput hidden"
          id="cCB3"
          type="checkbox"
        />
        <label className="customCheckBoxWrapper" htmlFor="cCB3">
          <div className="customCheckBox">
            <div
              className="inner"
              onChange={() => {
                setFile(!file);
                handleFile(file);
              }}
            >
              Arquivadas
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
