import manageMethods from '@lettercms/utils/lib/manageMethods';
import POST from '@/lib/social/social.post.js';
import { verifySignature } from '@upstash/qstash/nextjs';

const handler = manageMethods({
  POST
});

export default verifySignature(handler);
