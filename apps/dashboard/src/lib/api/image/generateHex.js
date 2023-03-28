const generateHex = arr => {
  let hex = '#';

  arr.forEach(e => {
    let n = e.toString(16);

    if (e.length === 1)
      hex += '0' + n;
    else
      hex += n;
  });

  return hex;
};

export default generateHex;
