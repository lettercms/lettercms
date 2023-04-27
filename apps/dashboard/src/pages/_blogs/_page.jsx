import {useEffect} from 'react';
import PageHead from '@/components/client/pageHead';
import sdk from '@lettercms/sdk';
import Router from 'next/router';
import jwt from 'jsonwebtoken';

export async function getServerSideProps({query: {subdomain}}) {
  const token = jwt.sign({subdomain}, process.env.JWT_AUTH);

  const subSDK = new sdk.Letter(token);

  try {
    const page = await subSDK.pages.single(query.ID, [
      'images',
      'html',
      'css',
      'title',
      'description'
    ]);

    return {
      props: page
    };
  } catch (err) {
    throw err;
  }
}

export default function Page({html, css, title, description, image, pathname}) {

  useEffect(() => {
    const links = document.getElementsByTagName('a');

    links.forEach(e => {
      e.onclick = ev => {
        if (e.attributes.target !== '_blank') {
          ev.preventDefault();
          Router.push(e.attributes.href);
        }
      };
    });
  }, []);

  return <div>
    <PageHead title={title} description={description} image={image} url={pathname}/>
    <style>{css}</style>
    <div dangerouslySetInnerHTML={{__html: html}}/>
  </div>;
}
