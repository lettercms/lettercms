const formidable = require('formidable');
const {rm} = require('fs');
const {usage} = require('@lettercms/models')(['usage']);
const upload = require('./operations/upload');
const generateSVG = require('./generateSVG');
const crypto = require('crypto');
const generateHash = require('./generateHash');

module.exports = async function() {
  const {req: {subdomain}, res} = this;
  const form = formidable({ multiples: false });

  form.parse(this.req, async (err, {name, nameType = 'random'}, {file}) => {
    let _name = '';

    if (nameType === 'random')
      _name = crypto.randomUUID();
    else if (nameType === 'original')
      _name = file.name;
    else if (nameType === 'custom')
     _name = name;
    else {
      rm(file.filepath, () => console.log(`> Deleted ${file.name}`));

      return res.status(403).json({
        status: 'invalid-nameType',
        message: 'nameType must be: original, random or custom'
      });
    }

    const {fileSize, metadata} = await upload(file.filepath, {
      subdomain,
      name: _name
    });

    const url = `https://lettercms-usercontent.vercel.app/${subdomain}/${_name}.webp`;
    const token = generateHash(url);

    await usage.updateOne({subdomain}, {$inc: {filesStorage: fileSize}});
    await usage.updateOne({subdomain}, {$inc: {filesUpload: 1}});

    res.json({
      status: 'OK',
      name: `${_name}.webp`,
      id: _name,
      url,
      placeholder: generateSVG(metadata),
      token
    });
  });
};
