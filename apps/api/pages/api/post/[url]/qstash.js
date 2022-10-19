import manageMethods from '@lettercms/utils/lib/manageMethods';
import POST from '@/lib/post/publish';
import { verifySignature } from '@upstash/qstash/nextjs';

const handler = manageMethods({
  POST
});

export default verifySignature(handler);
