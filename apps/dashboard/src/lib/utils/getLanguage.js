import {headers, cookies} from 'next/headers';

const supportedLanguages = [
  'es',
  'en'
];

export default function getLangFromHeaders() {
  const _cookies = cookies();
  const _headers = headers();

  let language;

  const languageCookie = _cookies.get('__lcms-hl');

  if (languageCookie)
    language = languageCookie;
  else
    language = _headers.get('accept-language')?.split(',')?.[0].split('-')?.[0].toLowerCase() || 'en';

  if (!supportedLanguages.includes(language))
    language = 'en';

  return language;
}
