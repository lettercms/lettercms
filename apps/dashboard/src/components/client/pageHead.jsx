import NextHead from 'next/head';

const PageHead = (props) => {
  const defaultDescription = 'JavaScript, tecnología, informática y mas JavaScript en este blog. Un simple blog de un desarrollador JavaScript Venezolano.';
  const defaultOGURL = props.origin;
  const defaultOGImage = props.origin + '/images/og.jpg';

  return <NextHead>
    <title>{props.title || 'David\'s Devel - blog'}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel= "icon" sizes="192x192" href="/touch-icon.png" />
    <link rel= "apple-touch-icon" href="/touch-icon.png" />
    <link rel= "mask-icon" href="/favicon-mask.svg" color="#49B882" />
    <link rel= "icon" href="/favicon.ico" />

    <link href={props.image || defaultOGImage} rel="image_src" />
    <link rel= "canonical" href={props.url ? `${props.origin}${props.url}` : defaultOGURL} />

    <meta property="og:site_name" content="David's Devel - Blog" />
    <meta content="website" property="og:type" />
    <meta content="100000619759917" property="fb:admins" />
    <meta content="337231497026333" property="fb:app_id" />
    <meta content="es_LA" property="og:locale" />
    <meta property="fb:pages" content="552760701890501" />

    <meta content="@davidsdevel" name="twitter:site" />
    <meta content="@davidsdevel" name="twitter:creator" />
    <meta content="summary_large_image" name="twitter:card" />

    <meta content={props.title || 'David\'s Devel'} property="og:title" />
    <meta content={props.title || 'David\'s Devel'} itemProp="name" />
    <meta content={props.title || 'David\'s Devel'} name="twitter:title" />

    <meta content={props.description || defaultDescription} itemProp="description" />
    <meta content={props.description || defaultDescription} property="og:description" />
    <meta content={props.description || defaultDescription} name="twitter:description" />

    <meta content={props.image || defaultOGImage} property="og:image" />
    <meta content={props.image || defaultOGImage} name="twitter:image" />
    <meta content={props.image || defaultOGImage} itemProp="image" />

    <meta content={props.url ? `${props.origin}${props.url}` : defaultOGURL} itemProp="url" />
    <meta content={props.url ? `${props.origin}${props.url}` : defaultOGURL} property="og:url" />
    <meta content={props.url ? `${props.origin}${props.url}` : defaultOGURL} name="twitter:url" />

    <meta href={props.ogImage || defaultOGImage} content={props.ogImage || defaultOGImage} property='og:image' name='twitter:image' itemProp='image' rel="image_src"/>

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
        "name":"David's Devel - Blog",
        "logo": "${props.origin}/images/davidsdevel-rombo.png"
      }`
    }}/>
  </NextHead>;
};

export default PageHead;
