export default function Checkbox({icon, title, id, ...options}) {
  return <div className='selection'>
    <input type='checkbox' name={id} id={id} {...options}/>
    <label className='option' htmlFor='checkFacebook'>
      <img alt='' src={icon}/>
      <span>{title}</span>
    </label>
    <style jsx>{`
      .selection {
        width: 47.5%;
        margin: 15px 0;    
      }
      .selection img {
        height: 1.5rem;
        margin-right: .5rem;
      }
      .selection .option {
        align-items: center;
        display: flex;
      }
    `}</style>
  </div>;
}
