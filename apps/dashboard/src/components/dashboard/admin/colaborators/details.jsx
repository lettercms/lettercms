const Details = ({
  name, lastname, ocupation, description, photo, facebook, twitter, instagram, linkedin, email, style,
}) => (
  <div id="colaborator" style={style}>
    <div>
      <img alt={`${name} ${lastname} picture`} src={photo} />
      <span>
        <i>{ocupation}</i>
      </span>
      <span className="title">
        {name}
        {' '}
        {lastname}
      </span>
      <div>
        {
        facebook
        && (
          <a href={'https://www.facebook.com/'+facebook} target="_blank" rel="noreferrer">
            <img alt='facebook logo' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/facebook.svg" />
          </a>
        )
      }
        {
        twitter
        && (
          <a href={'https://twitter.com/'+twitter} target="_blank" rel="noreferrer">
            <img alt='twitter logo' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/twitter.svg" />
          </a>
        )
      }
        {
        instagram
        && (
          <a href={'https://instagram.com/'+instagram} target="_blank" rel="noreferrer">
            <img alt='instagram logo' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/instagram.svg" />
          </a>
        )
      }
        {
        linkedin
        && (
          <a href={'https://www.linkedin.com/in/'+linkedin} target="_blank" rel="noreferrer">
            <img alt='linkedin logo' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/linkedin.svg" />
          </a>
        )
      }
        {
        email
        && (
          <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
            <img alt='email icon' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/email-menu.png" style={{ filter: 'brightness(0.4)' }} />
          </a>
        )
      }
      </div>
      <p>{description}</p>
    </div>
    <style jsx>
      {`
    #colaborator {
      align-items: center;
      justify-content: center;
      position: fixed;
      transition: ease .3s;
    }
    #cross {
      position: absolute;
      width: 25px !important;
      left: 5%;
      top: 5%;
      filter: brightness(0.8);
      cursor: pointer;
    }
    #colaborator > div {
      position: relative;
      padding: 50px 5%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      width: 100%;
    }
    #colaborator div > img {
      width: 150px;
      border-radius: 50%;
    }
    #colaborator div span i {
      color: gray;
      margin: 15px 0 0;
      display: block;
    }
    #colaborator div div {
      display: flex;
      margin: 15px 0;
      width: 50%;
      justify-content: space-around;
    }
    #colaborator div div img {
      width: 25px;
      margin: 0 5px;
    }
    #colaborator div p {
      text-align: center;
      border: 1px solid rgba(0,0,0,.1);
      padding: 25px 50px;
      background: #fafafa;
      border-radius: 5px;
    }
  `}
    </style>
  </div>
);

export default Details;
