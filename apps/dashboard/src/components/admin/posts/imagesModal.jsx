import { useState, useEffect } from 'react';
import sdk from '@lettercms/sdk';
import ImageUploader from '../../../lib/ImageHandler';
import BlogImages from './images/blogImages';
import BlogSearch from './images/search';
import ModalTabs from './images/tabs';

const generateUnsplashSrc = raw => {
  return {
      src: `${raw}&w=100`,
      'data-src': `${raw}&w=1400`,
      srcset:`${raw}&w=480 480w,
        ${raw}&w=720 720w,
        ${raw}&w=1024 1024w,
        ${raw}&w=2048 1400w`
    }
}

const generateLetterSrc = raw => {
  return {
      src: `/_next/image?url=${raw}&q=50&w=100`,
      'data-src': `/_next/image?url=${raw}&q=75&w=1400`,
      srcset:`/_next/image?url=${raw}&q=75&w=480 480w,
        /_next/image?url=${raw}&q=75&w=720 720w,
        /_next/image?url=${raw}&q=7&w=1024 1024w,
        /_next/image?url=${raw}&q=7&w=2048 1400w`
    }
}

export default function ImagesModal({onClose, show}) {
  const [display, setDisplay] = useState('none');
  const [opacity, setOpacity] = useState('0');
  const [tab, setTab] = useState('photos');

  const close = () => {
    setOpacity('0');
    setTimeout(() => {
      setDisplay('none')
      onClose();
    }, 610);
  }

  const appendUnsplash = ({raw, user, href, download}) => {
    const src = generateUnsplashSrc(raw);

    window.editorEventEmitter.emit('unsplash', {
      user,
      href,
      src,
      download
    });
  };

  const appendImage = raw => {
    const obj = generateLetterSrc(raw);
    window.editorEventEmitter.emit('insert', obj)
  };

  useEffect(() => {
    if (show) {
      setDisplay('block');
      setTimeout(() => setOpacity('1'), 0);
    } else {
      close();
    }
  }, [show]);

  return <div style={{ display, opacity, transition: 'ease .6s' }}>
    <div id="shadow">
      <div id="images-main">
        <img id="cross" alt='Asset' src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/cross.svg" onClick={close} />
        <div id="images-container">
          <ModalTabs onChange={setTab}/>
          <div id='wrapper'>
          {
            tab === 'photos' &&
            <BlogImages onSelect={appendImage}/>
          }
          {
            tab === 'search' &&
            <BlogSearch onSelect={appendUnsplash}/>
          }
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      #upload-button {
        width: 10rem;
      }
      #shadow {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        top: 0;
        left: 0;
      }
      #shadow #images-main {
        position: absolute;
        width: 80%;
        height: 90%;
        background: #5f4dee;
        left: 10%;
        top: 5%;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        overflow: hidden;
      }
      #shadow #images-main #images-title {
        font-weight: bold;
        font-size: 24px;
        margin-top: 10px;
      }
      #shadow #images-main #cross {
        position: absolute;
        right: 30px;
        top: 20px;
        width: 20px;
        cursor: pointer;
      }
      #shadow #images-main button {
        position: absolute;
        bottom: 15px;
      }
      #shadow #images-main #images-container {
        position: absolute;
        background: white;
        width: 100%;
        height: calc(100% - 3rem);
        top: 3rem;
      }
      #shadow #images-main #images-container #wrapper {
        overflow-y: auto;
        height: 93%;
      }
    `}</style>
  </div>
}

/*
  deleteImage = async (secret, name, e, i) => {
    if (e.target.tagName === 'DIV')
      return;

    if (!confirm('¿Deseas eliminar esta imagen?'))
      return;

    try {

      const {status, message} = await sdk.images.delete({
        //TODO: Define params to delete image
      });

      if (status === 'OK') {
        const newData = Object.assign([], this.state.data.filter((e, ind) => ind !== i));

        this.setState({
          data: newData,
        });
      } else {
        alert(message);
      }
    } catch (err) {
      alert('Error al eliminar imagen');
      throw err;
    }
  };

}*/

