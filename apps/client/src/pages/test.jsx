import {getBlog} from '@/lib/mongo/blogs';
import {captureException} from '@sentry/nextjs';
import Home from '@/components/home';

export async function getStaticProps() {
  try {
    return {
      props: await getBlog('davidsdevel')
    };
  } catch(err) {
    captureException(err);
  }
}

export default function PageWraper(props) { 
  return <Home {...props}/>;
}
