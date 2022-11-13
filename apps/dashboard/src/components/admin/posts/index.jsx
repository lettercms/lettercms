import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';
import Layout from '../listLayout';
import Ico from '@/components/assets/adminPost'

function Posts() {
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
      tabs={[
        {name: 'published', alias: 'Publicados'},
        {name: 'draft', alias: 'Guardados'}
      ]}
      onEdit={id => router.push(`/dashboard/posts/edit/${id}`)}
      onCreate={newPost}
      buttonText='Crear'
      ico={<Ico/>}
      topText='Entradas'
    />
  </>;
}

export default Posts;
