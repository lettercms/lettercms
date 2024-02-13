const AccountCard = ({cover, name, username, picture, type}) => <li>
  <div className='social-icon'>
    <div className='social-image-banner' style={cover ? {backgroundImage: `url(${cover})`} : {backgroundColor: '#000'}}>
      <img src={`https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/${type}-white.svg`} alt={` ${type} logo`}/>
    </div>
    <img className='social-page-pic' src={picture} alt={`${name} picture`}/>
    <div className='social-page-content'>
      <div className='social-name'>
        <span className='social-username'>{name}</span>
        <span>@{username}</span>
      </div>
    </div>
  </div>
  <style jsx>{`
    li {
      margin: 15px 0;
      position: relative;
      display:flex;
      width: 45%;
      height: 300px;
      border-radius: 10px;
      background: white;
      border: solid 1px rgba(0,0,0,.2);
      overflow: hidden;
    }
    li .social-icon {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
    }
    li .social-icon .social-image-banner {
      width: 100%;
      height: 50%;
      padding: 2.5% 5%;
      background-position: center;
      background-size: cover;
    }
    li .social-icon .social-image-banner img {
      width: 40px;
    }
    li .social-icon .social-page-pic {
      position: absolute;
      width: 100px;
      border-radius: 50%;
      top: 100px;
    }
    li .social-icon .social-page-content {
      width: 100%;
      height: 50%;
      position: relative;
      display: flex;
    }
    li .social-icon .social-page-content div {
      display: flex;
      padding: 25px 2.5%;
      width: 100%;
      justify-content: end;
    }
    li .social-icon .social-page-content .social-name {
      flex-direction: column;
    }
    li .social-icon .social-page-content .social-count {
      align-items: end;
    }
    li .social-icon .social-page-content .social-name .social-username {
      font-size: 24px;
      font-weight: bold;
      color: #555;
    }
    li .social-icon .social-page-content .social-count::before {
      content: '';
      background-image: url(/awesome/svgs/solid/image.svg);
      width: 25px;
      height: 25px;
    }
    @media (max-width: 480px) {
      li {
        width: 100%; !important;
      } 
    }
  `}</style>
</li>;

export default AccountCard;
