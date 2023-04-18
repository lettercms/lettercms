import {useEffect, useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

import Header from './header';
import Layout from '@/components/landing/layout';
import initLazyLoad from '@/lib/initLazyLoad';
import Breadcrumbs from './breadcrumbs';
import Container from '@/components/container';
import HandleDate from '@/lib/handleDate';
import Tags from './tags';
import Card from '@/components/landing/blog/card';

/*
import Head from '@/components/landing/headPost';
import Comments from './comments/index';
import Subscription from './subscription';

import Base from '@/components/dashboard/admin/stats/base';
*/
export default function BlogPost({isAdmin, isPreview, user, recommendation: {recommended, similar}, post: {_id, content, title, url, published, updated, thumbnail, tags, description}, referrer, notFound}) {
  const [stateUser, setUser] = useState(user);
  const intl = useIntl();

  const hasRecommendation = recommended && similar && !isPreview;

  useEffect(() => {
    if (!notFound && !isPreview)
      initLazyLoad();
  }, [url, notFound, isPreview]);

  return <div>
    {
      /*<Head
          title={`${title} | LetterCMS`}
          description={description}
          url={url}
          ogImage={thumbnail}
          published={published}
          updated={updated}
          tags={tags}
        />*/
    }
    <Header title={title} thumbnail={thumbnail}/>
    <Breadcrumbs title={title}/>
    <div className='flex flex-col'>
      <div id='post-main'>
        <Container className='bg-white w-full'>
          <div className='mb-4'>
            <span className='text-main-700 text-sm font-bold'>
              {
                intl.formatMessage({id: 'Posted on '}) + HandleDate.getGMTDate(published)
              }
            </span>
          </div>
          <main dangerouslySetInnerHTML={{ __html: content }}/>
          <Tags tags={tags}/>
        </Container>
        {
          /*
                  !stateUser?.email &&
                  <Base principal rows={1} style={{height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                    <Subscription onSubscribe={setUser} user={stateUser}/>
                  </Base>
                */
        }
      </div>
    </div>
    <Breadcrumbs title={title}/>
    <Container>
      {
        hasRecommendation &&
        <>
          <span>
            <FormattedMessage id='Recommended for you'/>
          </span>
          <Card
            title={recommended.title}
            content={recommended.description}
            url={recommended.url}
            fullUrl={recommended.fullUrl}
            thumbnail={recommended.thumbnail}
            comments={0}
            ID={recommended._id}
          />
          <Card
            title={similar.title}
            content={similar.description}
            url={similar.url}
            fullUrl={similar.fullUrl}
            thumbnail={similar.thumbnail}
            comments={0}
            ID={similar._id}
          />
        </>
      }
      {/*<Comments id={_id} user={stateUser}/>*/}
    </Container>
    <style jsx global>{`
      main img {
        max-width: 100%;
      }
      .lazy-img {
        filter: blur(5px);
      }
      @media (max-width: 720px) {
        .chart-container {
          width: 100% !important;
          margin: 15px 0 !important;
        }
      }
      body {
        background: #f3f7fd;
      }
      main a {
        color: var(--main);
      }
      main b,
      main strong {
        color: var(--main-alt);
      }
    `}</style>
  </div>;
};
