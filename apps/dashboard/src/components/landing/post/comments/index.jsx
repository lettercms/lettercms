'use client';

import {useEffect, useState} from 'react';
import _sdk from '@lettercms/sdk';
import Base from '@/components/dashboard/admin/stats/base';
import {ImSpinner9} from 'react-icons/im';
import {useToken} from '@/components/landing/layout';
import CommentForm from './form';
import CommentData from './content';
import UserDataForm from './userData';

export default function Comments({id, numPosts = 10, user}) {
  const [isLoad, setLoad] = useState(true);
  const [username, setUsername] = useState(user?.name);
  const [data, setData] = useState([]);
  const {accessToken} = useToken();

  useEffect(() => {
    const sdk = new _sdk.Letter(accessToken);

    sdk.createRequest(`/comment/${id}`, {
      limit: numPosts,
      fields: [
        'user.name',
        'comment',
        'published'
      ]
    })
    .then(({data}) => {
      setData(data);
      setLoad(false);
    });
  }, [id, accessToken, numPosts]);

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
        username
          ? <CommentForm user={user} postID={id} onPublish={onPublish}/>
          : <UserDataForm onSetName={setUsername}/>
      }
      </div>
      <hr/>
      <ul>
       {
         isLoad
          ? <div className='flex-center' style={{height: '100%'}}>
              <ImSpinner9 width='64' fill='#fff' className='rotate'/>
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
}