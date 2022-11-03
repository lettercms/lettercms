export const figureToImageBlock = {
  view: 'figure',
  model: ( viewElement, { writer } ) => {
    const child = viewElement.getChild(0);

    const width = child.getAttribute('width');
    const src = child.getAttribute('data-src');

    console.log('m >', viewElement)


    return writer.createElement( 'imageBlock', {
      'data-src': src,
      'data-width': width
    });
  },
  converterPriority: 'high'
};

export const imageToDataFigure  = d => d.on('attribute:data-src:imageBlock', (e, data, {mapper, writer}) => {
  const figure = mapper.toViewElement(data.item);
  const img = figure.getChild(0);
    
  console.log('v >', data)

  writer.setAttribute('src', data.attributeNewValue + '&w=100', img);
  writer.setAttribute('data-src', data.attributeNewValue, img);
  writer.setAttribute('srcset', `${data.attributeNewValue}&w=480 480w, ${data.attributeNewValue}&w=720 720w, ${data.attributeNewValue}&w=1024 1024w, ${data.attributeNewValue}&w=2048 1400w`, img);  
  writer.setAttribute('class', 'lazy-img', img);
});

export const imageDimensionsToDataFigure  = d => d.on('attribute:data-width:imageBlock', (e, data, {mapper, writer}) => {
  const figure = mapper.toViewElement(data.item);
  const img = figure.getChild(0);

  console.log('w >', data)


  writer.setAttribute('width', data.attributeNewValue, img);
});


export const imageToEditFigure = d => d.on('attribute:data-src:imageBlock', (e, data, {mapper, writer}) => {

  const figure = mapper.toViewElement(data.item);
  const img = figure.getChild(0);

  console.log('e >', data)
    
  writer.setAttribute('src', data.attributeNewValue, img);
  writer.setAttribute('data-src', data.attributeNewValue, img);
});
