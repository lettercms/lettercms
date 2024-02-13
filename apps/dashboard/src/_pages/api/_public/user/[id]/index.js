import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/api/user/user.get';
import PATCH from '@/lib/api/user/user.patch';
import DELETE from '@/lib/api/user/user.delete';

export default manageMethods({
  GET,
  PATCH,
  DELETE
});