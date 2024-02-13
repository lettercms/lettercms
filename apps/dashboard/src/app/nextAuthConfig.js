import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import app from '@/firebase/server';
import {getAuth} from 'firebase-admin/auth';

const auth = getAuth(app);

const isDev = process.env.NODE_ENV !== 'production';

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: !isDev,
  debug: isDev,
  logger: {
    error(code, metadata) {
      console.error({ type: 'inside error logger', code, metadata }); //eslint-disable-line
    },
    warn(code) {
      console.warn({ type: 'inside warn logger', code }); //eslint-disable-line
    },
    debug(code, metadata) {
      console.log({ type: 'inside debug logger', code, metadata }); //eslint-disable-line
    },
  },
  session:{
    /**
     * JWT strategy because proyes is deployed on Vercel
     * See: https://nextjs.org/docs/authentication
     */
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({account, profile}) {
      if (account.provider === 'google') {
        return profile.email_verified && profile.email.endsWith('@gmail.com')
      }

      return true
    },
    async jwt({token, user}) {
      if (token.user) {
        // Renew Firebase token on expiration 
        if(Date.now() > token.user.firebaseExp) {
          token.user.firebaseToken = await auth.createCustomToken(token.user.subdomain);
          token.user.firebaseExp = Date.now() + (60*60*1000);
        }

        return token;
      }

      return {
        user: {sub: token.sub, ...user}
      };
    },
    async session({session, token}) {
      session.user = token.user;

      return session;
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@email.com' },
        password: {  label: 'Password', type: 'password' }
      },
      authorize: async ({email, password}) => {
        try {
          const res = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              email,
              password
            })
          });

          if (!res.ok)
            return null;

          const data = await res.json();
          const {subdomain, accessToken, id} = data

          if (!accessToken)
            return null;

          /**
           * Define Firebase expiration Date to automatic token renovation.
           *
           * See: https://firebase.google.com/docs/auth/admin/create-custom-tokens
           */
          const firebaseToken = await auth.createCustomToken(subdomain);
          const firebaseExp = Date.now() + (60 * 60 * 1000);

          return {
            id,
            accessToken,
            firebaseToken,
            firebaseExp,
            subdomain
          };
        } catch(err) {
          throw err;
        }
      }
    })
  ]
};

export default authOptions;
