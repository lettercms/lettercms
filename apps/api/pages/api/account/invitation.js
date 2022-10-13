import manageMethods from '@lettercms/utils/lib/manageMethods';
import POST from '@/lib/account/invitations.post';
import DELETE from '@/lib/account/invitations.delete';
import GET from '@/lib/account/invitations.get';

export default manageMethods({
  POST,
  GET,
  DELETE
});
