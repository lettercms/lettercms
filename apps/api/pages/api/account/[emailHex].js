import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/account/emailHex.get';
import PATCH from '@/lib/account/emailHex.patch';

export default manageMethods({
  GET,
  PATCH
});
