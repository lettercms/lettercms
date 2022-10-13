export default async function revalidate(subdomain, url) {
  const r = await fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: `/_blogs/${subdomain}${url}` 
    })
  });

  return r.json();
};