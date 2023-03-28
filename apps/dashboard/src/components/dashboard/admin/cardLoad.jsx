export default function CardLoad() {
  return <ul>
    <li id='load-main'>
      <div id='image'/>
      <div id='text'>
        <div className='text'/>
        <div className='text'/>
      </div>
    </li>
    <style jsx>{`
      div {
        background: #ccd7ec;
      }
      li#load-main {
        animation: bounce infinite 2s ease-in;
        margin: 10px 0 10px 0;
        width: 100%;
        height: 150px;
        border-radius: 10px;
        border: 10px solid #ccd7ec;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
      }
      li > div {
        height: 150px;
      }
      li #image {
        width: 150px;
      }
      li #text {
        width: calc(100% - 150px);
        background: none;
        flex-direction: column;
        display: flex;
        justify-content: space-around;
        align-content: center;
      }
      li .text {
        height: 25px;
        width: 90%;
        margin: auto;
      }
      @keyframes bounce {
        0% {
          opacity: 1;
        }
        50% {
          opacity: .5;
        }
        100% {
          opacity: 1;
        }
      }
    `}</style>
  </ul>;
}
