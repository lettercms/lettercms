const scriptImport = (tagID, url, type = 'js', opts = {}) => {
  return new Promise(resolve => {
    const tag = document.getElementById(tagID);

    if (!tag) {
      let importTag;

      if (type === 'js') {
        importTag = document.createElement('script');
        importTag.src = url;
      } else if (type === 'css') {
        importTag = document.createElement('link');
        importTag.rel = 'stylesheet';
        importTag.href = url;
      }

      if (opts.defer)
        importTag.defer = true;
      if (opts.async)
        importTag.async = true;

      importTag.id = tagID;

      importTag.onload = () => resolve(true);
      importTag.onerror = () => resolve(false);
      importTag.onabort = () => resolve(false);

      return document.head.appendChild(importTag);
    }

    return resolve(true);
  });
};

export default async function asyncImportScript(tagID, url, type = 'js', opts = {}) {
  if (typeof type === 'object') {
    opts = type;
    type = 'js';
  }

  const {
    retry = false
  } = opts;

  let success = await scriptImport(tagID, url, type, opts);

  if (retry && !success) {
    let intent = 0;
    const intents = retry === true ? 100 : retry;

    for (let i = 0; i++; i < intents) {
      success = await scriptImport(tagID, url, type, opts);

      if (success)
        break;
    }
  }

  return Promise.resolve(success);
}
