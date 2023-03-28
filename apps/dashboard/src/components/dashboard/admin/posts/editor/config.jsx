import {backButton} from './index.module.css';
import ConfigInputs from './configInputs';
import {useState, useEffect} from 'react';
import Cog from '@lettercms/icons/cog';
import {useData} from './index';

let timeout = null;

export default function Config({hasFacebook, hasInstagram}) {
  const [showConfig, setShowConfig] = useState(false);
  const [focus, setFocus] = useState(false);
  const [data] = useData();

  useEffect(() => {
    if (focus) {
      clearTimeout(timeout);
      setShowConfig(true);
    } else {
      timeout = setTimeout(() => setShowConfig(false), 300);
    }
  }, [focus]);

  return <div>
    <button className={backButton} disabled={data.loading} onClick={() => setFocus(!focus)} onBlur={() => setFocus(false)}>
      <Cog className='ck ck-icon'/>
    </button>
    {
      showConfig &&
      <ConfigInputs hasFacebook={hasFacebook} hasInstagram={hasInstagram}/>
    }
  </div>;
}