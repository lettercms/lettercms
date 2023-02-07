import {useState, useRef, useEffect} from 'react';
import {shadow, openButton} from './mobileLayout.module.css';
import AngleRight from '@lettercms/icons/angleRight';

export default function MobileLayout({children, onOpen, onClose}) {
  const [isOpen, setIsOpen] = useState(false);
  const shadowRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      onOpen();

      shadowRef.current.style.display='block';

      setTimeout(() => {
        shadowRef.current.style.opacity = 1;
      }, 0);

    } else {
      onClose();

      shadowRef.current.style.opacity = 0;

      setTimeout(() => {
        shadowRef.current.style.display='none';
      }, 300);

    }
  }, [isOpen, onOpen, onClose]);

  return <>
    <div className={shadow} onClick={() => setIsOpen(false)} ref={shadowRef} />
    <button onClick={() => setIsOpen(true)} className={openButton}>
      <AngleRight height='36' fill='var(--main)'/>
    </button>
    {children}
  </>;
}