import manageMethods from '@lettercms/utils/lib/manageMethods';
import POST from '@/lib/api/blog/index.post';
import GET from '@/lib/api/blog/subdomain.get';
import PATCH from '@/lib/api/blog/subdomain.patch';

export default manageMethods({
  GET,
  POST,
  PATCH
});
