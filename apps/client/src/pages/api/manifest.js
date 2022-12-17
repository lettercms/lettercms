import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';

async function Manifest(req, res) {
  const hostname = req.headers.host || 'davidsdevel.lettercms.vercel.app';

  //Switch between staging and production
  if (hostname.startsWith('lettercms-client-'))
    subdomain = 'davidsdevel';
  else
    subdomain =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace('.lettercms.vercel.app', '')
        : hostname.replace('.localhost:3002', '');

  await connect();

  const {title, description, customDomain} = await blogs.findOne({subdomain}, 'description title customDomain', {lean: true});

  res.json({
    //start_url: customDomain || `https://${subdomain}.lettercms.vercel.app`,
    start_url: '/',
    description,
    icons: [
      { src: '/touch-icon.png', sizes: '192x192', type: 'image/png' }
    ],
    name: title,
    short_name: title,
    orientation: 'portrait',
    display: 'fullscreen',
    gcm_sender_id: '103953800507',
    theme_color: '#000',
    background_color: '#000',
  });
}

export default Manifest;
