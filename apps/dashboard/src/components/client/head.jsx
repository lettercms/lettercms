import BaseHead from './_headBase';

export default function Head(props) {
  const defaultOGImage = props.origin + '/images/og.jpg';

  return <BaseHead {...props}>
    <meta href={props.ogImage || defaultOGImage} content={props.ogImage || defaultOGImage} property='og:image' name='twitter:image' itemProp='image' rel="image_src"/>
  </BaseHead>;
};
