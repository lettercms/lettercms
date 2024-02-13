export default function ImageList() {
  return <ul>
    <li/>
    <style jsx>{`
      ul {
        display: flex;
        flex-flow: wrap;
        width: 100%;
        height: 90%;
        list-style: none;
      }
      ul li {
        width: 18%;
        height: 8rem;
        padding: 0;
        margin: 1rem 1%;
        position: relative;
        background: #999;
        border-radius: 5px;
        animation: bounce linear infinite 2s;
      }
      @media (max-width: 480px) {
        ul li {
          width: 45%;
        }
      }
    `}</style>
  </ul>;
}