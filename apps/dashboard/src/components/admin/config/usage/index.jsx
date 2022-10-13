import {useEffect, useState} from 'react';
import sdk from '@lettercms/sdk';
import Base from '../../stats/base';
import dynamic from 'next/dynamic';
import BaseLoad from '../../stats/baseLoad';

const loading = () => <div style={{display: 'flex', justifyContent: 'center'}}>
  <span>
    <img alt='Spinner' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/spinner-black.svg' style={{animation: 'rotation linear .6s infinite', width: 75}}/>
  </span>
</div>;

const CardLoad = () => <BaseLoad rows={1}/>;

const CircleChart = dynamic(() => import('../../stats/circleChart'), {
  ssr: false,
  loading
});

const UI = ({limits}) => {
  return <>
    <Base title='Almacenamiento' rows={1} style={{height: 380}}>
      <CircleChart data={limits.files.storage} labels={[
        'Has usado',
        (limits.files.storage.used / 1024 / 1024).toFixed(2) + 'MB',
        `Te restan ${(limits.files.storage.available / 1024/ 1024).toFixed(2)}MB`
      ]}/>
      <CircleChart data={limits.files.upload} labels={[
        'Has subido',
        limits.files.upload.used + ' archivos',
        `Te restan ${limits.files.upload.available} cargas`
      ]}/>
    </Base>
    <Base title='Páginas' rows={2} style={{height: 380}}>
      <CircleChart data={limits.pages} labels={[
        'Has publicado',
        limits.pages.used + ' paginas',
        `Te restan ${limits.pages.available}`
      ]}/>
    </Base>
    <Base title='Posts de Instagram' rows={2} style={{height: 380}}>
      <CircleChart data={limits.social.instagramPosts} labels={[
        'Has publicado',
        limits.social.instagramPosts.used + ' posts',
        `Te restan ${limits.social.instagramPosts.available}`
      ]}/>
    </Base>
    <Base title='Posts programados' rows={2} style={{height: 380}}>
      <CircleChart data={limits.social.schedule} labels={[
        'Has programado',
        limits.social.schedule.used + ' posts',
        `Te restan ${limits.social.schedule.available}`
      ]}/>
    </Base>
    <Base title='Pruebas A/B' rows={2} style={{height: 380}}>
      <CircleChart data={limits.ab.tests} labels={[
        'Has usado',
        limits.ab.tests.used + ' pruebas',
        `Te restan ${limits.ab.tests.available} pruebas`
      ]}/>
    </Base>
  </>;
};

const Usage = () => {
  const [isLoading, changeLoad] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    sdk.createRequest('/usage')
      .then(limits => {
        setData(limits);
        changeLoad(false);
      });
  }, []);

  return <div className='config-opts'>
    {
      isLoading
        ? <CardLoad/>
        : <UI limits={data}/>
    }
    <style>{`
      .config-opts {
        padding: 0 2.5%;
        flex-direction: row;
        flex-wrap: wrap;
      }
    `}</style>
  </div>;
};

export default Usage;
