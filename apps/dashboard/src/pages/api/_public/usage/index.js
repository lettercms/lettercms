import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/api/usage/index.get';
import PATCH from '@/lib/api/usage/index.patch';

export default manageMethods({
  GET,
  PATCH
});