import { useState, useRef, useEffect } from 'react';
import BaseLoad from '../stats/baseLoad';
import AccountLoad from './account/load';
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
    UI = <Blog/>;

  //if (tab === 'payment')
  //  UI = <Payment/>;

  if (tab === 'developers')
    UI = <Developers/>;

  if (tab === 'account')
    UI = <Account/>;

  if (tab === 'usage')
    UI = <Usage/>;

    return (
      <div id="config-main">
        {UI}
        <style jsx global>{`
          #config-main {
            width: 80%;
          }
          .config-opts {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 15px auto 0;
            width: 100%;
            position: absolute;
            right: 0;
            padding: 0 20%;
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
      </div>
    );
  }
