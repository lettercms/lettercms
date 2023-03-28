import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Input from '@/components/input';
import {useData} from './index';

export default function Title() {
  const [data, setData] = useData();
  const intl = useIntl();

  return <div className='title-input'>
    <Input value={data.title} onChange={({target: {value}}) => setData('title', value)} label={intl.formatMessage({id: 'Title'})}/>
    <style jsx>{`

      .title-input {
        width: 80%;
        max-width: 400px;
        margin: auto;
      }
    `}</style>
  </div>;
}