import {withSentry} from '@sentry/nextjs';
import {randomBytes} from 'crypto';
import manageMethods from '@lettercms/utils/lib/manageMethods';
import blogs from '@lettercms/models/blogs';
import bcrypt from 'bcrypt';

async function createKey() {
  const {req, res} = this;
  const {subdomain} = req;
  const {name} = req.body;

  const {keys} = await blogs.findOne({subdomain}, 'keys', {lean: true});

  if (!keys)
    await blogs.updateOne({subdomain}, {$set: {keys: []}});

  if (keys.length === 3)
    return res.json({
      status: 'key-limit'
    });

  const key = randomBytes(16).toString('hex');

  const hash = await bcrypt.hash(key, 10);

  await blogs.updateOne({subdomain}, {
    $push: {
      keys: {
        hash,
        name,
        created: Date.now()
      }
    }
  });

  //Get key id to send to client
  const blog = await blogs.findOne({subdomain}, 'keys', {lean: true});

  let _id = '';
  blog.keys.forEach(e => {
    if (e.hash === hash)
      _id = e._id;
  });

  res.json({
    status: 'OK',
    data: {
      _id,
      key,
      name
    }
  });
}

async function listKeys() {
  const {req, res} = this;
  const {subdomain} = req;

  const post = await blogs.findOne({subdomain}, 'keys', {lean: true});

  if (!post.keys)
    await blogs.updateOne({subdomain}, {$set: {keys: []}});

  //Sort by last created
  const data = post.keys.reverse().map(e => {
    delete e.hash;

    return e;
  }) || [];

  res.json({
    status: 'OK',
    data
  });
}

async function deleteKey() {
  const {req, res} = this;
  const {subdomain} = req;
  const {id} = req.body;
  
  const {keys} = await blogs.findOne({subdomain}, 'keys', {lean: true});

  const filtered = keys.filter(e => e._id.toString() !== id);

  await blogs.updateOne({subdomain}, {$set: {keys: filtered}});

  res.json({
    status: 'OK'
  });
}

export default manageMethods({
  GET: listKeys,
  POST: createKey,
  DELETE: deleteKey  
});