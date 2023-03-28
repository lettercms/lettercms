import BaseHead from './_headBase';

const Head = props => {

  const description = 'Ahorra tiempo y promociona tu contenido de manera eficiente con LetterCMS';
  const title = 'Blog | LetterCMS';
  const url = 'https://lettercms-dashboard-main.vercel.app/blog';
  const ogImage = 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/og.jpg';

  return <BaseHead {...props} description={description} url={url} title={title} ogImage={ogImage}>
    <meta name="author" content="LetterCMS"/>
    <meta property="og:type" content="blog"/>
    {
      props.next &&
      <link rel="next" />
    }
    {
      props.prev
      && <link rel="prev" />
    }
  </BaseHead>;
};

export default Head;
