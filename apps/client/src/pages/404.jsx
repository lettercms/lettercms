import {useEffect, useState} from 'react';
//import sdk from '@lettercms/sdk';
import NotFound from '@lettercms/ui/pages/404';
//import {useToken} from '@/components/userContext';

const NotFoundPage = () => {
  const [main, setMain] = useState('/');

/*  const {status} = useToken();
  useEffect(() => {
    if (status === 'done') {
      sdk.blogs.single(['mainUrl'])
        .then(e => setMain(e.mainUrl));
    }
  }, [status]);*/

  return <NotFound href={main}/>;
};

export default NotFoundPage;
