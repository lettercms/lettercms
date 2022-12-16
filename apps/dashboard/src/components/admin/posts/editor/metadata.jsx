import {useState, useEffect} from 'react';
import MetaInputs from './metaInputs';
import SlidersH from '@/components/svg/slidersH';
import {useData} from './index';

let timeout = null;

export default function Metadata({categories}) {
  const [showMeta, setShowMeta] = useState(false);
  const [focus, setFocus] = useState(false);
  const [data] = useData();

  useEffect(() => {
    if (focus) {
      clearTimeout(timeout);
      setShowMeta(true);
    } else {
      timeout = setTimeout(() => setShowMeta(false), 300);
    }
  }, [focus]);

  return <div style={{position: 'relative'}}>
    <button onClick={() => setFocus(!focus)} onBlur={() => setFocus(false)} disabled={data.loading}>
      <SlidersH className='ck ck-icon'/>
    </button>
    {
      showMeta &&
      <MetaInputs categories={categories} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}/>
    }
  </div>;
}
