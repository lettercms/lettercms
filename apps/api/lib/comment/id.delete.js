import comments from '@lettercms/models/comments';

export default async function() {
  const {req, res} = this;

  const {id} = req.query;

  await comments.deleteOne({_id: id});

  res.json({
    status: 'OK'
  });
};
