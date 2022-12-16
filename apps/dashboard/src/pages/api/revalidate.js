
/**
 * NOTE: posible Feat remotion
 *
 * This revalidation can be deleted
 *
 * Because recommendations changes on every visit,
 * I think is inefficient create and revalidate all pages on all visits, on all updates
 *
 * ISR improve load performance, but with getServerSideProps and built-in preload, pages load fast
 */
export default async function revalidate(req, res) {
  if (req.method !== 'POST')
    return res.sendStatus(405);

  const { path } = req.body;

  try {
    await res.revalidate(path.replace('/_blog/davidsdevel'));
    
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
