
/** 
 * Generate SEO Data
 *
 * @param {string} url - Relative url
 * @param {object} data
 * @param {"home" | "article" | "page"} type
 *
 * @return {url}
 */
export default function generateSeoData(url, type, data) {
  //TODO: generate data depending type
  const {blog} = data;
 
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      url: blog.domain + url,
      title: blog.title,
      description: blog.description,
      siteName: blog.title,
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID
    }
  }
}