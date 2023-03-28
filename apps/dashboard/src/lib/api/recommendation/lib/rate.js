export default function RatePost(rates, tags) {
  let score = 0;

  tags.forEach(e => {
    let key = e.replace(/\s/g, '-').toLowerCase();

    const val = rates[key];

    if (val)
      score += val;
  });

  return score;
}