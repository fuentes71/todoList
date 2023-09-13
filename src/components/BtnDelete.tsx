import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteTaskAsyncThunk } from "../store/modules/tasksSlice";
import "../styles/animation/btnDelete.css";
import CustomCard from "./CustomCard";

interface btnDeleteProps {
  idTask: string;
}
export default function BtnDelete({ idTask }: btnDeleteProps) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const customCard: HTMLElement | null = document.getElementById(
    `custom-card${idTask}`
  );
  const handleFunction = (type: string, value: boolean) => {
    if (type === "delete") {
      if (value) {
        console.log(idTask);

        dispatch(
          deleteTaskAsyncThunk({
            idUser: user.id,
            idTask: idTask,
          })
        );
      }
    }

    return customCard?.classList.add("hidden");
  };

  const handleCard = () => {
    if (customCard?.classList.contains("hidden")) {
      return customCard.classList.remove("hidden");
    }
  };
  return (
    <>
      <div
        className="absolute top-0 left-0
       hidden"
        id={`custom-card${idTask}`}
      >
        <CustomCard
          title="Deletar Tarefa"
          message="Realmente deseja deletar a tarefa?"
          param="delete"
          handleFunction={handleFunction}
        />
      </div>
      <button className="delete-button" onClick={handleCard}>
        <svg className="delete-svgIcon" viewBox="0 0 448 512">
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
        </svg>
      </button>
    </>
  );
}
