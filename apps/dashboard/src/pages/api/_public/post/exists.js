import manageMethods from '@lettercms/utils/lib/manageMethods';
import exists from '@lettercms/utils/lib/exists';
import posts from '@lettercms/models/posts';

export default manageMethods({
  GET: exists(posts)
});
