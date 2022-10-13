import BaseHead from './_headBase';

const Head = props => {

  const description = 'Ahorra tiempo y promociona tu contenido de manera eficiente con LetterCMS';
  const title = 'LetterCMS';
  const url = 'https://lettercms-dashboard-davidsdevel.vercel.app';
  const ogImage = 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/og.png';

  return <BaseHead {...props} description={description} title={title} url={url} ogImage={ogImage}>
    <meta property="og:type" content="website"/>
  </BaseHead>;
};

export default Head;
