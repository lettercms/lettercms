const Images = ({images, setThumbnail, actual}) => {
  return <ul>
    {
      images?.length > 0
      && images.map(e => <li key={e} className={e === actual ? 'actual':''} onClick={e === actual ? null : () => setThumbnail(e)}><img alt={e} src={e}/></li>)
    }
    {
      images.length === 0 &&
      <span>No hay imagenes en esta entrada</span>
    }
    <style jsx>{`
      li {
        padding: 15px 5%;
        cursor: pointer;
        border-radius: 5px;
        transition: ease .3s;
      }
      li.actual {
        cursor: default;
        background: #ccc;
      }
      li:hover {
        background: #ccc;
      }
      li img {
        width: 100%;
      }
    `}</style>
  </ul>;
};

export default Images;
