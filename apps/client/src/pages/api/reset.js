import connect from '@lettercms/utils/lib/connection';
import blogModel from '@lettercms/models/blogs';

export default async function reset(req, res) {
  await connect();

  await blogModel.syncIndexes();
  //await blogModel.updateOne({subdomain: 'davidsdevel'}, {$set: {categories: new Map()}});


  const r = await blogModel.findOne({subdomain: 'davidsdevel'});

  /*const r = {
    isVisible: false,
    hasCustomRobots: false,
    url: '1',
    mainUrl: '/blog',
    thumbnail: 'https://cdn.jsdelivr.net/gh/lettercms/lettercms/apps/cdn/public/og-template.png',
    subdomain: 'davidsdevel',
    title: "David's Devel - Blog",
    description: 'Descripcion de prueba',
    ownerEmail: 'davidsdevel@gmail.com',
    owner: '6355e31daaf37c0009f30ce5',
    created: '2022-10-24T00:58:23.750Z',
  }
  
  await blogModel.create(r);*/
  //const r = await blogModel.deleteOne({subdomain: 'davidsdevel'});

  console.log(r)

  res.json({})

}