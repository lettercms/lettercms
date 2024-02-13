import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/api/page/subdomainUrl.get';
import PATCH from '@/lib/api/page/subdomainUrl.patch';
import DELETE from '@/lib/api/page/subdomainUrl.delete';

export default manageMethods({
  GET,
  PATCH,
  DELETE
});
