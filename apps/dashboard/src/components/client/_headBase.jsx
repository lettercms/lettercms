import React from 'react';
import NextHead from 'next/head';

export default function Head(props) {

  const siteName = '';
  const defaultDescription = 'Just another site created with love with LetterCMS';
  const defaultOGURL = props.origin;

  return <NextHead>
    <title>{props.title}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />

    <link rel= "canonical" href={props.url ? `${props.origin}${props.url}` : defaultOGURL} />

    <meta property="og:site_name" content={siteName} />
    <meta content="website" property="og:type" />
    <meta content="100000619759917" property="fb:admins" />
    <meta content="337231497026333" property="fb:app_id" />
    <meta content="es_LA" property="og:locale" />
    <meta property="fb:pages" content="552760701890501" />

    <meta content="@davidsdevel" name="twitter:site" />
    <meta content="@davidsdevel" name="twitter:creator" />
    <meta content="summary_large_image" name="twitter:card" />

    <meta content={props.title} itemProp="name" name="twitter:title" property="og:title" />
    <meta content={props.description || defaultDescription} itemProp="description" name="twitter:description" property="og:description" />
    <meta content={props.url ? `${props.origin}${props.url}` : defaultOGURL} name="twitter:url" property="og:url" itemProp="url" />

    <link rel= "manifest" href="/manifest.json" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: `{
        "@context":"https://schema.org",
        "@type":"Developer",
        "url":"${props.origin}",
        "sameAs":[
          "https://www.facebook.com/davidsdevel/",
          "https://www.instagram.com/davidsdevel/",
          "https://es.linkedin.com/in/davidsdevel",
          "https://www.youtube.com/user/davidsdevel",
          "https://twitter.com/davidsdevel"
        ],
        "@id": "${props.origin}/#developer",
        "name":"${props.title}",
        "logo": "${props.origin}/images/davidsdevel-rombo.png"
      }`
    }}/>
  </NextHead>;
};
