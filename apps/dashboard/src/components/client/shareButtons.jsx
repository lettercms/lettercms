import {useEffect, useState} from 'react';
import {FaFacebook, FaLinkedin, FaTwitter} from 'react-icons/fa';

export default function ShareButton({url, show, title}) {
  const [display, setDisplay] = useState('none');
  const [opacity, setOpacity] = useState(0);
  const [_url, setUrl] = useState(url);
  const [_title, setTitle] = useState(title);

  useEffect(() => {
    if (show) {
      setDisplay('block');

      setTimeout(() => setOpacity(1), 0);

      setUrl(encodeURI(`${window.origin}/${url}`));
      setTitle(encodeURI(title));
    } else {
      setOpacity(0);

      setTimeout(() => setDisplay('none'), 160);
    }
  }, [show]);

  return <div style={{display, opacity}} className='transition-all duration-150 ease-in absolute shadow shadow-1 shadow-gray px-4 py-2 rounded-lg bottom-12 right-0 bg-white'>
    <button className='mx-2' onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${_url}&t=${_title}`, '_blank')}>
      <FaFacebook height='32'/>
    </button>
    <button className='mx-2' onClick={() => window.open(`https://twitter.com/intent/tweet?text=${_title}&tw_p=tweetbutton&url=${_url}&via=lettercms`, '_blank')}>
      <FaTwitter height='32'/>
    </button>
    <button className='mx-2' onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${_url}`, '_blank')}>
      <FaLinkedin height='32'/>
    </button>
  </div>;
}