import {useEffect} from 'react';
import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';
import Cookies from 'js-cookie';
import {useToken} from '@/lib/userContext';


export default function Layout({children}) {
  const {accessToken} = useToken();
  const {query: {url}} = useRouter();

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

          if (url)
            _sdk.createRequest(`/user/${id}/recommendation`, 'POST', {url});
        });
      }

      _sdk.stats.startTrace();
      
      if (url) {
        _sdk.stats.setView(url, document.referrer);

        if (userID && userID !== 'undefined' && userID !== 'null' && userID !== 'no-user')
          _sdk.createRequest(`/user/${userID}/recommendation`, 'POST', {url});
      }

    }

  }, [accessToken, url]);

  return children;
};
