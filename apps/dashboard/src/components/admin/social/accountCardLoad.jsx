const AccountCard = () => <li style={{animation: 'bounce infinite ease 2s'}}>
  <div className='load-icon'/>
  <div className='load-pic'/>
  <div className='load-name'/>
  <div className='load-username'/>
  <style jsx>{`
    li {
      margin: 50px 0;
      width: 45%;
      height: 300px;
      position: relative;
      border-radius: 10px;
      border: solid 10px #ccd7ec;
      overflow: hidden;
    }
    li div {
      background: #ccd7ec;
      position: absolute;
      border-radius: 0.5rem;
    }
    li .load-icon {
      width: 60px;
      height: 60px;
      top: 15px;
      left: 15px;
    }
    li .load-pic {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      top: 70px;
      left: calc(50% - 50px);
    }
    li .load-name {
      width: 200px;
      height: 32px;
      bottom: 50px;
      left: 15px;
    }
    li .load-username {
      width: 150px;
      height: 24px;
      left: 15px;
      bottom: 15px;
    }
  `}</style>
</li>;

export default AccountCard;
