const generateDelay = timeString => {
  const date = new Date(timeString);
  const now = Date.now();
   

  return `${parseInt((date - now) / 1000)}s`;
};

const schedule = async (date, req) => {
  try {
    const delay = generateDelay(date);

    const res = await fetch(`https://qstash.upstash.io/v1/publish/${req.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Upstash-Delay': delay,
        'Authorization': `Bearer ${process.env.QSTASH_TOKEN}`,
        'Upstash-Forward-Authorization': req.token
      },
      body: JSON.stringify(req.body)
    });

    if (!res.ok)
      return Promise.reject(await res.json());

    return res.json();
  } catch(err) {
    return Promise.reject(err);
  }
};

export default schedule;
