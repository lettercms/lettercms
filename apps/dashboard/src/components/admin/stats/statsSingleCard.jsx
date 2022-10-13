import Image from 'next/image';
import {useUser} from '@/lib/dashboardContext';

const Card = ({
  _id,
  thumbnail,
  title,
  tags,
  comments,
  views,
  url,
  subdomain
}) => {
  const {blog} = useUser();

  return <div className="post" key={`post-${_id}`}>
    {
      thumbnail
      ? <div className="image" style={{ backgroundImage: `url(${thumbnail})` }} />
      : <div className="image-title">{!title ? 'N' : title[0].toUpperCase()}</div>
    }
    <div className="data">
      <span>{title || '(Nueva Entrada)'}</span>
      <div>
        {
          tags
          && <span className="tags">{tags.join(', ')}</span>
        }
        <div className="align">
          <img src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/bubbles.svg" alt='bubbles' />
          <span>{comments}</span>
        </div>
        <div className="align">
          <img src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/eye.svg" alt='eye' />
          <span>{views}</span>
        </div>
        <div className="buttons">
          <div className='card-icon' onClick={() => window.open(`https://${blog.domain}/${url}`, '_blank')}>
            <Image src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/link.svg' layout='fill' alt='asset'/>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      div.post {
        padding: 0 5% 0 0;
        margin: 10px auto;
        width: 96%;
        height: 150px;
        background: white;
        border-radius: 10px;
        box-shadow: 1px 1px 5px gray;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      div.post .image {
        background-size: cover;
        background-position: center;
        display: inline-block;
        width: 150px;
        height: 150px;
      }
      div.post .image-title {
        width: 150px;
        height: 150px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #5f4dee, #03a9f4);
        color: white;
        font-size: 32px;
      }
      div.post .data {
        display: inline-block;
        margin: 0 0 0 25px;
      }
      div.post .buttons {
        position: absolute;
        bottom: 1rem;
        right: 1%;
      }
      div.post .buttons .card-icon {
        margin: 0 10px;
        height: 25px;
        width: 25px;
        cursor: pointer;
      }
      div.post span {
        margin: 5px;
        display: inline-block;
      }
      div.post span.tags {
        display: block;
        color: #7f7f7f;
        font-size: 14px;
        margin: 10px;
      } 
      .align {
        display: inline-flex;
        align-items: center;
      }
      .align img {
        width: 25px;
      }
      .buttons {
        display: flex;
      }
    `}</style>
  </div>;
};

export default Card;
