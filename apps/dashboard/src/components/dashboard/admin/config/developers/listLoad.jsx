export default function ListLoad() {
  return <div className='key-load flex flex-column'>
    <div/>
    <div/>
    <style jsx>{`
      .key-load {
        width: 100%;
        height: 87px;
        margin: .5rem auto;
        border-radius: 10px; 
        border: 5px solid #f7f7f7;
        align-items: start;
        padding: 1rem 2rem;
      }
      .key-load div {
        width: 30%;
        height: .8rem;
        border-radius: 5px;
        background: #f7f7f7;
      }
    `}</style>
  </div>;
}