import pages from '@lettercms/models/pages';
import {findOne}  from '@lettercms/utils/lib/findUtils';

export default async function GetGrapesJS() {
  const {req, res, findSingle} = this;

  const {_id} = req.query;

  const {html, css} = await findOne(pages, {_id}, {fields: 'html,css'});

  res.setHeader('Content-Type', 'application/json');

  res.send({
    html,
    css
  });
};
