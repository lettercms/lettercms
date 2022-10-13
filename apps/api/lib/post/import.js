import posts from '@lettercms/models/posts';
import formidable  from 'formidable';


/**
 * TODO: Changed import method
 *
 * Steps
 *
 * 1. Upload XML to Firebase Storage
 * 2. Fetch it
 * 3. Parse
 * 4. Insert into DB
 * 5. Delete XML from storage
 */
export default async function() {
  const form = formidable({ multiples: true });

  form.parse(this.req, async (err, fields) => {
    if (fields.cms === 'blogger')
      await posts.importBlogger(this.req.subdomain, JSON.parse(fields.data));

    this.res.json({
      status: 'OK'
    });
  });
};