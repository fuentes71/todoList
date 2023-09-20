import "../../styles/animation/animationLoading.css";

export default function LoadingAnimation() {
  return (
    <>
      <div className="background-loader">
        <div className="loader">
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
        </div>
      </div>
    </>
  );
}
