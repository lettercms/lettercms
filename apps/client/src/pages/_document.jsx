import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document () {
  
  return <Html style={{ scrollBehavior: 'smooth' }} prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#">
    <Head/>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>;
}
