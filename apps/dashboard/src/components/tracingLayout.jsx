import {useEffect, useState} from 'react';
import sdk from '@lettercms/sdk';
import Router from 'next/router';
import {parse as cookieParser} from 'cookie';
import Cookies from 'js-cookie';

const _sdk = new sdk.Letter(process.env.TRACK_TOKEN);

const Layout = ({children, userID}) => {
  useEffect(() => {/*
    const {userID} = cookieParser(document.cookie);
    
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

    _sdk.stats.startTrace();*/
  }, []);

  return children;
};

export default Layout;
