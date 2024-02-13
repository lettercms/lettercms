'use client'

import {useRef, useEffect} from 'react';
import {shadow, openButton} from './mobileLayout.module.css';
import {FaAngleRight} from 'react-icons/fa';

export default function MobileLayout({children, isOpen, onOpen, onClose}) {
  const shadowRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      shadowRef.current.style.display='block';

      setTimeout(() => {
        shadowRef.current.style.opacity = 1;
      }, 0);

    } else {
      shadowRef.current.style.opacity = 0;

      setTimeout(() => {
        shadowRef.current.style.display='none';
      }, 300);

    }
  }, [isOpen]);

  return <>
    <div className={shadow} onClick={() => onClose()} ref={shadowRef} />
    <button onClick={() => onOpen()} className={openButton}>
      <FaAngleRight height='36' fill='var(--main)'/>
    </button>
    {children}
  </>;
}