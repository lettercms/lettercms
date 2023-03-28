import {useState} from 'react';
import HandleDate from '@/lib/handleDate';

export default function CommentCard({_id, show, hide, comment, isReply, user, published}) {
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
          <svg width='24' style={{transform: `rotate(${isHidden ? '18' : ''}0deg)`}} height='24' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
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