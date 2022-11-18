import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';
import Layout from '../listLayout';
import Ico from '@/components/assets/adminPost';

export default function Comments() {
  const router = useRouter();

  const newPost = async () => {
    const {id} = await sdk.posts.create();

    router.push(`/dashboard/posts/edit/${id}`);
  };

  return <>
    <Layout
      type='posts'
      fields={[
        'title',
        'postStatus',
        'thumbnail',
        'comments',
        'views',
        'url',
        'tags',
        'author.photo',
        'isProtected',
        'subdomain'
      ]}
      status='published'
      onEdit={id => router.push(`/dashboard/comments/${id}`)}
      onCreate={newPost}
      buttonText='Crear'
      ico={<Ico/>}
      topText='Comentarios'
    />
  </>;
}
