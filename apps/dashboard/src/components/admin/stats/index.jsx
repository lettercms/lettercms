import { useState, useEffect } from 'react';
import {useUser} from '@/lib/dashboardContext';
import sdk from '@lettercms/sdk';
import CardLoad from './baseLoad';
import dynamic from 'next/dynamic';

const Load = () => {
  return <div style={{display: 'flex', flexWrap: 'wrap'}}>
    <CardLoad rows={2}/>
    <CardLoad rows={2}/>
    <CardLoad rows={3}/>
    <CardLoad rows={3}/>
    <CardLoad rows={3}/>
  </div>;
};

const Dashboard = dynamic(() => import('./dashboard'), {
  ssr: false,
  loading: () => <Load/>
});

const NoData = dynamic(() => import('./noData'), {
  ssr: false,
  loading: () => <Load/>
});


const fetchData = start => {
  const fields = [
    'data.referrers',
    'data.views',
    'data.os',
    'data.browsers',
    'data.countries',
    'data.days',
    'data.dates',
    'data.hours',
    'general.totalViews',
    'general.bounces',
    'general.bounceRate',
    'general.totalComments',
    'general.subscriptors',
    'general.mostViewed',
    'general.subdomain',
    'general.mostCommented'
  ];

  if (start)
    return sdk.stats.all({
      start,
      fields
    });

  return sdk.stats.all(fields);
}

export default function Stats() {
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const {status} = useUser();

  useEffect(() => {
    if (status === 'done')
      fetchData()
        .then(e => {
          if (e.general.totalViews === 0 && e.general.totalComments === 0) {
            setHasData(false);
            setLoading(false);
          } else {
            setHasData(true);
            setLoading(false); 
            setData(e); 
          }
        });

  }, [status]);

  const reload = start => {
    setLoading(false);
    
    fetchData(start)
      .then(e => {
        setLoading(false); 
        setData(e); 
      });
  }

  return <div>
    {
      loading &&
      <Load/>
    }
    {
      !loading && hasData &&
      <Dashboard {...data} onChange={reload}/>
    }
    {
      !loading && !hasData &&
      <NoData/>
    }
    <style jsx>{`
      :global(#content > div) {
        width: 100%;
      }
      :global(#content > div > div) {
        height: 100%;
      }
    `}</style>
  </div>
}
