import manageMethods from '@lettercms/utils/lib/manageMethods';
import POST from '@/lib/api/social/social.post.js';
import { verifySignature } from '@upstash/qstash/nextjs';

const handler = manageMethods({
  POST
});

export default async function Schedule(req, res) {
  return verifySignature(handler)(req, res);
}

export const config = {
  api: {
    bodyParser: false
  }
};
