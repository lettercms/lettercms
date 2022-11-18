import posts from '@lettercms/models/posts';
import pages from '@lettercms/models/pages';
import blogs from '@lettercms/models/blogs';
import {isValidObjectId} from 'mongoose';
import revalidate from '@lettercms/utils/lib/revalidate';
import {getFullUrl} from '@lettercms/utils/lib/posts';
import updateTags from './updateTags';
import updateCategories from './updateCategories';
import checkCategory from './checkCategory';

export default async function UpdatePost() {
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
    const existsPage = await pages.exists({subdomain, url: req.body.url});

    if (existsPage)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A page with same URL already exists'
      });

    const existsPost = await posts.exists({subdomain, url: req.body.url, postStatus: 'published'});

    if (existsPost)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A post with same URL already exists'
      });
  }

  if (body.category) {
    const existsCategory = await checkCategory(subdomain, req.body.category);

    if (!existsCategory)
      return res.status(400).json({
        status: 'bad-request',
        message: 'Category does not exists'
      });
  }

  if (body.content)
    body.text = body.content.split('<').map(e => e.split('>')[1]).join('');

  const date = new Date();

  const newData = {
    ...body,
    updated: date
  };

  const updatedPost = await posts.findOneAndUpdate(updateCondition, newData, {select: 'url postStatus category published tags'});

  if (updatedPost.postStatus === 'published') {
    blogs.findOne({subdomain}, 'mainUrl url', {lean: true})
      .then(({mainUrl, url: urlID}) => {
        const url = mainUrl + getFullUrl(updatedPost, urlID);

        revalidate(subdomain, url);
      });
  }

  updateTags(subdomain, updatedPost.tags, body.tags);
  updateCategories(subdomain, updatedPost.category, body.category);

  res.json({
    status: 'OK',
    id: updatedPost._id
  });
};