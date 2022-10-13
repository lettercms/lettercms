import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';
import { withSentry } from '@sentry/nextjs';

async function Manifest(req, res) {
  const hostname = req.headers.host;
  const subdomain = process.env.NODE_ENV === 'production'  ? hostname.replace('.lettercms.vercel.app', '') : hostname.replace('.localhost:3002', '');

  await connect();

  const {title, description, customDomain} = await blogs.findOne({subdomain}, 'description title customDomain', {lean: true});

  res.json({
    start_url: customDomain || `https://${subdomain}.lettercms.vercel.app`,
    description,
    icons: [{ src: '/touch-icon.png', sizes: '192x192', type: 'image/png' }],
    name: title,
    short_name: title,
    orientation: 'portrait',
    display: 'fullscreen',
    gcm_sender_id: '103953800507',
    theme_color: '#000',
    background_color: '#000',
  });
}

export default withSentry(Manifest);
