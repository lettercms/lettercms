export default function generateData(views) {  
  const tags = {};
  
  const total = views.length;

  const keys = views.map(e => Object.keys(e));

  keys.forEach(e => e.forEach(a => tags[a] = a in tags ? tags[a] + 1 : 1));

  //Generate discrete ratings
  Object.entries(tags).forEach(([key, value]) => tags[key] = value / total);

  return tags;
};
