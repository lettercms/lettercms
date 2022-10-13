const generateSVG = ({ gradientA, gradientB, width, height}) => {
  const base = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><g><defs><linearGradient id="avatar" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${gradientA}"/><stop offset="100%" stop-color="${gradientB}"/></linearGradient></defs><rect fill="url(#avatar)" x="0" y="0" width="${width}" height="${height}" /></g></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(base)}`;
};

export default generateSVG;
