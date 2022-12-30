import {useState, useEffect} from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Datetime from 'react-datetime';
import moment from 'moment';
import Input from '../../input';
import ModalBase from '../../modalBase';
import ImageSelector from './imageSelector';
import ImageList from './imagesList';
import sdk from '@lettercms/sdk';
import Button from '@/components/button';
import FBIco from '@lettercms/icons/facebook';
import IGIco from '@lettercms/icons/instagram';
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/es';

const Load = () => <img alt='' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/spinner.svg' style={{animation: 'rotation linear .3s infinite', width: 5}}/>;
const Facebook = dynamic(() => import('./facebookCard'), {
  ssr: false,
  loading: Load
});
const Instagram = dynamic(() => import('./instagramCard'), {
  ssr: false,
  loading: Load
});

const ClearDate = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M436 160H12c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36c0 6.6-5.4 12-12 12zM12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm257.3 160l48.1-48.1c4.7-4.7 4.7-12.3 0-17l-28.3-28.3c-4.7-4.7-12.3-4.7-17 0L224 306.7l-48.1-48.1c-4.7-4.7-12.3-4.7-17 0l-28.3 28.3c-4.7 4.7-4.7 12.3 0 17l48.1 48.1-48.1 48.1c-4.7 4.7-4.7 12.3 0 17l28.3 28.3c4.7 4.7 12.3 4.7 17 0l48.1-48.1 48.1 48.1c4.7 4.7 12.3 4.7 17 0l28.3-28.3c4.7-4.7 4.7-12.3 0-17L269.3 352z"/></svg>;

const renderInput =  (isOpen, date, clearDate) => {
  return function Time (props, openCalendar, closeCalendar){
    return <div id='date-container'>
      <button id='date-button' disabled={!date} onClick={e => {
        if (date) {
          clearDate();
          closeCalendar();
        }
      }}>
        <ClearDate/>
      </button>
      <div onClick={e => {
        e.stopPropagation();

        if (isOpen) {
          closeCalendar();
          isOpen = false;
        } else {
          openCalendar();
          isOpen = true;
        }
      }}>
        <span>
          {date ? moment(date).format('lll') : 'N/A'}
        </span>
      </div>
      <style jsx>{`
        #date-container {
          border-radius: 50px;
          border: 0.125rem solid var(--main);
          position: relative;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: var(--main);
        }
        #date-container div {
          padding: 0 2rem 0 1rem;
          width: 15rem;
          text-align: center;
        }
        button:disabled {
          cursor: default;
        }
        button {
          width: 2.75rem;
          position: relative;
          background: none;
          border: none;
          padding: .5rem .8rem;
        }
        :global(#date-button path) {
          fill: var(--main);
        }
        :global(#date-button:hover:enabled) {
          background: var(--main);
        }
        :global(#date-button:hover:enabled path) {
          fill: white;
        }
      `}</style>
    </div>;
  };
};

const publishPost = async (data, cb) => {
  try {
    if (data.feeds.lenght === 0)
      return alert('Debe seleccionar al menos una red social');

    const {status} = await sdk.createRequest('/social', 'POST', data);

    if (status === 'OK') {
      alert('Publicado con exito');
      cb();
    }
  } catch(err) {
    alert('Error al publicar entrada');
  }
};

