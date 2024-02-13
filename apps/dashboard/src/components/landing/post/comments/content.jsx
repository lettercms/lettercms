'use client';

import {Fragment, useState} from 'react';
import CommentForm from './form';
import CommentCard from './card';

export default function CommentContent({data, user, postID, onPublish}) {
  const [hides, setHidden] = useState([]);

  if (data.length === 0) {
    return <div className='flex-center' style={{height: '100%'}}>
      <span>No hay comentarios</span>
    </div>;
  }

  const repliesGrups = {};
  
  const comments = data.filter(e => !e.replyTo);
  const replies = data.filter(e => e.replyTo);

  replies.forEach(e => {
    if (!repliesGrups[e.replyTo])
      repliesGrups[e.replyTo] = [];

    repliesGrups[e.replyTo].push(e);
  });

  const hide = id => setHidden(Object.assign([id], hides));
  const show = id => setHidden(hides.filter(e => e !== id));

  return <> {
    comments.map(e => {
      return <Fragment key={e._id}>
        <CommentCard {...e} hide={hide} show={show}/>
        {
          repliesGrups[e._id]
          && !hides.includes(e._id)
          && repliesGrups[e._id].reverse().map(l => <CommentCard key={l._id} {...l} isReply/>)}
        {
          user.name &&
          <div style={{paddingLeft: repliesGrups[e._id] && !hides.includes(e._id) ? '10rem' : '5rem'}}>
            <CommentForm onPublish={onPublish} postID={postID} isReply user={user} inline replyTo={e._id}/>
          </div>
        }
      </Fragment>;
    })
  }</>;
};