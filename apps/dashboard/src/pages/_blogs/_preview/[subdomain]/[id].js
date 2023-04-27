import {getPreviewPost} from '@/lib/mongo/client/posts';
import Post from '@/components/client/article';

export async function getServerSideProps({query: {subdomain, id}}) {
  const props = await getPreviewPost(subdomain, id);

  return {
    props
  };
}

export default Post;
