import manageMethods from '@lettercms/utils/lib/manageMethods';
import POST from '@/lib/api/account/invitations.post';
import DELETE from '@/lib/api/account/invitations.delete';
import GET from '@/lib/api/account/invitations.get';

export default manageMethods({
  POST,
  GET,
  DELETE
});