const Publish = ({accounts}) => {
  const [date, setDate] = useState(null);
  const [content, setContent] = useState('');
  const [show, setModal] = useState('');
  const [hasInstagram, setIg] = useState(false);
  const [hasFacebook, setFb] = useState(false);
  const [images, setImage] = useState([]);
  const [isDateOpen, setDateOpen] = useState(false);

  const clearData = () => {
    images.forEach(e => sdk.createRequest(`/image/${e.split('/').pop().replace('.webp', '')}`, 'DELETE'));

    setContent('');
    setFb(false);
    setIg(false);
    setDate(null);
    setImage([]);

    localStorage.removeItem('temp_social_images');
    localStorage.removeItem('temp_social_content');
  };

  useEffect(() => {
    if (localStorage.temp_social_images)
      setImage(JSON.parse(localStorage.temp_social_images));

    if (localStorage.temp_social_content)
      setContent(localStorage.temp_social_content);
  }, []);

  useEffect(() => {
    if (images.lenght > 0)
      localStorage.setItem('temp_social_images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('temp_social_content', content);
  }, [content]);

  return <div className='publish-container flex'>
    <button className='back-button' onClick={() => Router.push('/dashboard/social')}>
      <svg className='back-ico' height='32' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
    </button>
    <div id='publish-main' className='middle flex flex-column'>
      <div>
        <div id='selections'>
            {
              accounts.facebook &&
              <div className='selection'>
                <input type='checkbox' name='checkFacebook' id='checkFacebook' checked={hasFacebook} onChange={() => setFb(!hasFacebook)}/>
                <label className='option' htmlFor='checkFacebook'><img alt='' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/facebook.svg'/><span>Facebook</span></label>
              </div>
            }
            {
              accounts.instagram && 
              <div className='selection'>
                <input type='checkbox' name='checkInstagram' id='checkInstagram' checked={hasInstagram} onChange={() => setIg(!hasInstagram)}/>
                <label className='option' htmlFor='checkInstagram'><img alt='' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/instagram.svg'/><span>Instagram</span></label>
              </div>
            }
          </div>
      </div>
      <div id='publish-buttons'>
        <ImageList images={images} onAdd={() => setModal('image')} onDelete={url => setImage(images.filter(_url => url !== _url))}/>
        <Input type='textarea' id='content' value={content} label='Contenido' onInput={({target: {value}}) => setContent(value)}/>
        <div className='flex flex-row' style={{justifyContent: 'space-between'}}>
          <div className='date-container'>
            {
              <Datetime
                onClose={() => setDateOpen(false)}
                onOpen={() => setDateOpen(true)}
                value={date}
                isValidDate={current => current.isAfter(Date.now())}
                locale="es"
                onChange={e => setDate(e.toDate())}
                renderInput={renderInput(isDateOpen, date, () => setDate(null))}
              />
            }
          </div>
          <div className='flex flex-row' style={{width: 'auto'}}>
            <Button
              disabled={!content || !hasFacebook || !hasInstagram}
              type='outline'
              onClick={() => publishPost({
                message: content,
                schedule: date !== null && date,
                images,
                feeds: [hasFacebook && 'facebook', hasInstagram && 'instagram'].filter(e => e) 
              }, clearData)}
            >{ !date ? 'Publicar' : 'Programar'}</Button>
          </div>
        </div>
      </div>
    </div>
    <div id='cards'>
      {
        hasFacebook &&
        <>
          <div className='social-title'>
            <FBIco height='32'/>
            <span>Facebook</span>
          </div>
          <Facebook content={content} images={images} pageImage={accounts.facebook.picture} pageName={accounts.facebook.name}/>
        </>
      }
      {
        hasInstagram &&
        <>
          <div className='social-title'>
            <IGIco height='32'/>
            <span>Instagram</span>
          </div>
          <Instagram content={content} images={images} pageImage={accounts.instagram.picture} pageName={accounts.instagram.name}/>
        </>
      }
      {
        (!hasFacebook && !hasInstagram) &&
        <div className='center'>
          <span>Seleccione una red social</span>
        </div>
      }
    </div>
    <ModalBase show={!!show} close={() => {setModal('');}} width='auto' height={show === 'image' && 'auto'} >
      <ImageSelector show={show} onAppend={_url => {
        setModal('');
        setImage(images.concat([_url]));
      }}/>
    </ModalBase>
    <style jsx>{`
      :global(.rdtPicker) {
        bottom: 3rem !important;
        padding: 1rem !important;
        border-radius: 5px !important;
        width: 100%;
      }
      :global(.rdtPicker td) {
        border-radius: 5px !important;
      }
      :global(.rdt) {
        width: max-content;
      }
      label.option {
        align-items: center;
        display: flex;
      }
      .back-button {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: none;
        border: none;
      }
      #cards {
        justify-content: start;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 50%;
        padding: 1rem 0;
        align-items: center;
        overflow: auto;
        background: #f7f7f7;
      }
      #selections {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
        padding-top: 3rem;
      }
      #selections div {
        width: 47.5%;
        margin: 15px 0;    
      }
      #selections div img {
        height: 1.5rem;
        margin-right: .5rem;
      }
      .date-container {
        width: 12rem;
      }
      .image-container {
        width: 2.75rem !important;
        height: 2.75rem !important;
        position: relative;
        padding: .5rem;
        border-radius: 50%;
        cursor: pointer;
        transition: ease .2s;
      }
      .image-container:hover {
        background: #fff4;
      }
      .publish-container {
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .publish-container .middle {
        width: 50%;
        height: 100%;
      }
      .publish-container .middle > div {
        height: 50%;
        width: 100%;
      }
      #publish-main {
        padding: 0 1rem;
      }
      #publish-buttons {
        padding: 2rem 0;
        height: auto;
      }
      .center {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .center span {
        color: var(--main-alt);
      }
      .social-title {
        color: var(--main-alt);
        display: flex;
        flex-direction: row; 
        align-items: center;
        justify-content: center;
      }
      .social-title span {
        font-size: 20px;
        margin-left: .5rem;
      }
    `}</style>
  </div>;
};

export default Publish;
