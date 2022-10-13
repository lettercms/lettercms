import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

const isDev = process.env.NODE_ENV !== 'production';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const path = ctx.asPath;
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, path };
  }

  render() {
    return (
      <Html style={{ scrollBehavior: 'smooth' }} prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
          <link href='https://unpkg.com/bootstrap@4.6.1/dist/css/bootstrap.min.css' rel="stylesheet"/>
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
