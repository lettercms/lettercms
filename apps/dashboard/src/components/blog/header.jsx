import dynamic from 'next/dynamic';

/*const Subscribe = dynamic(() => import('./subscribeButton'), {
    loading: () => <img src='/assets/spinner.svg' style={{
        animation: 'rotation linear .6s infinite',
        width: 70
    }}/>
});*/

const Header =({title, description, thumbnail}) =>  {
    return (
      <div>
        <header>
          <div id="header-shadow">
            <div id='landing-description'>
              <img src={`${process.env.ASSETS_BASE}/images/davidsdevel-rombo.png`} className='mobile'/>
              <span>Mantente al tanto de las actualizaciones de mi blog</span>
            </div>
            <div id='landing-image'>
              <img src={`${process.env.ASSETS_BASE}/images/davidsdevel-rombo.png`} className='desktop'/>
              {/*
                !isSubscribe
                && <Subscribe/>
              */}
            </div>
          </div>
        </header>
        <style jsx>
          {`
          .mobile {
            display: block;
          }
          .desktop {
            display: none;
          }
        header {
          width: 100%;
          height: 600px;
          display: block;
          background-image: url(${process.env.ASSETS_BASE}/images/privacidad.jpg);
          background-position: center;
          background-size: cover;
          overflow: hidden;
          position: relative;
        }
        #header-shadow {
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          width: 100%;
          background: rgba(0, 0, 0, .5)
        }
        #header-shadow > div {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          width: 100%
        }
        #header-shadow #landing-description {
          flex-grow: 4;
        }
        #header-shadow #landing-image {
          flex-grow: 2;
        }
        #header-shadow img {
          width: 30%;
        }
        header span {
          display: block;
          font-size: 28px;
          font-weight: bold;
          color: white;
          text-align: center;
        }
        header button#circle {
          border-radius: 50%;
          padding: 0;
          width: 60px;
          border: 0;
          height: 60px;
          box-shadow: rgba(0, 0, 0, .5) 2px 2px 3px;
          cursor: pointer;
        }
        header button#circle img {
          width: 40%;
        }
        @media screen and (min-width: 480px) {
          #header-shadow img {
            width: 20%;
          }
          header {
            background-image: url(${process.env.ASSETS_BASE}/images/privacidad.jpg);
          }
        }
        @media screen and (min-width: 720px) {
          .mobile {
            display: none;
          }
          .desktop {
            display: block;
          }
          header {
            background-image: url(${process.env.ASSETS_BASE}/images/privacidad.jpg);
          }
          #header-shadow {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          #header-shadow #landing-description,
          #header-shadow #landing-image {
            height: 60%;
            width: 50%;
          }
          header span {
            padding: 0 0 0 5%;
            font-size: 35px;
             text-align: left;
          }
        }
        @media screen and (min-width: 960px) {
          header {
            background-image: url(${process.env.ASSETS_BASE}/images/privacidad.jpg);
          }
        }
      `}
        </style>
      </div>
    );
  };

export default Header;
