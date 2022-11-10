import {backButton} from './index.module.css';
import ConfigInputs from './configInputs';
import {useState, useEffect} from 'react';
import Cog from '@/components/svg/cog';

export default function Config() {
  const [showConfig, setShowConfig] = useState(false);

  return <div>
    <button className={backButton} onClick={() => setShowConfig(!showConfig)}>
      <Cog className='ck ck-icon'/>
    </button>
    {
      showConfig &&
      <ConfigInputs/>
    }
  </div>;
}