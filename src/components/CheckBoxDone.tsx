import { useAppDispatch } from "../store/hooks";
import { doneTaskAsyncThunk } from "../store/modules/tasksSlice";
import "../styles/animation/checkBoxDone.css";
interface checkBoxDoneProps {
  checkTask: string;
  id: string;
}
export default function CheckBoxDone({ id, checkTask }: checkBoxDoneProps) {
  const dispatch = useAppDispatch();

  const handleDone = () => {
    dispatch(doneTaskAsyncThunk({ idUser: id, idTask: checkTask }));
  };
  return (
    <>
      <div className="checkbox-wrapper">
        <label>
          <input type="checkbox" onClick={handleDone} />
          <span className="checkbox"></span>
        </label>
      </div>
    </>
  );
}
