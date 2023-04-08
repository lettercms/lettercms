import {getBlog} from './mongo/blogs';

export async function getPost(subdomain, paths) {
   try {
    const res = await fetch(`https://${subdomain}.lettercms.vercel.app/api/blog/post?paths=${paths.join(',')}`);
    const post = await res.json();

    return {
      props: {
        ...post,
        pathType: 'post'
      }
    };
  } catch (err) {
    throw err;
  }
}
export async function getMain(subdomain) {
  try {
    const res = await fetch(`https://${subdomain}.lettercms.vercel.app/api/blog`);
    const blog = await res.json();

    return {
      props: {
        ...blog,
        pathType: 'main'
      }
    };
  } catch (err) {
    throw err;
  }
}