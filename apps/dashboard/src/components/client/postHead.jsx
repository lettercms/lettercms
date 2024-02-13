import NextHead from './_headBase';

const Head = (props) => {
  return <NextHead itemscope itemtype="http://schema.org/Article" {...props}>

      <meta content='article' property='og:type'/>
      <meta name="author" content="David González"/>
      <meta property='article:author' content='https://www.facebook.com/David.ImpulseWD' />
      <meta property='article:publisher' content='https://www.facebook.com/davidsdevel' />

      {
        !!props.category &&
        <meta content={props.category[0].toUpperCase() + props.category.slice(1)} property='article:section'/>
      }

      <meta content={props.published} property='article:published_time'/>

      {props.tags.map(e => (<meta key={`tag-${e}`} content={e} property="article:tag"/>))}

      {
        props.images
        ? props.images.map(e => <meta key={e} href={e} content={e} property='og:image' name='twitter:image' itemProp='image'/>)
        : <meta href={defaultOGImage} content={defaultOGImage} property='og:image' name='twitter:image' itemProp='image'/>
      }
  </NextHead>;
};

export default Head;
