import {useState, useEffect} from 'react';
import List from './thumbnailList';
import ImageIcon from '@/components/svg/image';

let timeout = null;

export default function Metadata() {
  const [showList, setShowList] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (focus) {
      clearTimeout(timeout);
      setShowList(true);
    } else {
      timeout = setTimeout(() => setShowList(false), 300);
    }
  }, [focus]);

  return <div style={{position: 'relative'}}>
    <button onClick={() => setFocus(!focus)} onBlur={() => setFocus(false)}>
      <ImageIcon className='ck ck-icon'/>
    </button>
    {
      showList &&
      <List />
    }
  </div>;
}


//<List images={images} onChange={onChange} actual={thumbnail} {/*onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}*/}/>
