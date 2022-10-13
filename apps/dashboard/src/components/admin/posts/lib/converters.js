export const figureToImageBlock = {
  view: {
    name: 'figure',
    classes: ['image']
  },
  model: ( viewElement, { writer } ) => writer.createElement( 'imageBlock', {
    'data-src': viewElement.getChild(0).getAttribute('data-src')
  }),
  converterPriority: 'high'
};

export const imageToDataFigure  = d => d.on('attribute:data-src:imageBlock', (e, data, {mapper, writer}) => {
  const figure = mapper.toViewElement(data.item);
  const img = figure.getChild(0);
    
  writer.setAttribute('data-src', data.attributeNewValue, img);
  writer.setAttribute('class', 'lazy-img', img);
});

export const imageToEditFigure = d => d.on('attribute:data-src:imageBlock', (e, data, {mapper, writer}) => {

  const figure = mapper.toViewElement(data.item);
  const img = figure.getChild(0);
    
  writer.setAttribute('src', data.attributeNewValue, img);
  writer.setAttribute('data-editted', 'true', img);
});
