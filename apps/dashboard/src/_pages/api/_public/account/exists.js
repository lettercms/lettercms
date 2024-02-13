import manageMethods from '@lettercms/utils/lib/manageMethods';
import exists from '@lettercms/utils/lib/exists';
import {Accounts} from '@lettercms/models/accounts';

export default manageMethods({
  GET: exists(Accounts)
});