export default function exists(model) {
  return async function() {
    const {req, res} = this;

    const exists = await model.exists(req.query);

    res.json({
      exists: !!exists
    });
  };
}
