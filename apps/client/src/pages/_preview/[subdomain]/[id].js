import {getPreviewPost} from '@/lib/mongo/posts';
import Post from '@/components/post';

export async function getStaticProps({params: {subdomain, id}}) {
  const props = await getPreviewPost(id, subdomain);

  return {
    props
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
};
export default Post;
