import {useEffect, useState} from 'react';
import Facebook from '@lettercms/icons/facebook';
import Twitter from '@lettercms/icons/twitter';
import Linkedin from '@lettercms/icons/linkedin';
import Router from 'next/router';

export default function ShareButton({url, show}) {
  const [display, setDisplay] = useState('none');
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (show) {
      setDisplay('block');

      setTimeout(() => setOpacity(1), 0);
    } else {
      setOpacity(0);

      setTimeout(() => setDisplay('none'), 160);
    }
  }, [show]);

  return <div style={{display, opacity}} className='transition-all duration-150 ease-in absolute shadow shadow-1 shadow-gray px-4 py-2 rounded-lg bottom-12 right-0 bg-white'>
    <button className='mx-2'>
      <Facebook height='32'/>
    </button>
    <button className='mx-2'>
      <Twitter height='32'/>
    </button>
    <button className='mx-2'>
      <Linkedin height='32'/>
    </button>
  </div>;
}