import blogs from '@lettercms/models/blogs';

export default function parseTags(arr) {
  let _parsed = {};

  arr.forEach(e => _parsed[e.replace(/\s/g, '-').toLowerCase()] = 1);

  return _parsed;
};
