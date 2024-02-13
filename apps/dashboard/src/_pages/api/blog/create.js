import connect from '@lettercms/utils/lib/connection';
//import {Payment} from '@lettercms/models/payments';
import {Stats} from '@lettercms/models/stats';
import {Accounts} from '@lettercms/models/accounts';
import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';
import usage from '@lettercms/models/usages';

export default async function createBlog(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'method-not-allowed'
    });

  await connect();

  const {ownerEmail, subdomain} = req.body;

  const existsBlog = await blogs.exists({subdomain});
  if (existsBlog)
    return res.status(400).json({
      status: 'already-exists',
      message:'Blog already exists'
    });

  const account = await Accounts.findOne({email: ownerEmail}, '_id', {lean: true});

  delete req.body.ownerEmail;

  const date = new Date();

  const blogOptions = {
    ...req.body,
    owner: account._id,
    tags: {
      example: 1
    }
  };

  const postOptions = {
    subdomain,
    created: date,
    title: 'Yay! My firts post',
    description: 'You can use this description to get conversions',
    url: 'first-example',
    tags: ['example'],
    content: '<div>Hello World</div>',
    author: account._id,
    postStatus: 'published',
    published: date
  };

  const [blog] = await Promise.all([
    blogs.create(blogOptions),
    Stats.create({subdomain}),
    usage.create({subdomain}),
    Accounts.updateOne({email: ownerEmail}, {subdomain}),
    posts.createPost(subdomain, postOptions)
  ]);

  /**
   * Possible implementation of payment system for donations or thru Open Collective API
   * 
   * await Payment.create({
   *   subdomain,
   *   //nextPayment: date.setMonth(date.getMonth() + 1)
   * });
   */

  /**
   * TODO: Create Example Page
   * const pageID = await pages.create();
   */

  return res.json({
    id: blog._id,
    status: 'OK'
  });
};
