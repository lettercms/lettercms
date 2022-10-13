import BaseHead from './_headBase';

const Head = props => {

  const ogImage = props.ogImage || 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/og.png';

  return <BaseHead {...props} ogImage={ogImage}>
    <meta name="author" content="LetterCMS"/>
    <meta property="og:type"  content="article"/>    
    <meta property='article:published_time' content={props.published}/>
    <meta property='article:modified_time' content={props.updated}/>
    <meta property="og:updated_time" content={props.updated} />
    <meta property='article:author' content='https://www.facebook.com/davidsdevel'/>
    <meta property='article:publisher' content='https://www.facebook.com/davidsdevel'/>
    {/*<meta property='article:section' content=''/>*/}

    {props.tags.map(e => <meta key={'tag-' + e} property='article:tag' content={e}/>)}

    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context':'https://schema.org',
        '@type':'NewsArticle',
        '@id': `https://lettercms-dashboard-davidsdevel.vercel.app/blog/${props.url}#article`,
        url: props.url,
        sameAs: [
          'https://www.facebook.com/davidsdevel/',
          'https://www.instagram.com/davidsdevel/',
          'https://es.linkedin.com/in/davidsdevel',
          'https://www.youtube.com/user/davidsdevel',
          'https://twitter.com/davidsdevel'
        ],
        headline: props.description,
        name: props.title,
        logo: 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/davidsdevel-rombo.png',
        datePublished: props.published,
        dateModified: props.updated
      })
    }}/>
  </BaseHead>;
};

export default Head;
