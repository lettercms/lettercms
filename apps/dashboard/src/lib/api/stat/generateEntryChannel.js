export default function generateEntries(url) {
  if (/google\./.test(url))
    return 'organic';

  if (/(facebook|twitter|linkedin|instagram|pinterest|)\./.test(url))
    return 'social';

  if (!url)
    return 'direct';
};
