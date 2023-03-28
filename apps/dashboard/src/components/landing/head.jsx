import BaseHead from './_headBase';
import {useIntl} from 'react-intl';

const Head = props => {
  const intl = useIntl();

  const title = intl.formatMessage({
    id: 'LetterCMS - Create, Attract, Delight'
  });

  const description = intl.formatMessage({
    id: 'Save time and promote your content efficiently with LetterCMS'
  });

  const url = 'https://lettercms-dashboard-davidsdevel.vercel.app';
  const ogImage = 'https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/og.png';

  return <BaseHead {...props} description={description} title={title} url={url} ogImage={ogImage}>
    <meta property="og:type" content="website"/>
  </BaseHead>;
};

export default Head;
