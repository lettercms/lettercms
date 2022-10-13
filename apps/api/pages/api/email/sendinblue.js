import manageMethods from '@lettercms/utils/lib/manageMethods';

/*
Evento del webhook
request|click|deferred|delivered|soft_bounce|hard_bounce|complaint|unique_open|opened|invalid_email|blocked|error|spam|unsubscribed
{
  "event": "delivered",
  "email": "example@example.com",
  "id": 26224,
  "date": "YYYY-MM-DD HH:mm:ss",
  "ts": 1598634509,
  "message-id": "<xxxxxxxxxxxx.xxxxxxxxx@domain.com>",
  "ts_event": 1598034509,
  "subject": "Subject Line",
  "tag": "[\"transactionalTag\"]",
  "sending_ip": "185.41.28.109",
  "ts_epoch": 1598634509223,
  "tags": [
    "myFirstTransactional"
  ]
}
*/

const POST = async function() {
  const {res} = this;

  res.sendStatus(200);
};

export default manageMethods({
  POST
});
