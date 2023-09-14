import { useAppDispatch } from "../../store/hooks";
import {
  doneTaskAsyncThunk,
  getTaskAsyncThunk,
} from "../../store/modules/tasksSlice";
import "../../styles/animation/checkBoxDone.css";
interface checkBoxDoneProps {
  checkTask: string;
  id: string;
  idTask: string;
}
export default function CheckBoxDone({
  id,
  checkTask,
  idTask,
}: checkBoxDoneProps) {
  const dispatch = useAppDispatch();

  const handleDone = () => {
    dispatch(doneTaskAsyncThunk({ idUser: id, idTask: idTask }));
    dispatch(getTaskAsyncThunk(id));
  };
  return (
    <>
      <div className="checkbox-wrapper ">
        <label>
          <input
            type="checkbox"
            checked={checkTask === "DONE" ? true : false}
            onClick={handleDone}
          />
          <span className="checkbox"></span>
        </label>
      </div>
    </>
  );
}
