import {useEffect, useState} from 'react';
import Input from '@/components/input';
import {useData} from './index';

export default function Title() {
  const [data, setData] = useData();

  return <div style={{width: 400, margin: 'auto'}}>
    <Input value={data.title} onChange={({target: {value}}) => setData('title', value)}label='Título'/>
  </div>;
}