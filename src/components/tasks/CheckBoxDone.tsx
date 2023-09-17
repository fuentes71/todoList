import "../../styles/animation/checkBoxDone.css";
interface checkBoxDoneProps {
  checked: boolean;
  idTask: string;
  handleChange(type: string, idTask: string): void;
}
export default function CheckBoxDone({
  checked,
  idTask,
  handleChange,
}: checkBoxDoneProps) {
  return (
    <>
      <div className="checkbox-wrapper ">
        <label>
          <input
            type="checkbox"
            checked={checked}
            onClick={() => handleChange("archived", idTask)}
          />
          <span className="checkbox"></span>
        </label>
      </div>
    </>
  );
}
