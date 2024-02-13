import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/api/comment/id.get';
import POST from '@/lib/api/comment/id.post';
import DELETE from '@/lib/api/comment/id.delete';

export default manageMethods({
  GET,
  POST,
  DELETE
});
