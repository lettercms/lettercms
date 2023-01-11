import {FormattedMessage} from 'react-intl';

const NoData = () => <div className="center">
  <img src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/stats.svg" alt='asset'/>
  <span>
    <FormattedMessage id="The blog's data will show here when it gets views"/>
  </span>
  <style jsx>{`
    .center {
      width: 100% !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .center img {
      width: 80%;
      max-width: 600px;
    }
  `}</style>
</div>;

export default NoData;
