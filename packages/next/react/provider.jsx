import {createContext, useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';

const Context = createContext(null);

export default function AppProvider({children, accessToken}) {
  const router = useRouter();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (accessToken) {
      sdk.setAccessToken(accessToken);
    }
  }, [accessToken]);

  return <Context.Provider>{children}</Context.Provider>
}

export function usePosts(page, options) {
  const [actual, setActual] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const next = () => {}

  useEffect(() => {

  }, [page, options, ctx.accessToken]);


}

export function usePages(argument) {
  // body...
}
