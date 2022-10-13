import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document () {
  
  return <Html style={{ scrollBehavior: 'smooth' }} prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#">
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
    </Head>
    <body>
      <div id="fb-root" />
      <Main />
      <NextScript />
    </body>
  </Html>;
}
