export default function exists(model) {
  return async function() {
    const {req, res} = this;

    const exists = await model.exists(req.query);

    if (exists)
      res.status(200).end();
    else
      res.status(404).end();
  };
}
