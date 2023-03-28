export default function Landing ({ image, title }) {
  return <div id="landing-container">
    <div id="shadow">
      <img src="/images/davidsdevel-rombo.png" />
      <h1>{title}</h1>
    </div>
    <style jsx>
      {`
      #landing-container {
        position: relative;
        background-image: url("${image}");
        height: 600px;
        background-position: center;
        background-size: cover;
        overflow: hidden;
      }
      #landing-container #shadow {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
        overflow: hidden;
      }
      #landing-container img {
        width: 30%;
        display: block;
        margin: 100px auto;
      }
      #landing-container h1 {
        color: white;
        text-align: center;
      }
      @media screen and (min-width: 480px) {
        #landing-container img {
          width: 20%;
          display: block;
          margin: 100px auto;
        }
      }
      @media screen and (min-width: 720px) {
        #landing-container img {
          width: 10%;
          display: block;
          margin: 150px auto;
        }
      }
    `}
    </style>
  </div>;
};
