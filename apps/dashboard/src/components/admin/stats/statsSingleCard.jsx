import {useUser} from '@/components/layout';
import Bubbles from '@/components/svg/bubbles';
import Eye from '@/components/svg/eye';
import Link from '@/components/svg/link';


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
      ? <div className="image" style={{ backgroundImage: `url(${thumbnail}&h=175&q=50)` }} />
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
          <Bubbles height='24'/>
          <span>{comments}</span>
        </div>
        <div className="align">
          <Eye height='24'/>
          <span>{views}</span>
        </div>
        <div className="buttons">
          <div className='card-icon' onClick={() => window.open(`https://${blog.domain}/${url}`, '_blank')}>
            <Link height='24'/>
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
      @media (max-width: 480px) {
        .post {
          flex-direction: column;
          padding: 0 !important;
          height: auto !important;
        }
        .post .image {
          width: 100% !important;
          height: 150px !important;
        }
        .post .data {
          display: inline-block !important;
          margin: 0 1rem 0.5rem !important;
        }
        .post .data span {
          text-align: center;
        }
      }
    `}</style>
  </div>;
};

export default Card;
