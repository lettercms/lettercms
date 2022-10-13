import generateFeed from '@/lib/generateFeed';
import { withSentry } from '@sentry/nextjs';


export default withSentry(generateFeed);

