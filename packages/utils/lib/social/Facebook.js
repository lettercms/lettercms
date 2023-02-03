import Base from './base';

class FacebookSDK extends Base {
  /******* Posts *******/
  async publishPost(message, options) {
    const {published = true, schedule, link, images} = options;

    const imagesPaths = {};

    if (images) {
      if (images.length === 1 && !message) {
        return this.publishPhoto(images[0]);
      }

      const postImages = await Promise.all(images.map(url => this.publishPhoto(url, true)));
        
      postImages.forEach(({id}, i) => {
        imagesPaths[`attached_media[${i}]`] = JSON.stringify({media_fbid: id});
      });
    }

    const fetchOptions = {
      message,
      ...imagesPaths
    };

    if (link)
      fetchOptions.link = link;

    if (schedule) {
      fetchOptions.scheduled_publish_time = schedule;

      if (images)
        fetchOptions.unpublished_content_type = 'SCHEDULED';
    }

    if ((images && schedule) || schedule)
      fetchOptions.published = 'false';
    else
      fetchOptions.published = published;

    return this._baseRequest(`/${this.ID}/feed`, 'POST', fetchOptions);
  }
  async getPosts(opts) {
    return this._baseRequest(`/${this.ID}/scheduled_posts`, {
      ...opts
    });
  }

  /********* Photos **********/
  async publishPhoto(url, isSchedule = false) {
    return this._baseRequest(`/${this.ID}/photos`, 'POST', {
      url,
      temporary: isSchedule ? 'true' : 'false',
      published: !isSchedule ? 'true' : 'false'
    });
  }
}

export default FacebookSDK;
