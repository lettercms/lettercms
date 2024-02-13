import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/api/account/emailHex.get';
import PATCH from '@/lib/api/account/emailHex.patch';

export default manageMethods({
  GET,
  PATCH
});
