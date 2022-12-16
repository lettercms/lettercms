import {adminTop, textContainer, topButton, top, topOpen} from './top.module.css';
import {useRef, useState, useEffect} from 'react';
import Button from '@/components/button';

export default function Top({disableTopButton, topImg, topText, ico, children, loading, create, disabled, buttonText, buttonRef}) { 
  const prevScrollY = useRef(0);
  const [isOpen, setOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current  > 200 && !isOpen) {
        setOpen(true);
      }
      if (prevScrollY.current < 200 && isOpen) {
        setOpen(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return <div className={adminTop}>
    <div className={textContainer}>
      <span>{topText}</span>
    </div>
    {
      !disableTopButton &&
      <Button type='outline' className={topButton} ref={buttonRef} onClick={create} disabled={loading || disabled}>{buttonText || 'Create'}</Button>
    }
    {ico}
    <div className={`${top} ${isOpen ? topOpen : ''}`}>
      {children}
    </div>
  </div>;
}