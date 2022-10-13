const LoadBar = () => (
  <div id="load-container">
    <div id="load-bar" />
    <style jsx>
      {`
      #load-container {
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 2;
      }
      #load-container #load-bar {
        background: black;
        height: 5px;
        position: absolute;

        width: 30%;
        animation: load infinite linear 1.5s;
      }
      @keyframes load {
        0% {
          left: -30%;
        }
        25% {
          left: 35%;
        }
        50% {
          left: 100%;
        }
        75% {
          left: 35%;
        }
        100% {
          left: -30%;
        }
      }
    `}
    </style>
  </div>
);

export default LoadBar;
