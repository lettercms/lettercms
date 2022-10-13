const generateData = views => {
  const total = views.length;
  const tags = {};
  const keys = views.map(e => Object.keys(e));

  keys.forEach(e => e.forEach(a => tags[a] = a in tags ? tags[a] + 1 : 1));

  //Generate discrete ratings
  Object.entries(tags).forEach(([key, value]) => tags[key] = value / total);

  const trainingData = views.map((e, i) => {
    const input = e;
    
    const ratings = Object.keys(input).map(tag => tags[tag]);

    const wanted = ratings.reduce((a,b) => a + b) / ratings.length;

    return {
      input,
      output: {
        wanted
      }
    };
  });

  return trainingData;
};

export default generateData;
