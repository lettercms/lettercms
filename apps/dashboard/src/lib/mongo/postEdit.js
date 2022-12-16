import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {Facebook, Instagram} from '@lettercms/models/socials';

export async function getPostData(_id, subdomain) {
  await connect();

  const fields = 'title description images postStatus url category tags isProtected thumbnail subdomain content';

  const post = await posts.findOne({_id, subdomain}, fields, {lean: true});

  if (!post)
    return {
      notFound: true
    };

  const blog = await blogs.findOne({subdomain}, 'categories tags', {lean: true});
  const hasFacebook = await Facebook.exists({subdomain});
  const hasInstagram = await Instagram.exists({subdomain});

  return JSON.parse(JSON.stringify({
    post,
    blog: {
      tags: Object.keys(blog.tags),
      categories: Object.keys(blog.categories),
    },
    hasInstagram,
    hasFacebook
  }));
}

