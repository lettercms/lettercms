import {useState, createContext, useContext} from 'react';
import dynamic from 'next/dynamic';
import Top from '../../listLayout/top';
import Buttons from './buttons';
import Config from './config';
import Meta from './metadata';
import Thumbnails from './thumbnails';
import Title from './title';
import {backButton, configButtons} from './index.module.css';
import {topButton} from '../../listLayout/top.module.css';
import {useRouter} from 'next/router';
import Tags from './tags';
import EditorLoad from './editorLoad';
import ImagesModal from '../imagesModal';


const Editor = dynamic(() => import('./editor'), {
  loading: EditorLoad,
  ssr: false
})

const changes = {};
const handleChanges = (field, value) => {
  changes[field] = value;
}

const EditorContext = createContext();

export function useData() {
  const value = useContext(EditorContext);

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error(
      '[lettercms]: `useData` must be wrapped in a <EditorProvider />'
    );
  }

  return value;
}


export default function EditorContainer({post, blog, hasFacebook, hasInstagram}) {
  const [showImages, setShowImages] = useState(false);
  const [data, setData] = useState(post);

  const router = useRouter();

  const value = [
    data,
    (key, value) => {
      
      if (changes[key] == data[key])
        delete changes[key];
      else 
        changes[key] = value;

      if ((key === 'url' || key === 'title') && data.postStatus !== 'published') {
        const url = value.toLowerCase()
          .split(' ')
          .slice(0, 8)
          .join('-')
          .replace(/ñ/g, 'n')
          .replace(/á|à|â|ä/g, 'a')
          .replace(/é|è|ê|ë/g, 'e')
          .replace(/í|ì|î|ï/g, 'i')
          .replace(/ó|ò|ô|ö/g, 'o')
          .replace(/ú|ù|ü|û/g, 'u')
          .replace(/ñ/g, 'n')
          .replace(/"|'|¿|\?|\^|!|#|\$|%|&|\/|\(|\)/g, '');

        setData(prev => ({
          ...prev,
          url
        }));

        changes.url = url;
      }

      setData(prev => ({
        ...prev,
        [key]: value
      }))
    }
  ];

  return <EditorContext.Provider value={value}>
    <div>
      <button className={backButton + ' ' + topButton} onClick={() => router.push('/dashboard/posts')}>
        <svg className='ck ck-icon ck-button__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
      </button>
      <Top
        topImg={`${process.env.ASSETS_BASE}/illustrations/72.svg`}
        topText={data.title || 'Nueva Entrada'}
        disableTopButton
      >
        <div>
          <button className={backButton} onClick={() => router.push('/dashboard/posts')}>
            <svg className='ck ck-icon ck-button__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
          </button>
        </div>
        <div className={configButtons}>
          <Thumbnails onChange={handleChanges}/>
          <Meta categories={blog.categories}/>
          <Config onChange={handleChanges} hasFacebook={hasFacebook} hasInstagram={hasInstagram}/>
        </div>
      </Top>
      <Title/>
      <Tags blogTags={blog.tags}/>
      <Editor onOpenModal={() => setShowImages(true)}/>
      <Buttons onPreview={() => console.log(changes)} onSave={() => console.log(changes)} onPublish={() => console.log(changes)}/>
      <ImagesModal show={showImages} onClose={() => setShowImages(false)}/>
    </div>
  </EditorContext.Provider>
}


//Iconn Meta: sliders-h,