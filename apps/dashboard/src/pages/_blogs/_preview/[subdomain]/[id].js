import {getPreviewPost} from '@/lib/mongo/posts';
import Post from '@/components/article';

export async function getServerSideProps({query: {subdomain, id}}) {
  const props = await getPreviewPost(subdomain, id);

  return {
    props
  };
}

export default Post;
