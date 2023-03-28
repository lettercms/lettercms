const Base = ({rows = 1}) => <div className='load-container'>
  <div className='load-title'/>
  <div className='load-content'/>
  <style jsx>{`
    .load-container {
      position: relative;
      border-radius: 15px;
      width: calc(${(typeof rows !== 'number' ? rows : 100 / rows)}% - 50px);
      height: 250px;
      margin: 15px 25px;
      border: solid 10px #ccd7ec;
    }
    .load-container div {
      background: #ccd7ec;
      position: absolute;
      border-radius: 5px;
    }
    .load-title {
      width: 40%;
      height: 30px;
      top: 15px;
      left: 5%;
    }
    .load-content {
      width: 90%;
      height: 150px;
      bottom: 15px;
      left: 5%;
    }
  `}</style>
</div>;

export default Base;
