const Header = ({title, thumbnail}) => {
  return <header id="header" className="ex-header" style={{backgroundImage: `url(${thumbnail})`}}>
    <div className="header-shadow" style={{backgroundColor: thumbnail ? '#000a' : ''}}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      #header {
        background-size: cover;
        background-position: center;
      }
      .ex-header {
        background-color: #5f4dee;
        margin-top: 6rem;
      }

      .ex-header h1 {
        color: #fff;
      }
      .header-shadow {
        padding-top: 8rem;
        padding-bottom: 5rem;
        text-align: center;
      }
      @media (min-width: 768px) {
        .ex-header h1 {
          width: 80%;
          margin-right: auto;
          margin-left: auto;
        }
      }
      @media (min-width: 1200px) {
        .ex-header h1 {
          width: 60%;
          margin-right: auto;
          margin-left: auto;
        }
      }
    `}</style>
  </header>;
};

export default Header;
