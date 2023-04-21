import {useState, useEffect, createContext, useContext} from 'react';
import sdk from '@lettercms/sdk';
import Cookie from 'js-cookie'; 

const UserContext = createContext();

export function getContext() {
  return UserContext;
}

export function useUser() {
  const value = useContext(UserContext);

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error(
      '[lettercms]: `useUser` must be wrapped in a <DashboardProvider />'
    );
  }

  return value.user || value;
}

export function usePosts(page) {
  const ctx = useContext(UserContext);

  const [posts, setPosts] = useState(null);
  const [actualPage, setPage] = useState(null);

  useEffect(() => {
    if (ctx.user && page !== actualPage) {
      sdk.createRequest(`/user/${ctx.user._id}/recommendation`)
        .then(p => {
          setPage(page);
          setPosts(p);
        });
    }
  }, [page, ctx]);

  if (!ctx.user)
    return {
      status: 'no-user'
    };

  return posts ?? {status:'loading'};
}

export function useRecommendations(url) {
  const ctx = useContext(UserContext);

  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (ctx.user) {
      sdk.createRequest(`/user/${ctx.user._id}/recommendation/${url}`)
        .then(p => setRecommendation(p));
    }
  }, [ctx, url]);

  if (!ctx.user)
    return {
      status: 'no-user'
    };

  return recommendation ?? {status:'loading'};
}

export function UserProvider({children, ready}) {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const _userID = Cookie.get('userID');
    if (_userID && ready) {
      setUserID(_userID);
      
      sdk.createRequest(`/user/${userID}`)
        .then(setUser);
    }
    else
      setUser({status: 'no-user'});

  }, [ready]);

  let value = {status: 'loading'};

  if (user?._id && userID)
    value = {user};
  else if (user?.status === 'no-user')
    value = {user}; 
  else
    value = {status: 'error'};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}