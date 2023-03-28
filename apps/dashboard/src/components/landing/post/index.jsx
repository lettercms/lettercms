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
    <div className='flex'>
      <div id='post-main'>
        <Container className='bg-white'>
          <span>
            {
              intl.formatMessage({id: 'Posted on '}) + HandleDate.getGMTDate(published)
            }
          </span>
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
    <style jsx>{`
      main {
        padding: 2rem 5%;
        width: 100%;
      }
      #post-main {
        width: 100%;
        max-width: 60rem;
        margin: auto;
      }
      .flex {
        align-items: start;
      }
      @media (min-width: 1024px) {
        main {
          padding: 2rem 10%;
        }
      }
    `}</style>
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
      #post-main a {
        color: #03a9f4;
      }
      .ex-basic-1 {
        padding-top: 2rem;
        padding-bottom: 0.875rem;
      }
      .ex-basic-1 .breadcrumbs {
        margin-bottom: 1.125rem;
      }
      .ex-basic-1 .breadcrumbs .fa {
        margin-right: 0.5rem;
        margin-left: 0.625rem;
      }
      .ex-basic-2 {
        padding-top: 4.75rem;
        padding-bottom: 4rem;
      }
      .ex-basic-2 h3 {
        margin-bottom: 1rem;
      }
      .ex-basic-2 .text-container {
        margin-bottom: 3.625rem;
      }
      .ex-basic-2 .text-container.last {
        margin-bottom: 0;
      }
      .ex-basic-2 .text-container.dark {
        padding: 1.625rem 1.5rem 0.75rem 2rem;
        background-color: #f3f7fd;
      }
      .ex-basic-2 .image-container-large {
        margin-bottom: 4rem;
      }
      .ex-basic-2 .image-container-large img {
        border-radius: 0.25rem;
      }
      .ex-basic-2 .image-container-small img {
        border-radius: 0.25rem;
      }
      .ex-basic-2 .list-unstyled .fas {
        color: #5f4dee;
        font-size: 0.5rem;
        line-height: 1.625rem;
      }
      .ex-basic-2 .list-unstyled .media-body {
        margin-left: 0.625rem;
      }
      .ex-basic-2 .form-container {
        margin-top: 3rem;
      }
      .ex-basic-2 .btn-outline-reg {
        margin-top: 1.75rem;
      }
      .ex-footer-frame {
        width: 100%;
        height: 2.75rem;
        background-color: #f3f7fd;
      }
      @media (min-width: 768px) {
        .ex-basic-2 {
          padding-bottom: 5rem;
        }
      }
      @media (min-width: 1200px) {
        .ex-basic-2 .form-container {
          margin-left: 1.75rem;
        }
        .ex-basic-2 .image-container-small {
          margin-left: 1.75rem;
        }
      }
    `}</style>
  </div>;
};
