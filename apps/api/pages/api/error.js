export default function error(req, res) {
  try {

    let a = 0;

    a.split();
  } catch(err) {
    throw err;
  }

  res.json({});
}