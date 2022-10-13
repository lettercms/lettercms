import { withSentry } from '@sentry/nextjs';
import generateSitemap from '@/lib/generateSitemap';

export default withSentry(generateSitemap);
