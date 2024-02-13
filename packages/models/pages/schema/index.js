import Schema  from './pages';

Schema.statics.createPage = async function(subdomain, data) {
  try {
    const post = await this.create({
      ...data,
      subdomain,
      pageStatus: 'draft',
      created: Date.now()
    });

    return Promise.resolve(post._id);
  } catch(err) {
    return Promise.reject(err);
  }
};
/**
 * Publish Post
 *
 * @description Publish a Posts into DB
 * @public
 *
 * @param {String} subdomain
 * @param {Object} data
 *
 * @return {Promise<Number>}
 *
 */
Schema.statics.publishPage = async function(condition, data) {
  try {
    const {subdomain} = condition;

    if (data.url) {
      const existsPage = await this.exists({
        url: data.url,
        subdomain
      });

      if (existsPage)
        return Promise.resolve({
          exists: true
        });

      const existsPost = await global.LetterModels.posts.exists({
        subdomain,
        url: data.url
      });

      if (existsPost)
        return Promise.resolve({
          exists: true
        });
    }

    const date = Date.now();

    const newData = {
      ...data,
      updated: date,
      pageStatus: 'published'
    }; 

    const {published} = await this.findOne(condition);

    if (!published)
      data.published = date;

    await this.updateOne(condition, newData);

    return Promise.resolve({
      exists: false
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
Schema.statics.draftPage = async function(condition) {
  try {
    await this.updateOne(condition, {
      pageStatus: 'draft'
    });

    return Promise.resolve({});
  } catch(err) {
    return Promise.reject(err);
  }
};
/**
 * Update Post
 *
 * @description Save a Posts into DB
 * @public
 *
 * @param {Object} data
 *
 * @return {Promise<Number>}
 *
 */
Schema.statics.updatePage = async function(condition, data) {
  try {
    const {subdomain} = condition;

    if (data.url) {
      const existsPage = await this.exists({
        url: data.url,
        subdomain
      });

      if (existsPage)
        return Promise.resolve({
          exists: true
        });

      const existsPost = await global.LetterModels.posts.exists({
        subdomain,
        url: data.url
      });

      if (existsPost)
        return Promise.resolve({
          exists: true
        });
    }

    await this.updateOne(condition, {
      ...data,
      updated: Date.now()
    });

    return Promise.resolve({});
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Delete Post
 *
 * @description Delete a post from DB
 * @public
 *
 * @param {String} ID
 * @param {String} url
 * @param {String} subdomain
 *
 * @return {Promise<Object>}
 */
Schema.statics.deletePage = async function (condition) {
  try {

    await this.deleteOne(condition);

    //TODO: make Fetch
    //await this.db('views').where({ url }).delete();

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

export default Schema;
