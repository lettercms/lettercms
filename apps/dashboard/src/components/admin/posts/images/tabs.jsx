import {useState, useEffect} from 'react';

export default function Tabs({onChange}) {
  const [active, setActive] = useState('photos');

  useEffect(() => {
    onChange(active);
  }, [active]);

  const changeTab = tab => {
    if (tab === active)
      return;

    setActive(tab);
  };

  return <div id='modal-tab'>
    <div className={active === 'photos' ? 'active' : ''} onClick={() => changeTab('photos')}>
      <span>Mis Imagenes</span>
    </div>
    <div className={active === 'search' ? 'active' : ''} onClick={() => changeTab('search')}>
      <span>Buscar</span>
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