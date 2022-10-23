import NextHead from 'next/head';

const Head = props => {

  const defaultOGImage = 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/og.png';

  return <NextHead>
    <meta charSet="utf-8"/>
    
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta httpEquiv="content-language" content="es"/>
    
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={props.description}/>
    <meta name="theme-color" content="#5f4dee"/>
    <meta name="generator" content="LetterCMS"/>
    <title>{props.title}</title>
    <meta name="twitter:title" content={props.title}/>
    <meta name="twitter:description" content={props.description}/>
    <meta name="twitter:image" content={props.ogImage || defaultOGImage}/>
    <meta name="twitter:site" content="@davidsdevel"/>
    <meta name="twitter:creator" content="@davidsdevel"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:url" content={props.url}/>
    <meta name="twitter:domain" content="www.lettercms.com"/>

    
    <meta property="og:title" content={props.title}/>
    <meta property="og:description" content={props.description}/>
    <meta property="og:image"  content={props.ogImage || defaultOGImage}/>
    <meta property="og:url" content={props.url}/>
    <meta property="og:locale"  content="es_LA"/>
    <meta property="og:site_name" content='LetterCMS'/>

    <meta property="fb:admins"  content="100000619759917"/>
    <meta property="fb:app_id"  content={process.env.FACEBOOK_APP_ID}/>
    <meta property="fb:pages" content="552760701890501"/>

    <meta itemProp="url" content={props.url} />
    <meta itemProp="name" content={props.title}  />
    <meta itemProp="description" content={props.description} />
    <meta itemProp="image" content={props.ogImage || defaultOGImage}  />

    <link rel="image_src" href={props.ogImage || defaultOGImage} />
    <link rel="canonical" href={props.url} />
    <link rel="icon" href="/favicon.ico" />
    <link rel="alternate" type="application/rss+xml" href="//www.lettercms.com/feed"/>
    <link rel="alternate" href={props.url} hrefLang="x-default"/>
    <link rel="alternate" href={props.url} hrefLang="es"/>
    {props.children}
  </NextHead>;
};

export default Head;
