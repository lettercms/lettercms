'use client';

import {useState} from 'react';
import sdk from '@lettercms/sdk';
import Input from '@/components/input';
import Button from '@/components/button';
import Cookie from 'js-cookie';
import {useToken} from '@/components/landing/layout';

async function assignName(name, accessToken, cb) {
  try { 
    const _sdk = new sdk.Letter(accessToken);

    let userID = Cookie.get('userID');

    if (!userID || userID === 'undefined' || userID === 'null' || userID === 'no-user') {

      const {id} = await _sdk.createRequest('/user','POST', {
        device: /Android|iPhone|iPad|mobile|phone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
      });

      Cookies.set('userID', id, {
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      });
    }

    await _sdk.createRequest(`/user/${userID}`, 'PATCH', {
      name
    });

    cb(null, name);
  } catch(err) {
    cb(err);
  }
}

export default function UserData({onSetName}) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const {accessToken} = useToken();

  return <div>
    <Input id='name' label='Nombre' value={name} onChange={({target: {value}}) => setName(value)}/>
    <Button
      type='outline'
      loading={loading}
      alt
      onClick={() => {
        setLoading(true);

        assignName(name, accessToken, (err, n) => {
          setLoading(false);

          if (!err)
            onSetName(n);
          else
            alert('Error al utilizar el nombre');
        });
      }
    }
    >Utilizar Nombre</Button>
  </div>;
}
