const GeneralPanel = ({value, percent, growth, growthText = 'esta semana'}) => {

  return <div className='general-card'>
    <span className='general-value'>{value}{percent ? '%' : ''}</span>
    {
      growth !== undefined && growth !== null &&
      <span className='general-growth'>{`${growth > 0 ? '+' : ''}${growth} ${growthText}`}</span>
    }
    <style jsx>{`
      .isLoad {
        width: 90%;
        height: 100px;
        background: #999;
        border-radius: 5px;
      }
      .general-card {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 150px;
      }
      .general-value {
        font-size: 50px;
        font-weight: 600;
      }
    `}</style>
  </div>;
};

export default GeneralPanel;
