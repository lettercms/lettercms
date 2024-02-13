import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/api/post/find';
import DELETE from '@/lib/api/post/url.delete';

export default manageMethods({
  GET,
  DELETE
});
