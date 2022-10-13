import manageMethods from '@lettercms/utils/lib/manageMethods';
import GET from '@/lib/comment/id.get';
import POST from '@/lib/comment/id.post';
import DELETE from '@/lib/comment/id.delete';

export default manageMethods({
  GET,
  POST,
  DELETE
});
