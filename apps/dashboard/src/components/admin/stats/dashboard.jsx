import {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

import dynamic from 'next/dynamic';
import Top from '../listLayout/top';
import StatsIco from '@/components/assets/adminStats';

import Base from './base';
import GeneralPanel from './general';
import Card from './statsSingleCard';
import Spinner from '@/components/svg/spinner';

const Load = () => <div>
  <span>
    <Spinner/>
  </span>
</div>;

const LineChart = dynamic(() => import('./charts/line'), {
  loading: Load,
  ssr: false
});
const BarChart = dynamic(() => import('./charts/bar'), {
  loading: Load,
  ssr: false
});
const PieChart = dynamic(() => import('./charts/pie'), {
  loading: Load,
  ssr: false
});

  const changeTime = (id, setRange, onChange) => {
    const now = Date.now();
    let newDate;

    if(id === '1')
      newDate = now - (1000 * 60 * 60 * 24 * 7);
    if(id === '2')
      newDate = now - (1000 * 60 * 60 * 24 * 30);
    if(id === '3')
      newDate = now - (1000 * 60 * 60 * 24 * 90);
    if(id === '4')
      newDate = now - (1000 * 60 * 60 * 24 * 180);
    if(id === '5')
      newDate = 'historic';

    setRange(id);
    onChange(newDate);
  };


const StatsDashboard = ({data: {referrers, urls, oss, browsers, countries, days, dates, hours}, general, onChange}) => {
  const [range, setRange] = useState('2');
  const intl = useIntl();

  referrers = Object.entries(referrers);
  urls = Object.entries(urls);

  return <div style={{width: '100%'}}>
    <Top
      ico={<StatsIco/>}
      topText={
        intl.formatMessage({
          id: 'Blog data'
        })
      }
      disableTopButton={true}
    >
      <div className='range-container'>
        <select value={range} onChange={({target: {value}}) => changeTime(value, setRange, onChange)}>
          <option value='1'>
            <FormattedMessage id='Lasts 7 days'/>
          </option>
          <option value='2'>
            <FormattedMessage id='Last month'/>
          </option>
          <option value='3'>
            <FormattedMessage id='Lasts 3 months'/>
          </option>
          <option value='4'>
            <FormattedMessage id='Lasts 6 months'/>
          </option>
          <option value='5'>
            <FormattedMessage id='All views'/>
          </option>
        </select>
      </div>
    </Top>
    <div id='stats-dashboard'>
      <Base
        rows={2}
        title={
          intl.formatMessage({
            id: 'Total views'
          })
        }
        principal
      >
        <GeneralPanel value={general.totalViews}/>
      </Base>
      <Base
        rows={2}
        title={
          intl.formatMessage({
            id: 'Bounces'
          })
        }
      >
        <GeneralPanel value={general.bounces}/>
      </Base>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'Bounce rate'
          })
        }
      >
        <GeneralPanel value={general.bounceRate} percent/>
      </Base>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'Comments'
          })
        }
      >
        <GeneralPanel value={general.totalComments}/>
      </Base>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'Subscribers'
          })
        }
      >
        <GeneralPanel value={general.subscriptors}/>
      </Base>
      <div className='stat-scroll'>
        <Base
          rows={1}
          title={
            intl.formatMessage({
              id: 'Views'
            })
          }
        >
          <LineChart data={dates}/>
        </Base>
      </div>
      <div className='stat-scroll'>
        <Base
          rows={1}
          title={
            intl.formatMessage({
              id: 'Hours'
            })
          }
        >
          <BarChart data={hours} dataKey="hora"/>
        </Base>
      </div>
      <div className='stat-scroll'>
        <Base
          rows={1}
          title={
            intl.formatMessage({
              id: 'Days'
            })
          }
        >
          <BarChart data={days} dataKey="día" translate/>
        </Base>
      </div>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'Countries'
          })
        }
      >
        <PieChart data={countries}/>
      </Base>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'Browsers'
          })
        }
      >
        <PieChart data={browsers}/>
      </Base>
      <Base
        rows={3}
        title={
          intl.formatMessage({
            id: 'OS'
          })
        }
      >
        <PieChart data={oss}/>
      </Base>
    </div>
    <span className="title">
      <FormattedMessage id='More seen'/>
    </span>
    <Card {...general.mostViewed} subdomain={general.subdomain}/>
    <span className="title">
      <FormattedMessage id='More commented'/>
    </span>
    <Card {...general.mostCommented} subdomain={general.subdomain}/>
    {
      urls.length > 0 &&
      <div className='stat-scroll'>
        <Base rows={1} title={
          intl.formatMessage({
            id: 'Posts'
          })
        }>
          <BarChart data={urls} sort={true} layout='vertical'/>
        </Base>
      </div>
    }
    {
      referrers.length > 0 &&
      <div className='stat-scroll'>
        <Base rows={1} title={
          intl.formatMessage({
            id: 'Referrers'
          })
        }>
          <BarChart data={referrers} sort={true} layout='vertical'/>
        </Base>
      </div>
    }
    <style jsx>{`
      .range-container {
        width: 9rem;
      }
      .title {
        margin-left: 2.5%;
      }
      #stats-dashboard {
        display: flex;
        flex-wrap: wrap;
        position: relative;  
      }
      #select-container {
        padding: 1rem 25px 0;
        width: 100%;
        display: flex;
        justify-content: end;
      }
      #select-container select {
        width: 200px;
      }
      .stat-scroll {
        width: 100%;
      }
      @media (max-width: 480px) {
        #stats-dashboard {
          display: block;
        }
        .stat-scroll {
          overflow-x: scroll;
        }
        :global(.chart-container) {
          width: 90% !important;
        }
        :global(.stat-rows-1) {
          width: 1200px !important;
        }
      }
    `}</style>
  </div>;
};

export default StatsDashboard;
