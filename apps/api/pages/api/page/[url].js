import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/page/subdomainUrl.get';
import PATCH from '@/lib/page/subdomainUrl.patch';
import DELETE from '@/lib/page/subdomainUrl.delete';

export default manageMethods({
  GET,
  PATCH,
  DELETE
});
