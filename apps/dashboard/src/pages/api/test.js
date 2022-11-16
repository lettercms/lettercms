import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@lettercms/utils/lib/connection';
import {Accounts} from '@lettercms/models/accounts';
import admin from '@lettercms/admin';
import app from '@/firebase/server';
import {getAuth} from 'firebase-admin/auth';

const auth = getAuth(app);

export default async function A(req, res) {
  const firebaseToken = await auth.createCustomToken('davidsdevel');

  res.send(firebaseToken);
};
