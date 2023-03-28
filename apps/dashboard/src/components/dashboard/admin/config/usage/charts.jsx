import {useIntl, FormattedMessage} from 'react-intl';
import Base from '../../stats/base';
import dynamic from 'next/dynamic';
import Spinner from '@lettercms/icons/spinner';

const loading = () => <div style={{display: 'flex', justifyContent: 'center'}}>
  <span>
    <Spinner fill='#000'/>
  </span>
</div>;

const CircleChart = dynamic(() => import('../../stats/circleChart'), {
  ssr: false,
  loading
});

export default function Charts({limits}) {
  const intl = useIntl();

  const storageText = intl.formatMessage({id: 'You have {storage}MB left'});
  const uploadText = intl.formatMessage({id: 'You have {uploads} uploads left'});
  const pagesText = intl.formatMessage({id: 'You have {pages} left'});
  const igText = intl.formatMessage({id: 'You have {instagramPosts} left'});
  const schedulesText = intl.formatMessage({id: 'You have {schedules} left'});
  const testText = intl.formatMessage({id: 'You have {tests} tests left'});

  return <>
    <Base title={intl.formatMessage({id: 'Storage'})} rows={1} style={{height: 380}}>
      <CircleChart data={limits.files.storage} labels={[
        intl.formatMessage({id: 'You have used'}),
        `${(limits.files.storage.used / 1024 / 1024).toFixed(2)}MB`,
        storageText.replace('{storage}', (limits.files.storage.available / 1024/ 1024).toFixed(2))
      ]}/>
      <CircleChart data={limits.files.upload} labels={[
        intl.formatMessage({id: 'You have uploaded'}),
        `${limits.files.upload.used} ${intl.formatMessage({id: 'files'})}`,
        uploadText.replace('{uploads}', limits.files.upload.available)
      ]}/>
    </Base>
    <Base title={intl.formatMessage({id: 'Pages'})} rows={2} style={{height: 380}}>
      <CircleChart data={limits.pages} labels={[
        intl.formatMessage({id: 'You have published'}),
        `${limits.pages.used} ${intl.formatMessage({id: 'pages'})}`,
        pagesText.replace('{pages}', limits.pages.available)
      ]}/>
    </Base>
    <Base title={intl.formatMessage({id: 'Instagram posts'})} rows={2} style={{height: 380}}>
      <CircleChart data={limits.social.instagramPosts} labels={[
        intl.formatMessage({id: 'You have published'}),
        `${limits.social.instagramPosts.used} posts`,
        igText.replace('{instagramPosts}', limits.social.instagramPosts.available)
      ]}/>
    </Base>
    <Base title={intl.formatMessage({id: 'Scheduled posts'})} rows={2} style={{height: 380}}>
      <CircleChart data={limits.social.schedule} labels={[
        intl.formatMessage({id: 'You have scheduled'}),
        `${limits.social.schedule.used} posts`,
        schedulesText.replace('{schedules}', limits.social.schedule.available)
      ]}/>
    </Base>
    <Base title={intl.formatMessage({id: 'Split tests'})} rows={2} style={{height: 380}}>
      <CircleChart data={limits.ab.tests} labels={[
        intl.formatMessage({id: 'You have used'}),
        `${limits.ab.tests.used} ${intl.formatMessage({id: 'tests'})}`,
        testText.replace('{tests}', limits.ab.tests.available)
      ]}/>
    </Base>
    <style jsx global>{`
      @media (max-width: 480px) {
        .stat-rows-1 {
          flex-direction: column !important;
          height: 620px !important;
        }
      }
    `}</style>
  </>;
};
