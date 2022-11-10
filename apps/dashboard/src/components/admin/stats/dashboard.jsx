import {useState} from 'react';
import dynamic from 'next/dynamic';
import Top from '../listLayout/top';

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

  return <div>
    <Top
      topImg={`${process.env.ASSETS_BASE}/illustrations/72.svg`}
      topText='Datos del Blog'
      disableTopButton={true}
    >
      <div>
        <select value={range} onChange={({target: {value}}) => changeTime(value, setRange, onChange)}>
          <option value='1'>Ultimos 7 dias</option>
          <option value='2'>Ultimo mes</option>
          <option value='3'>Ultimos 3 meses</option>
          <option value='4'>Ultimos 6 meses</option>
          <option value='5'>Desde la creacion del blog</option>
        </select>
      </div>
    </Top>
    <div id='stats-dashboard'>
      <Base rows={2} title='Vistas Totales' principal>
        <GeneralPanel value={general.totalViews}/>
      </Base>
      <Base rows={2} title='Rebotes'>
        <GeneralPanel value={general.bounces}/>
      </Base>
      <Base rows={3} title='Taza de Rebote'>
        <GeneralPanel value={general.bounceRate} percent/>
      </Base>
      <Base rows={3} title='Comentarios'>
        <GeneralPanel value={general.totalComments}/>
      </Base>
      <Base rows={3} title='Subscriptores'>
        <GeneralPanel value={general.subscriptors}/>
      </Base>
      <Base rows={1} title='Vistas'>
        <LineChart data={dates}/>
      </Base>
      <Base rows={1} title='Horas'>
        <BarChart data={hours} dataKey="hora"/>
      </Base>
      <Base rows={1} title='Días'>
        <BarChart data={days} dataKey="día"/>
      </Base>
      <Base rows={3} title='Países'>
        <PieChart data={countries}/>
      </Base>
      <Base rows={3} title='Navegadores'>
        <PieChart data={browsers}/>
      </Base>
      <Base rows={3} title='Sistema Operativo'>
        <PieChart data={oss}/>
      </Base>
    </div>
    <span className="title">Más Visto</span>
    <Card {...general.mostViewed} subdomain={general.subdomain}/>
    <span className="title">Más Comentado</span>
    <Card {...general.mostCommented} subdomain={general.subdomain}/>
    <Base rows={1} title='Entradas'>
      <BarChart data={urls} sort={true} layout='vertical'/>
    </Base>
    <Base rows={1} title='Origenes'>
      <BarChart data={referrers} sort={true} layout='vertical'/>
    </Base>
    <style jsx>{`
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
    `}</style>
  </div>;
};

export default StatsDashboard;
