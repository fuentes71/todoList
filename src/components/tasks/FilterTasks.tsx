import { useState } from "react";
import "../../styles/animation/filterTasks.css";

interface FilterTasksProps {
  handleChangeFilter: (type: string, value?: string) => void;
}
export default function FilterTasks({ handleChangeFilter }: FilterTasksProps) {
  const [title, setTitle] = useState<string>("");
  return (
    <>
      <div className="customCheckBoxHolder justify-center space-y-10">
        <input
          className="customCheckBoxInput hidden"
          id="cCB1"
          type="checkbox"
          checked={title === "" ? true : false}
        />
        <label className="customCheckBoxWrapper" htmlFor="cCB1">
          <div className="customCheckBox">
            <input
              type="text"
              className="w-full max-w-[160px] bg-transparent  pl-2  font-semibold border-e-transparent "
              onChange={(e) => {
                setTitle(e.target.value);
                handleChangeFilter("title", title);
              }}
            />
            <div className="inner absolute">
              {title === "" ? "Pesquisar" : ""}
            </div>
          </div>
        </label>

        <input
          className="customCheckBoxInput hidden"
          id="cCB2"
          type="checkbox"
          onClick={() => handleChangeFilter("completed")}
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
          onClick={() => handleChangeFilter("archived")}
        />
        <label className="customCheckBoxWrapper" htmlFor="cCB3">
          <div className="customCheckBox">
            <div className="inner">Arquivadas</div>
          </div>
        </label>
      </div>
    </>
  );
}
