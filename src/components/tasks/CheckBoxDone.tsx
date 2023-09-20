import "../../styles/animation/checkBoxDone.css";
import { checkBoxProps } from "../../types/Interfaces";

export default function CheckBoxDone({
  checked,
  idTask,
  handleChange,
}: checkBoxProps) {
  return (
    <>
      <div className="checkbox-wrapper ">
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleChange("archived", idTask)}
          />
          <span className="checkbox"></span>
        </label>
      </div>
    </>
  );
}
