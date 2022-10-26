import {isValidObjectId} from 'mongoose';
import posts from '@lettercms/models/posts';
import pages from '@lettercms/models/pages';
import blogs from '@lettercms/models/blogs';
import {Ratings, Users} from '@lettercms/models/users';
import {Facebook} from '@lettercms/models/socials';
import brain from '@/lib/brain';
import FB from '@lettercms/utils/lib/social/Facebook';
import revalidate from '@lettercms/utils/lib/revalidate';
import updateTags from './updateTags';
import updateCategories from './updateCategories';

export default async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain, body} = req;

  const isId = isValidObjectId(url);

  const updateCondition = {};

  if (isId)
    updateCondition._id = url;
  else {
    updateCondition.url = url;
    updateCondition.subdomain = subdomain;
  }

  if (body.url) {
    const existsPage = await pages.exists({subdomain, url: req.body.url, pageStatus: 'published'});

    if (existsPage)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A page with same URL already exists'
      });

    const existsPublishedPost = await posts.exists({...updateCondition, postStatus: 'published'});
    if (existsPublishedPost)
      return res.status(400).json({
        status: 'posts/already-published',
        message: 'Post already published'
      });
  }

  if (body.content)
    body.text = body.content.split('<').map(e => e.split('>')[1]).join('');

  const date = new Date();

  const newData = {
    ...body,
    updated: date,
    published: date,
    postStatus: 'published'
  };

  const {tags, _id: postID, url: _url, description, categories} = await posts.findOneAndUpdate(updateCondition, newData, {select: 'description _id tags url categories'});

  updateTags(subdomain, tags, newData.tags);
  updateCategories(subdomain, categories, newData.category);


  if (body.promote?.facebook) {
    //Promote on Facebook
    Facebook.findOne({subdomain}, 'pageId token').then(({pageId, token}) => {
      const fb = new FB(pageId, token);

      //TODO: add custom domain
      fb.publishPost(description, {
        link: `https://${subdomain}.lettercms.vercel.app/${_url}`
      });
    });
  }

  const {mainUrl} = await blogs.find({subdomain}, 'mainUrl', {lean: true});

  revalidate(subdomain, mainUrl);

  //Generate Recommendations for each user
  Users.find({subdomain}, '_id mlModel')
    .then(users => {
      users.map(({_id, mlModel}) => {
        let rating = 0;

        if (mlModel) {
          const parsedTags = {};

          tags.forEach(e => parsedTags[e] = 1);
              
          const cross = new brain.CrossValidate(brain.NeuralNetwork);

          const net = cross.fromJSON(JSON.parse(mlModel));

          rating = net.run(parsedTags);
        }

        return Ratings.create({
          userID: _id,
          post: postID,
          subdomain,
          rating
        });
      });
  });

  res.json({
    status: 'OK',
    id: postID
  });
};
