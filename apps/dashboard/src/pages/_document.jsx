import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const path = ctx.asPath;
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, path };
  }

  render() {
    return (
      <Html style={{ scrollBehavior: 'smooth' }} lang='es' prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#">
        <Head>
          <link rel= "preconnect" href="https://fonts.googleapis.com"/>
          <link rel= "preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
          <link href="https://fonts.googleapis.com/css2?family=Quicksand&family=Rubik:wght@900&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <div id="fb-root" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
