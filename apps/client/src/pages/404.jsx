import NotFound from '@lettercms/ui/pages/404';
import {useEffect, useState} from 'react';

const NotFoundPage = () => {
  const [main, setMain] = useState('/');

  useEffect(() => {
    fetch('/api/blog')
      .then(e => e.json())
      .then(e => setMain(e.blog.mainUrl));
  }, []);

  return <NotFound href={main}/>;
};

export default NotFoundPage;
