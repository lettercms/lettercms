import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/user/user.get';
import PATCH from '@/lib/user/user.patch';
import DELETE from '@/lib/user/user.delete';

export default manageMethods({
  GET,
  PATCH,
  DELETE
});