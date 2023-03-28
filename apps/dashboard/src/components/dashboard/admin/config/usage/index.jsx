import {useEffect, useState} from 'react';
import sdk from '@lettercms/sdk';
import BaseLoad from '../../stats/baseLoad';
import {useUser} from '@/components/dashboard/layout';
import dynamic from 'next/dynamic';

const CardLoad = () => <BaseLoad rows={1}/>;

const Charts = dynamic(() => import('./charts'), {
  ssr: false,
  loading: CardLoad
});

export default function Usage() {
  const [isLoading, changeLoad] = useState(true);
  const [data, setData] = useState(null);
  const {status} = useUser();

  useEffect(() => {
    if (status === 'done')
      sdk.createRequest('/usage')
        .then(limits => {
          setData(limits);
          changeLoad(false);
      });
  }, [status]);

  return <div className='config-opts'>
    {
      isLoading
        ? <CardLoad/>
        : <Charts limits={data}/>
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
