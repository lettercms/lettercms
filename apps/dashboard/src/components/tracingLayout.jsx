import {useEffect, useState} from 'react';
import sdk from '@lettercms/sdk';
import Router from 'next/router';
import Cookies from 'js-cookie';
import {useToken} from '@/lib/userContext';


const Layout = ({children, userID}) => {
  const {accessToken} = useToken();

  useEffect(() => {
    if (accessToken) {
      const _sdk = new sdk.Letter(accessToken);

      const userID = Cookies.get('userID');

      if (!userID){
        _sdk.createRequest('/user','POST', {
          device: /Android|iPhone|iPad|mobile|phone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        }).then(({id}) => {
          Cookies.set('userID', id, {
            path: '/',
            secure: process.env.NODE_ENV === 'production'
          });
        });
      }

      _sdk.stats.startTrace();
    }

  }, [accessToken]);

  return children;
};

export default Layout;
