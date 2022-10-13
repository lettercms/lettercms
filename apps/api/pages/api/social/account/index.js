import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/social/account.get';
import POST from '@/lib/social/account.post';
import PATCH from '@/lib/social/account.patch';

export default manageMethods({
  GET,
  POST,
  PATCH
});