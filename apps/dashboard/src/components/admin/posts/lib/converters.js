export const figureToImageBlock = {
  view: {
    name: 'figure',
    classes: ['image', 'lettercms-image']
  },
  model: ( viewElement, { writer } ) => {
    const child = viewElement.getChild(0);

    const dimensions = child.getAttribute('width') + 'x' + child.getAttribute('height');
    const src = child.getAttribute('data-src');

    return writer.createElement( 'imageBlock', {
      'data-src': src,
      'data-dimensions': dimensions
    });
  },
  converterPriority: 'high'
};

export const imageToDataFigure  = d => d.on('attribute:data-src:imageBlock', (e, data, {mapper, writer}) => {
  const figure = mapper.toViewElement(data.item);
  const img = figure.getChild(0);
    
  writer.setAttribute('data-src', data.attributeNewValue, img);
  writer.setAttribute('class', 'lazy-img', img);
});

export const imageDimensionsToDataFigure  = d => d.on('attribute:data-dimensions:imageBlock', (e, data, {mapper, writer}) => {
  const figure = mapper.toViewElement(data.item);
  const img = figure.getChild(0);
    
  const attr = data.attributeNewValue;
  const [width, height] = attr.split('x');

  writer.setAttribute('width', width, img);

  //Commented to mantain aspect ratio on img
  //writer.setAttribute('height', height, img);
});


export const imageToEditFigure = d => d.on('attribute:data-src:imageBlock', (e, data, {mapper, writer}) => {

  const figure = mapper.toViewElement(data.item);
  const img = figure.getChild(0);
    
  writer.setAttribute('src', data.attributeNewValue, img);
  writer.setAttribute('data-editted', 'true', img);
});
