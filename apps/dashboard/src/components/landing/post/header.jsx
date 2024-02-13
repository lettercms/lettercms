const Header = ({title, thumbnail}) => {
  return <header id="header" className="ex-header" style={{backgroundImage: `url(${thumbnail}&w=1400&q=50)`}}>
    <div className="header-shadow" style={{backgroundColor: !thumbnail ? '' : '#000a'}}>
      <div>
        <h1 className='text-xl'>{title}</h1>
      </div>
    </div>
    <style jsx>{`
      #header {
        background-size: cover;
        background-position: center;
      }
      .ex-header {
        background-color: #5f4dee;
      }

      .ex-header h1 {
        color: #fff;
      }
      .header-shadow {
        padding-top: 14rem;
        padding-bottom: 8rem;
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
