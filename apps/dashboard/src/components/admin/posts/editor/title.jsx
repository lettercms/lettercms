import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Input from '@/components/input';
import {useData} from './index';

export default function Title() {
  const [data, setData] = useData();
  const intl = useIntl();

  return <div style={{width: 400, margin: 'auto'}}>
    <Input value={data.title} onChange={({target: {value}}) => setData('title', value)} label={intl.formatMessage({id: 'Title'})}/>
  </div>;
}