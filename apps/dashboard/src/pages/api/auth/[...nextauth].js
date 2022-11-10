import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {withSentry} from '@sentry/nextjs';
import connect from '@lettercms/utils/lib/connection';
import {Accounts} from '@lettercms/models/accounts';
import admin from '@lettercms/admin';
import app from '@/firebase/server';
import {getAuth} from 'firebase-admin/auth';

const auth = getAuth(app);

const isDev = process.env.NODE_ENV !== 'production';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: !isDev,
  debug: isDev,
  logger: {
    error(code, metadata) {
      console.error({ type: 'inside error logger', code, metadata });
    },
    warn(code) {
      console.warn({ type: 'inside warn logger', code });
    },
    debug(code, metadata) {
      console.log({ type: 'inside debug logger', code, metadata });
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
    async jwt({token, user, account}) {
        
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
    async session({session, token, user}) {
      session.user = token.user;

      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@email.com' },
        password: {  label: 'Password', type: 'password' }
      },
      authorize: async ({email, password}, req) => {
        try {
          await connect();

          const {subdomain, accessToken, id} = await Accounts.login(email, password);

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
            subdomain,
            firebaseExp
          };
        } catch(err) {
          throw err;
        }
      }
    })
  ]
};

export default withSentry(NextAuth(authOptions));