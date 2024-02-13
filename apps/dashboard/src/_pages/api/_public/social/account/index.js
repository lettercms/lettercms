import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/api/social/account.get';
import POST from '@/lib/api/social/account.post';
import PATCH from '@/lib/api/social/account.patch';

export default manageMethods({
  GET,
  POST,
  PATCH
});