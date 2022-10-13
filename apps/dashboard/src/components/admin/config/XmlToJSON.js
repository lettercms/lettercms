import convert from 'xml-js';

const ToJSON = xml => convert.xml2js(xml, { compact: true });

export default ToJSON;
