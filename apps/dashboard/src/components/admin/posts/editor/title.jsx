import {useEffect, useState} from 'react';
import Input from '@/components/input';

export default function Title({onChange, title: _t}) {
  const [title, setTitle] = useState(_t || '');

  useEffect(() => {
    onChange('title', title);
  }, [title]);

  return <div style={{width: 400, margin: 'auto'}}>
    <Input value={title} onChange={({target: {value}}) => setTitle(value)}label='Título'/>
  </div>
}