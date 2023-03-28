import manageMethods from '@lettercms/utils/lib/manageMethods';
import exists from '@lettercms/utils/lib/exists';
import {Users} from '@lettercms/models/users';

export default manageMethods({
  GET: exists(Users)
});