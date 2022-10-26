import {find, findOne} from '@lettercms/utils/lib/findUtils';
import {find as findPosts, findOne as findPost} from '@lettercms/utils/lib/findHelpers/posts';
import blogs from '@lettercms/models/blogs';
import '@lettercms/models/accounts';


const whiteList = ['blog', 'stats', 'post', 'posts', 'comments', 'pages', 'page'];

//Default data Required for SEO
//TODO: improve next-seo integration
//TODO: get seo data from database
const blogBase = [
  'title',
  'description',
  'domain'
];

//model cache cross requests, to avoid unnecesaries imports
let modelCache = {};

export default async function getData(subdomain, config) {
  const metaBase = await blogs.findOne({subdomain}, 'title url mainUrl description', {lean: true});
  const keys = Object.keys(config);

  let meta = {};

  //Get models to handle each meta
  for(let e of keys) {
    //Name to get mongoose models
    let modelName = '';

    /**
     * Path is used to define model handler.
     *
     * Singular can use "findOne" helper
     * Plural will use "find" helper
     *
     * See file ./packages/utils/lib/findUtils.js
     */
    let path = e;
    let newConfig = {};
    let filters = {
      subdomain
    };

    if (Array.isArray(config[e])) {
      modelName = pluralize(e);
      newConfig.fields = config[e].join(',');
    }
    else {
      newConfig = config[e];
      newConfig.fields = config[e] ? config[e].fields.join(',') : '';

      if (config[e].path) {
        modelName = pluralize(config[e].path);
        path = config[e].path;

        delete newConfig.path;
      } else {
        modelName = pluralize(e);
      }
    }

    if (modelName === 'posts')
      filters.postStatus = 'published';

    let helper;

    if (path.startsWith('post')) {
      helper = isPlural(path) ? findPosts : findPost;
      
      newConfig.mainUrl = metaBase.mainUrl;
      newConfig.urlID = metaBase.url;
    }
    else
      helper = isPlural(path) ? find : findOne;

    const model = modelCache[modelName] ? modelCache[modelName] : (await import(`@lettercms/models/${modelName}`)).default;

    modelCache[modelName] = model;

    meta[e] = await helper(model, filters, newConfig);
  }

  return JSON.parse(JSON.stringify(meta));
}

/**
 * Pluralize
 *
 * @descripiton Get plural of config paths
 *
 * @param {string} text
 * 
 * @return {string}
 */
function pluralize(text) {
  return text.replace(/s*$/, '') + 's';
}

/**
 * Is Plural
 *
 * @description Define if model path is plural
 *
 * @param {string} text
 *
 * @return {boolean}
 */
function isPlural(text) {
  return text.endsWith('s');
}