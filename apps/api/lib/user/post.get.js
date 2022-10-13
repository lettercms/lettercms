import {isValidObjectId} from 'mongoose';
import postModel from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {Ratings} from '@lettercms/models/users';
import {findOne as findRecommendation} from '@lettercms/utils/lib/findHelpers/recommendations';
import {findOne as findPost, find as findPosts} from '@lettercms/utils/lib/findHelpers/posts';

export default async function() {
  const {
    req,
    res
  } = this;

  const {subdomain} = req;
  const {id, postID} = req.query;

  const condition = isValidObjectId(postID) && !postID.includes('-') ? {_id: postID} : {subdomain, url: postID};

  const existsPost = await postModel.exists(condition);

  if (!existsPost)
    return res.status(404).json({
      status: 'not-found',
      message: 'Post not found'
    });

  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

  req.query.urlID = urlID;
  req.query.mainUrl = mainUrl;

  let recommended = null;

  const {tags, _id} = await findPost(postModel, condition, {fields: 'tags'});

  const tagsMapped = tags.map(e => ({tags: {$in: e}}));

  let customFields = null;

  if (req.query.fields) {
    const splitted = req.query.fields.split(',');

    if (!splitted.includes('tags'))
      splitted.push('tags');

    customFields = splitted.join(',');
  } else {
    customFields = 'tags';
  }

  const similars = await findPosts(postModel, {
    subdomain,
    $nor:[{_id}],
    $or: tagsMapped,
    postStatus: 'published'
  }, {
    ...req.query,
    fields: customFields
  });
  

  let ordered = similars.map(e => {
    let matches = 0;

    e.tags.forEach(t => {
      if (tags.includes(t))
        matches++;
    });

    return {
      matches,
      ...e
    };
  })
  .sort((a,b) => a.matches > b.matches ? -1 : +1)
  .map(e => {
    delete e.matches;
    return e;
  });

  if (ordered.length < 1) {
    ordered = await findPosts(postModel, {_id: {$ne: _id}, subdomain, postStatus: 'published'}, {limit: 2, ...req.query});
  } else if (ordered.length < 2) {
    ordered[1] = await findPost(postModel, {_id: {$ne: _id}, subdomain, postStatus: 'published'}, req.query);
  }

  const similar = ordered[0];
  
  if (id.includes('no-user'))
    recommended = ordered[1];
  else {
    recommended = await findRecommendation(Ratings, {
      subdomain,
      $and: [
        {post: {$ne: _id}},
        {post: {$ne: similar._id}}
      ]
    },
    req.query);
  }

  res.json({
    similar,
    recommended
  });
};