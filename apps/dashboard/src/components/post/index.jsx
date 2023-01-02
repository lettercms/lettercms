import {useEffect, useState} from 'react';
import sdk from '@lettercms/sdk';
import dynamic from 'next/dynamic';
import {parse as cookieParser} from 'cookie';
import Header from './header';
import Breadcrumbs from './breadcrumbs';
import Tags from './tags';
import Comments from './comments/index';
import Subscription from './subscription';

import Head from '@/components/headPost';
import Footer from '@/components/index/footer';
import Layout from '@/components/tracingLayout';
import Base from '@/components/admin/stats/base';
import HandleDate from '@/lib/handleDate';
import Card from '@/components/blog/card';
import initLazyLoad from '@/lib/initLazyLoad';

const BlogPost = ({isAdmin, isPreview, user, recommendation: {recommended, similar}, post: {_id, content, title, url, published, updated, thumbnail, tags, description}, referrer, notFound}) => {
  const [stateUser, setUser] = useState(user);

  const hasRecommendation = recommended && similar && !isPreview;

  useEffect(() => {
    if (!notFound && !isPreview)
      initLazyLoad();
  }, [url, notFound, isPreview]);

  return <Layout>
    <Head
      title={`${title} | LetterCMS`}
      description={description}
      url={url}
      ogImage={thumbnail}
      published={published}
      updated={updated}
      tags={tags}
    />
    <div>
      <Header title={title} thumbnail={thumbnail}/>
      <Breadcrumbs title={title}/>
      <div className='flex'>
        <div id='post-main'>
          <Base rows={1} style={{height: 'auto', flexDirection: 'column', alignItems: 'start' }} title={`Publicado el ${HandleDate.getGMTDate(published)}`}>
            <main dangerouslySetInnerHTML={{ __html: content }}/>
            <Tags tags={tags}/>
          </Base>
          {/*
            !stateUser?.email &&
            <Base principal rows={1} style={{height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
              <Subscription onSubscribe={setUser} user={stateUser}/>
            </Base>
          */}
        </div>
      </div>
      <Breadcrumbs title={title}/>
        <Base rows={1} title={hasRecommendation ? 'Recomendados para ti' : ''} style={{flexWrap: 'wrap', height: 'auto', width: '100%', borderRadius: '1rem 1rem 0 0', margin: '1rem 0 0'}}>
          {
            hasRecommendation &&
            <>
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
        </Base>
      <Footer isPost/>
    </div>
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
  </Layout>;
};

export default BlogPost;
