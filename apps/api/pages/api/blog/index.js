import manageMethods from '@lettercms/utils/lib/manageMethods';
import POST from '@/lib/blog/index.post';
import GET from '@/lib/blog/subdomain.get';
import PATCH from '@/lib/blog/subdomain.patch';

export default manageMethods({
  GET,
  POST,
  PATCH
});
