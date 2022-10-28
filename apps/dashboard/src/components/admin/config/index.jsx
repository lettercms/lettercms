import { useState, useRef, useEffect } from 'react';
import BaseLoad from '../stats/baseLoad';
import AccountLoad from './account/load';
import Top from '../top';
import dynamic from 'next/dynamic';
import ConfigAside from './configAside';
import asyncImport from '@/lib/asyncImportScript';


const Blog = dynamic(() => import('./blogConfig'), {
  loading: () => <div className='config-opts'>
    <BaseLoad rows={1}/>
  </div>
});
/*const Payment = dynamic(() => import('./payment'), {
  loading: () => <div className='config-opts'>
    <BaseLoad rows={2}/>
    <BaseLoad rows={2}/>
  </div>,
  ssr: false
});*/

const Developers = dynamic(() => import('./developers'), {
  loading: () => <div className='config-opts'>
    <BaseLoad rows={1}/>
  </div>,
  ssr: false
});

const Usage = dynamic(() => import('./usage'), {
  loading: () => <div className='config-opts'>
    <BaseLoad rows={1}/>
  </div>,
  ssr: false
});
const Account = dynamic(() => import('./account'), {
  loading: () => <AccountLoad/>,
  ssr: false
});



export default function Config({tab}) {
  const buttonRef = useRef();

  useEffect(() => {
    asyncImport(
      'cropper-js',
      'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css',
      'css'
    );

    asyncImport(
      'cropper-css',
      'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js'
    );
  }, []);
    
  let UI;

  if (tab === 'blog')
    UI = <Blog button={buttonRef}/>;

  //if (tab === 'payment')
  //  UI = <Payment/>;

  if (tab === 'developers')
    UI = <Developers/>;

  if (tab === 'account')
    UI = <Account button={buttonRef}/>;

  if (tab === 'usage')
    UI = <Usage/>;

    return (
      <div id="config-main">
        <Top
          buttonRef={buttonRef}
          buttonText='Guardar'
        />
        <div className='flex'>
          <ConfigAside active={tab}/>
          <div className='config-container'>
            {UI}
          </div>
        </div>
        <style jsx global>{`
          .config-opts {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 15px auto 0;
            width: 75%;
            position: absolute;
            right: 0;
            padding: 0 10%;
          }
          ul.config-opts li {
            display: flex;
            flex-direction: column;
            margin: 25px 0;
            max-width: 400px;
          }
          ul.config-opts li span,
          ul.config-opts li button {
            margin: 15px 0;
          }
        `}</style>
        <style jsx>{`
          .title {
            flex-grow: 1;
          }
          #config-main {
            width: 100%;
          }
          .flex {
            margin-top: 1rem;
            align-items: start;
          }
          .config-container {
            flex-grow: 1;
          }
        `}</style>
      </div>
    );
  }
