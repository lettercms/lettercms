export const getFullUrl = (post, urlID) => {
  if (urlID == '1')
    return `/${post.url}`;

  if (urlID == '2')
    return `/${post.category}/${post.url}`;

  const year = post.published.getFullYear();
  const month = post.published.getMonth() + 1;

  if (urlID == '3')
    return `/${year}/${month}/${post.url}`;

  const date = post.published.getDate();

  return `/${year}/${month}/${date}/${post.url}`;
};

