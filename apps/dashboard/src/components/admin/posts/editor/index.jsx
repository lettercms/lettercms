import {useState} from 'react';
import Editor from './editor';
import Top from '../../listLayout/top';
import Buttons from './buttons';
import Config from './config';
import Meta from './metadata';
import Title from './title';
import {backButton, configButtons} from './index.module.css';
import {topButton} from '../../listLayout/top.module.css';
import {useRouter} from 'next/router';
import Tags from './tags';


export default function EditorContainer({post: {_id, content, title: _t, tags}, blog, hasFacebook, hasInstagram}) {
  const [title, setTitle] = useState(_t);

  const router = useRouter();

  return <div>
    <button className={backButton + ' ' + topButton} onClick={() => router.push('/dashboard/posts')}>
      <svg className='ck ck-icon ck-button__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
    </button>
    <Top
      topImg={`${process.env.ASSETS_BASE}/illustrations/72.svg`}
      topText={title || 'Nueva Entrada'}
      disableTopButton
    >
      <div>
        <button className={backButton} onClick={() => router.push('/dashboard/posts')}>
          <svg className='ck ck-icon ck-button__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
        </button>
      </div>
      <div className={configButtons}>
        <Meta categories={blog.categories}/>
        <Config hasFacebook={hasFacebook} hasInstagram={hasInstagram}/>
      </div>
    </Top>
    <Title title={title} onChange={(t, v) => setTitle(v)}/>
    <Tags tags={tags} blogTags={blog.tags}/>
    <Editor content={content}/>
    <Buttons/>
  </div>
}


//Iconn Meta: sliders-h,