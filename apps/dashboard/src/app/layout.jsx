import MainLayout from '@/components/mainLayout';
import authOptions from '@/app/nextAuthConfig';
import {getServerSession} from 'next-auth/next';
import '@/styles/global.css';

export default async function App({children}) {
  const session = await getServerSession(authOptions);

  return <html style={{ scrollBehavior: 'smooth' }} lang='es' prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#">
    <body>
      <div id="fb-root" />
      <MainLayout session={session}>
        {children}
      </MainLayout>
    </body>
  </html>
}


/*export default function Layout({children}) {
  return <html style={{ scrollBehavior: 'smooth' }} lang='es' prefix="og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# article: https://ogp.me/ns/article#">
    <body>
      <div id="fb-root" />
      <IntlProvider 
      locale={hl || 'en'}
      messages={messages}
      defaultLocale={hl || 'en'}
      onError={err => {
        throw err;
      }}
    >
      </IntlProvider>
    </body>
  </html>
}
*/
