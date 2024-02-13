import manageMethods from '@lettercms/utils/lib/manageMethods';
import exists from '@lettercms/utils/lib/exists';
import blogs from '@lettercms/models/blogs';

export default manageMethods({
  GET: exists(blogs)
});