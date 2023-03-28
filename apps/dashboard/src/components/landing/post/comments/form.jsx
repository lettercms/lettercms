import {useState} from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import {useToken} from '@/lib/userContext';
import _sdk from '@lettercms/sdk';

const publish = async (comment, {user, postID, replyTo}, cb, accessToken) => {
  const path = `/comment${replyTo ? '/' + replyTo : ''}`;

  const sdk = new _sdk.Letter(accessToken);

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


export default function CommentForm({user, isReply, postID, inline, replyTo, onPublish}) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const {accessToken} = useToken();

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
    <Button
      disabled={!comment}
      type='outline'
      alt
      loading={loading}
      style={{width: inline ? '' : '50%'}}
      onClick={() => {
        setLoading(true);

        publish(comment, data, d => {
          onPublish(d);
          setLoading(false);
        }, accessToken);
      }}
    >Enviar</Button>
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
      .comment-form {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .comment-form.inline-form {
        flex-direction: row;
      }
      .comment-form button.icon {
        width: 3rem;
        height: 3rem;
        background: none;
        border: solid 1px white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    `}</style>
  </div>;
};