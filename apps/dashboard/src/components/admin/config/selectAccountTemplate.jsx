import Image from 'next/image';

const AccountTemplate = ({name, username, cover, picture, onSelect}) => <div className='account-template'>
  <div className='fb-cover' style={{backgroundImage: `url(${cover.source})`}}>
    <div className='social-shadow'>
      <img alt={`${username} picture`} src={picture.data.url}/>
      <div className='social-actions'>
        <div className='account-names'>
          <span className='account-name'>{name}</span>
        </div>
        <div className='account-button'>
          <span className='account-username'>@{username}</span>
          <button className='white' onClick={onSelect}>Use Account</button>
        </div>
      </div>
    </div>
  </div>
  <style jsx>{`
    .account-template {
      width: 49%;
      min-width: 400px;
      margin: 15px 0;
      border-radius: 10px;
      overflow: hidden;
    }
    .account-template .fb-cover {
      background-position: center;
      background-size: cover;
    }
    .account-template .fb-cover .social-shadow {
      padding: 25px 2.5%;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.7);
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .account-template div img {
      width: 100px;
      border-radius: 50%;
    }
    .social-actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 25px 50px;
      align-items: center;
      flex-direction: column;
    }
    .social-actions .account-names {
      color: white;
    }
    .social-actions .account-names .account-name {
      font-size: 32px;
    }
    .social-actions .account-button {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-top: 5px;
    }
    .social-actions .account-button .account-username {
      color: white;
    }
    .social-actions .account-button button {
      margin: 0 0 0 50px;
    }
  `}</style>
</div>;


export default AccountTemplate;
