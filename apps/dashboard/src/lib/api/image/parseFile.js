//import generateSVG from './generateSVG';
//import generateHash from './generateHash';

const parseFile = ({name, metadata}, fields) => {

  const url = `https://lettercms-usercontent.vercel.app/${name}?q=75`;
  
  const parsed = {
    id: name.split('/')[1].replace('.webp', ''),
    name: name.split('/')[1],
    url,
    //placeholder: generateSVG(metadata),
    //token: generateHash(url)
  };

  return parsed;
};

export default parseFile;