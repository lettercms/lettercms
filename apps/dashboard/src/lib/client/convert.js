const convertImage = async (original, format = 'webp', quality = .20, size = 1) => {

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Use the intrinsic size of image in CSS pixels for the canvas element
  canvas.width = original.naturalWidth *size;
  canvas.height = original.naturalHeight *size;

  // To use the custom size we'll have to specify the scale parameters
  // using the element's width and height properties - lets draw one
  // on top in the corner:
  ctx.scale(size, size);
  ctx.drawImage(original, 0, 0);

  return canvas.toDataURL(`image/${format}`, quality);
};