const Card = ({
  _id,
  photo,
  name,
  lastname,
  ocupation,
  role,
  view,
  del
}) => {
  return <li className="post" key={`post-${_id}`}>
    {
      photo
      ? <div className="image" style={{ backgroundImage: `url(${photo})` }} />
      : <div className="image-title">{name[0].toUpperCase()+lastname[0].toUpperCase()}</div>
    }
    <div className="data">
      <span>{name + ' ' + lastname}</span>
      <div>
        <span className="tags">{ocupation}</span>
        <div className="align">
          <span>Type:</span>
          <span>{role}</span>
        </div>
        <div className="buttons">
          <button className="gray" onClick={() => view(_id)}>View</button>
          <button className="black" onClick={() => del(_id)}>Delete</button>
        </div>
      </div>
    </div>
    <style jsx>{`
      li.post {
        padding: 0 5% 0 0;
        margin: 10px 0;
        width: 100%;
        height: 150px;
        background: white;
        border-radius: 10px;
        box-shadow: 1px 1px 5px gray;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      li.post .image {
        background-size: cover;
        background-position: center;
        display: inline-block;
        width: 150px;
        height: 150px;
      }
      li.post .image-title {
        width: 150px;
        height: 150px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: black;
        color: white;
        font-size: 32px;
      }
      li.post .data {
        display: inline-block;
        margin: 0 0 0 25px;
      }
      li.post .buttons {
        position: absolute;
        bottom: 5%;
        right: 1%;
      }
      li.post .buttons button {
        margin: 0 10px
      }
      li.post span {
        margin: 5px;
        display: inline-block;
      }
      li.post span.tags {
        display: block;
        color: #7f7f7f;
        font-size: 14px;
        margin: 10px;
      } 
      .align {
        display: inline-flex;
        align-items: center;
      }
      .align img {
        width: 25px;
      }
      .buttons {
        display: flex;
      }
    `}</style>
  </li>;
};

export default Card;
