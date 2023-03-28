import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';
import sdk from '@lettercms/sdk';
import Layout from '../listLayout';
import Ico from '@/components/dashboard/assets/adminPost';

function Posts() {
  const router = useRouter();
  const intl = useIntl();

  const newPost = async () => {
    const {id} = await sdk.posts.create();

    router.push(`/posts/edit/${id}`);
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
        {
          name: 'published',
          alias: intl.formatMessage({
            id: 'Published'
          })
        },
        {
          name: 'draft',
          alias: intl.formatMessage({
            id: 'Draft'
          })
        }
      ]}
      onEdit={id => router.push(`/posts/edit/${id}`)}
      onCreate={newPost}
      buttonText={
        intl.formatMessage({
          id: 'Create'
        })
      }
      ico={<Ico/>}
      topText={
        intl.formatMessage({
          id: 'Posts'
        })
      }
    />
  </>;
}

export default Posts;
