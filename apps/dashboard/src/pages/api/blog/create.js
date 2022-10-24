import connect from '@lettercms/utils/lib/connection';
//import {Payment} from '@lettercms/models/payments';
import {Stats} from '@lettercms/models/stats';
import {Accounts} from '@lettercms/models/accounts';
import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';
import usage from '@lettercms/models/usages';
import { withSentry } from '@sentry/nextjs';

async function createBlog(req, res) {
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

  //Create Blog
  const blog = await blogs.create({
    ...req.body,
    owner: account._id
  });

  //Initialize Blog Data
  await Stats.create({subdomain});
  await usage.create({subdomain});

  const date = new Date();
  /*await Payment.create({
    subdomain,
    //nextPayment: date.setMonth(date.getMonth() + 1)
  });*/

  //Link subdomain to account 
  await Accounts.updateOne({email: ownerEmail}, {subdomain});

  //TODO: Create Example Page
  //const pageID = await pages.create();

  //Publish post
  const {_id} = await posts.createPost(subdomain, {
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
  });

  return res.json({
    id: blog._id,
    status: 'OK'
  });
};

export default withSentry(createBlog);
