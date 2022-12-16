import {useState, useEffect, useRef} from 'react';
import Cross from '@/components/svg/cross';
import Button from '@/components/button';

export default function ImageModal({show, img, meta, onClose, onSelect}) {
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState('none');

  const close = () => {
    setOpacity('0');
    setTimeout(() => {
      setDisplay('none');
      onClose();
    }, 610);
  };

  useEffect(() => {
    if (show) {
      setDisplay('flex');
      setTimeout(() => setOpacity('1'), 0);
    }
  }, [show]);

  return <div id='image-shadow' style={{opacity, display}}>
    <Cross width='32' fill='#fff' id='image-modal-cross' onClick={close}/>
    <div id='modal-image-container'>
      <img className='lazy-img' src={img} alt=''/>
    </div>
    <Button type='solid' alt onClick={() => onSelect(meta)}>Seleccionar</Button>
    <style jsx>{`
      :global(#image-modal-cross) {
        position: absolute;
        top: 5%;
        right: 5%;
        cursor: pointer;
      }
      #image-shadow {
        transition: ease .6s;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #0005;
        z-index: 3;
      }
      #modal-image-container {
        width: 80%;
        height: 70%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .btn-solid-sm {
        width: 20rem;
        margin-top: 1rem;
      }
      #modal-image-container img {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        right: 0;
        left: 0;
        margin: 0 auto;
      }
    `}</style>
  </div>;
}