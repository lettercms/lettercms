import manageMethods from '@lettercms/utils/lib/manageMethods';
import exists from '@lettercms/utils/lib/exists';
import pages from '@lettercms/models/pages';

export default manageMethods({
  GET: exists(pages)
});
