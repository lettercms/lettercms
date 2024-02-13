import { useState, useEffect } from 'react';
import BlogImages from './images/blogImages';
import BlogSearch from './images/search';
import ModalTabs from './images/tabs';
import {FaTimes} from 'react-icons/fa';

const generateUnsplashSrc = (raw, width) => {
  return {
    width,
    class: 'image',
    src: `${raw}&w=100`,
    'data-src': raw,
    srcset: `${raw}&w=480&q=40 480w, ${raw}&w=720&q=50 720w, ${raw}&w=1024&q=75 1024w, ${raw}&w=2048&q=75 1400w`
  };
};

const generateLetterSrc = (raw, width) => {
  return {
    width,
    class: 'image',
    src: `${raw}&w=100`,
    'data-src': raw,
    srcset: `${raw}&w=480&q=40 480w, ${raw}&w=720&q=50 720w, ${raw}&w=1024&q=75 1024w, ${raw}&w=2048&q=75 1400w`
  };
};

export default function ImagesModal({onClose, show}) {
  const [display, setDisplay] = useState('none');
  const [opacity, setOpacity] = useState('0');
  const [tab, setTab] = useState('photos');

  const appendUnsplash = ({raw, user, href, download, width, height}) => {
    const src = generateUnsplashSrc(raw, width, height);

    window.editorEventEmitter.emit('unsplash', {
      user,
      href,
      src,
      download
    });
  };

  const appendImage = ({raw, width, height}) => {
    const obj = generateLetterSrc(raw, width, height);
    window.editorEventEmitter.emit('insert', obj);
  };

  useEffect(() => {
    if (show) {
      setDisplay('block');
      setTimeout(() => setOpacity('1'), 0);
    } else {
      setOpacity('0');

      setTimeout(() => {
        setDisplay('none');
        onClose();
      }, 610);
    }
  }, [show, onClose]);

  return <div style={{ display, opacity, transition: 'ease .6s' }}>
    <div id="shadow">
      <div id="images-main">
        <FaTimes
          id="cross"
          width='20'
          fill='white'
          onClick={() => {
            setOpacity('0');

            setTimeout(() => {
              setDisplay('none');
              onClose();
            }, 610);
          }}
        />
        <div id="images-container">
          <ModalTabs onChange={setTab}/>
          <div id='wrapper'>
          {
            tab === 'photos' &&
            <BlogImages isHidden={!show} onSelect={appendImage}/>
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
        z-index: 100000;
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
      :global(#shadow #images-main #cross) {
        position: absolute;
        right: 30px;
        top: 20px;
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
  </div>;
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

