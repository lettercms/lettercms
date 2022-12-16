import Base from '../../stats/base';
import dynamic from 'next/dynamic';
import Spinner from '@/components/svg/spinner';

const loading = () => <div style={{display: 'flex', justifyContent: 'center'}}>
  <span>
    <Spinner fill='#000'/>
  </span>
</div>;

const CircleChart = dynamic(() => import('../../stats/circleChart'), {
  ssr: false,
  loading
});

export default function Charts({limits}){
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
