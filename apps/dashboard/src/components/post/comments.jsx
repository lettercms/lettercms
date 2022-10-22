import {useEffect, useState} from 'react';
import _sdk from '@lettercms/sdk';
import Input from '../input';
import Base from '../admin/stats/base';
import HandleDate from '../../lib/handleDate';
import Cookie from 'js-cookie';
import {Fragment} from 'react';
import Spinner from '@/components/svg/spinner';
import {useToken} from '@/lib/userContext';

const sdk = new _sdk.Letter();

const publish = async (comment, {user, postID, replyTo}, cb) => {
  const path = `/comment${replyTo ? '/' + replyTo : ''}`;

  const {status, id} = await sdk.createRequest(path, 'POST', {
    userID: user._id,
    comment,
    postID
  });

  if (status === 'OK')
    cb({
      _id: id,
      comment,
      replyTo,
      post: postID
    });
};

const CommentForm = ({user, isReply, postID, inline, replyTo, onPublish}) => {
  const [comment, setComment] = useState('');
  const data = {
    replyTo,
    postID,
    user
  };
  return <div className={`comment-form${inline ? ' inline-form' : ''}`}> 
    {
      inline &&
      <div className='comment-picture'>
        <span>
          {user.name[0].toUpperCase()}
        </span>
      </div>
    }
    <Input label='Comentario' value={comment} onInput={({target: {value}}) => setComment(value)} type={inline ? 'text' : 'textarea'} style={{resize: 'none'}}/>
    {
      inline
      ? <button disabled={!comment} className='icon' onClick={() => publish(comment, data, onPublish)}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24">
          <path fill='#fff' d="M2.016 21v-6.984l15-2.016-15-2.016v-6.984l21 9z"/>
        </svg>
      </button>
      : <button disabled={!comment} className='btn-outline-sm alter' onClick={() => publish(comment, data, onPublish)}>Enviar</button>
    }
    <style jsx global>{`
      .comment-form .form-group {
        margin: 0 0 1rem !important;
        width: 100%;
      }
      .inline-form .form-group {
        margin: 0 1rem !important;
        width: calc(100% - 11rem);
      }
    `}</style>
    <style jsx>{`
      @media (min-width: 721px) {

        .btn-outline-sm {
          max-width: 25rem;
          margin-left: 0;
          margin-right: 0;
        }
      }
      .comment-form {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .comment-form.inline-form {
        flex-direction: row;
      }
      .comment-form button.icon {
        width: 2.75rem;
        height: 2.75rem;
        background: none;
        border: none;
      }
    `}</style>
  </div>;
};

const CommentCard = ({_id, show, hide, comment, isReply, user, published}) => {
  const [isHidden, toggle] = useState(false);

  const toggleComments = isHidden ? show : hide;

  return <li className={isReply && 'reply'}>
    <div className='comment-picture desktop'>
      <span>
        {user.name[0].toUpperCase()}
      </span>
    </div>
    <div className='comment-body'>
      <div>
        <div className='comment-picture mobile'>
          <span>
            {user.name[0].toUpperCase()}
          </span>
        </div>
        <hr className='mobile'/>
      </div>
      <div className='comment-head flex'>
        <span>{user.name} {user.lastname}</span>
        <span>{HandleDate.getGMTDate(published)}</span>
      </div>
      <hr/>
      <div>
        <span>{comment}</span>
      </div>
      <hr style={{display: isReply ? 'none' : 'block'}}/>
      <div className='show-reply' style={{display: isReply ? 'none' : 'flex'}}>
        <span>Respuestas</span>
        <button className='toggle-replies'  onClick={() => {
          toggle(!isHidden);
          toggleComments(_id);
        }}>
          <svg width='24' style={{ transition:'ease .6s', transform: `rotate(${isHidden ? '18' : ''}0deg)`}} height='24' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill='#fff' d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/>
          </svg>
        </button>
      </div>
    </div>
    <style jsx>{`
      .toggle-replies {
        width:24px;
        height: 24px;
        background: none;
        border: none;
      }
      .desktop {
        display: none;
      }
      .mobile {
        display: flex
      }
      @media (min-width: 721px) {
        .desktop {
          display: flex;
        }
        .mobile {
          display: none
        }
        .reply {
          padding-left: 5rem;
        }
      }
      li {
        list-style: none;
        margin: .5rem 0;
        display: flex;
      }
      hr {
        border-color: white;
      }
      li .comment-body {
        border: solid 1px white;
        padding: 1rem 5%;
        border-radius: 16px;

        flex-grow: 1;
        margin: 0 1rem;
        width: calc(100% - 8rem);
      }
      .show-reply {
        align-items: center;
        justify-content: end;
      }
      @media (max-width: 720px) {
        .reply {
          width: 90%;
          margin: auto;
        }
        li .comment-body {
          margin: 0 1rem;
          width: 100%;
        } 
      }
      li .comment-head {
        justify-content: space-between;
      }
    `}</style>
  </li>;
};

const CommentData = ({data, user, postID, onPublish}) => {
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
          user.email &&
          <div style={{paddingLeft: repliesGrups[e._id] && !hides.includes(e._id) ? '10rem' : '5rem'}}>
            <CommentForm onPublish={onPublish} postID={postID} isReply user={user} inline replyTo={e._id}/>
          </div>
        }
      </Fragment>;
    })
  }</>;
};

const Comments = ({id, numPosts = 10, user}) => {
  const [isLoad, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const [pageToken, setPageToken] = useState(false);
  const {accessToken} = useToken();

  useEffect(() => {
    sdk.setAccessToken(accessToken);

    sdk.createRequest(`/comment/${id}`, {
      limit: numPosts
    })
    .then(({data}) => {
      setData(data);
      setLoad(false);
    });
  }, [id, accessToken]);

  const onPublish = (d) => {
    const newData = data.concat([{
      ...d,
      user
    }]);

    setData(newData);
  };

  return <Base title='Comentarios' principal rows={1} style={{height: 'auto', maxWidth: 1024}}>
    <div id='lettercms-comments'>
      <div id='comment-top'> {
        user?.email
          ? <CommentForm user={user} postID={id} onPublish={onPublish}/>
          : <div className='flex-center'>
            <span>Tienes que suscribirte para poder comentar las entradas</span>
          </div>
      }
      </div>
      <hr/>
      <ul>
       {
         isLoad
          ? <div className='flex-center' style={{height: '100%'}}>
              <Spinner width='64' fill='#fff' className='rotate'/>
            </div>
          : <CommentData postID={id} data={data} user={user} onPublish={onPublish}/>
       }
      </ul>
    </div>
    <style jsx global>{`
      .comment-picture {
        width: 4rem;
        height: 4rem;
        color: white;
        background: #03a9f4;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
    <style jsx>{`

      #lettercms-comments {
        width: 100%;
        padding: 0 10%;
      }
      @media (max-width: 480px) {
        #lettercms-comments {
          padding: 0 2.5%;
        }
      }
      @media (max-width: 720px) {
        #lettercms-comments {
          padding: 0 5%;
        }
      }
      ul {
        height: 20rem;
        overflow: auto;
      }
    `}</style>
  </Base>;
};

export default Comments;
