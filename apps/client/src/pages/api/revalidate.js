export default async function revalidate(req, res) {
  
  if (req.method !== 'POST')
    return res.sendStatus(405);

  const { path, token } = req.body;

  try {
    await res.revalidate(path);
    
    res.status(200).json({
      status: 'OK'
    });
  } catch (error) {
    res.status(500).json({
      status: `Failed to revalidate "${path}"`,
      error
    });
  }
}
