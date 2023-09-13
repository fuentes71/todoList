import "../styles/animation/customCard.css";

interface CustomCardProps {
  title: string;
  message: string;
  param: string;
  handleFunction(type: string, value: boolean): void;
}
export default function CustomCard({
  title,
  message,
  param,
  handleFunction,
}: CustomCardProps) {
  return (
    <>
      <div className="container-card absolute" id="container-Card">
        <div className="card">
          <div className="card-content">
            <p className="card-title">{title}</p>
            <p className="card-para">{message}</p>
            <div className="buttonContainer">
              <button
                className="acceptButton"
                onClick={() => {
                  handleFunction(param, true);
                }}
              >
                Aceitar
              </button>
              <button
                className="declineButton"
                onClick={() => {
                  handleFunction(param, false);
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
