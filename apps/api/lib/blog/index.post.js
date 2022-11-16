import {Payment} from '@lettercms/models/payments';
import {Stats} from '@lettercms/models/stats';
import {Accounts} from '@lettercms/models/accounts';
import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';
import usage from '@lettercms/models/usages';

export default async function CreateBlog() {
  const {
    req,
    res
  } = this;

  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

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
  await Payment.create({
    subdomain,
    nextPayment: date.setMonth(date.getMonth() + 1)
  });

  //Link subdomain to account 
  await Accounts.updateOne({email: ownerEmail}, {subdomain});

  //TODO: Create Example Page
  //const pageID = await pages.create();

  const id = await posts.createPost(subdomain, {
    title: 'Yay! My firts post',
    description: 'You can use this description to get conversions',
    url: 'first-example',
    tags: ['example'],
    content: '<div>Hello World</div>',
    authorEmail: ownerEmail
  });

  //Publish post
  await posts.updateOne({_id: id}, {
    postStatus: 'published',
    published: new Date()
  });

  return res.json({
    id: blog._id,
    status: 'OK'
  });
};