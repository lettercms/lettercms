import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';
import Layout from '../listLayout';

function Posts() {
  const router = useRouter();

  const newPost = async () => {
    const {id} = await sdk.posts.create();

    router.push(`/dashboard/posts/edit/${id}`);
  };

  return <div style={{ width: '90%' }}>
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
        'images',
        'authorEmail',
        'author',
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
    />
  </div>;
}

export default Posts;
