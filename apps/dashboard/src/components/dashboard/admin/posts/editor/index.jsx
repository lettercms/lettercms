import {useState, createContext, useContext, useRef} from 'react';
import {useIntl} from 'react-intl';
import dynamic from 'next/dynamic';
import Top from '../../listLayout/top';
import Buttons from './buttons';
import Config from './config';
import Meta from './metadata';
import Thumbnails from './thumbnails';
import Title from './title';
import {backButton, configButtons} from './index.module.css';
import {topButton} from '../../listLayout/top.module.css';
import Router from 'next/router';
import Tags from './tags';
import EditorLoad from './editorLoad';
import ImagesModal from '../imagesModal';
import sdk from '@lettercms/sdk';
import {useUser} from '@/components/dashboard/layout';

import Ico from '@/components/dashboard/assets/adminPost';

const Editor = dynamic(() => import('./editor'), {
  loading: EditorLoad,
  ssr: false
});

const promote = {};
let changes = {};

const handleChanges = (field, value) => {
  changes[field] = value;
};

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

const draft = async (id, {clearTimeout, setLoading, setData}) => {
  clearTimeout();

  setLoading(true);

  try {
    await sdk.createRequest(`/post/${id}/draft`, 'POST');
  } catch(err) {
    throw err;
  }

  setData('postStatus', 'draft');
  setLoading(false);
};

const publish = async (id, {clearTimeout, setLoading, setData, status}, intl) => {
  clearTimeout();
    
  setLoading(true);

  try {
    await sdk.createRequest(`/post/${id}/publish`, 'POST', {
      ...changes,
      promote
    });

    changes = {};
  } catch(err) {
    throw err;
  }

  if (status === 'published')
    alert(
      intl.formatMessage({
        id: 'Published successfully'
      })
    );
  else
    alert(
      intl.formatMessage({
        id: 'Updated successfully'
      })
    );

  Router.push('/dashboard/posts');
};

const update = async (id, {clearTimeout, setLoading, isPublished}, intl) => {
  clearTimeout();
    
  setLoading(true);

  try {
    await sdk.createRequest(`/post/${id}/update`, 'POST', changes);
      
    changes = {};
  } catch(err) {
    throw err;
  }

  alert(
    intl.formatMessage({
      id: 'Updated successfully'
    })
  );

  setLoading(false);

  if (isPublished)
    return Router.push('/dashboard/posts');
};

const preview = async (id, {clearTimeout, setLoading, domain}) => {
  clearTimeout();
  
  setLoading(true);

  try {
    await sdk.createRequest(`/post/${id}/update`, 'POST', changes);

    changes = {};
  } catch(err) {
    throw err;
  }
  
  setLoading(false);

  window.open(`https://${domain}/api/preview?id=${id}`);
};

export default function EditorContainer({post, blog, hasFacebook, hasInstagram}) {
  const [showImages, setShowImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(post);
  const timer = useRef();
  const user = useUser();
  const intl = useIntl();

  const router = Router.useRouter();

  const value = [
    {
      ...data,
      loading,
      promote
    },
    (key, value) => {

      if (timer.current)
        clearTimeout(timer.current);
      
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
      }));

      if (data.postStatus !== 'published') {
        timer.current = setTimeout(() => {
          update(data._id, {
            clearTimeout: () => clearTimeout(timer.current),
            setLoading
          }, intl);
        }, 20000);
      }
    },
    (key, value) => {
      promote[key] = value;
    }
  ];

  return <EditorContext.Provider value={value}>
    <div>
      <button className={backButton + ' ' + topButton} onClick={() => router.push('/dashboard/posts')}>
        <svg className='ck ck-icon ck-button__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
      </button>
      <Top
        ico={<Ico/>}
        topText={data.title || intl.formatMessage({id: 'New post'})}
        disableTopButton
      >
        <div>
          <button className={backButton} onClick={() => {
            if (Object.keys(changes).length !== 0) {

              if (confirm(
                intl.formatMessage({
                  id: 'There are unsaved changes, are you sure of exit?'
                })
              ))
                router.push('/dashboard/posts');
            } else {
              router.push('/dashboard/posts');
            }
          }}>
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
      <Editor onOpenModal={setShowImages}/>
      <Buttons
        onPreview={
          () => preview(data._id, {
            clearTimeout: () => clearTimeout(timer.current),
            setLoading,
            setData,
            domain: user.blog?.domain
          }, intl)
        }
        onSave={
          () => data.postStatus === 'published'
          ? draft(data._id, {
            clearTimeout: () => clearTimeout(timer.current),
            setLoading,
            setData
          })
          : update(data._id, {
            clearTimeout: () => clearTimeout(timer.current),
            setLoading
          }, intl)
        }
        onPublish={
          () => data.postStatus === 'published'
          ? update(data._id, {
            clearTimeout: () => clearTimeout(timer.current),
            setLoading
          }, intl)
          : publish(data._id, {
              clearTimeout: () => clearTimeout(timer.current),
              setLoading,
              setData,
              status: data.postStatus
            }, intl)
        }
      />
      <ImagesModal show={showImages} onClose={() => setShowImages(false)}/>
    </div>
  </EditorContext.Provider>;
}
