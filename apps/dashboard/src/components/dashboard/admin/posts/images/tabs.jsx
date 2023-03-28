import {FormattedMessage} from 'react-intl';
import {useState} from 'react';

export default function Tabs({onChange}) {
  const [active, setActive] = useState('photos');

  const changeTab = tab => {
    if (tab === active)
      return;

    setActive(tab);
    onChange(tab);
  };

  return <div id='modal-tab'>
    <div className={active === 'photos' ? 'active' : ''} onClick={() => changeTab('photos')}>
      <span>
        <FormattedMessage id='My images'/>
      </span>
    </div>
    <div className={active === 'search' ? 'active' : ''} onClick={() => changeTab('search')}>
      <span>
        <FormattedMessage id='Search'/>
      </span>
    </div>
    <style jsx>{`
      #modal-tab {
        width: 100%;
        display: flex;
        background: #5f4dee; 
      }
      #modal-tab div {
        cursor: pointer;
        padding: .25rem 2rem;
        color: white;
        transition: ease .3s;
      }
      #modal-tab div:hover {
        background: #fff3;
      }
      #modal-tab div.active {
        cursor: default;
        color: #999;
        background: white;
      }
    `}</style>
  </div>;
}