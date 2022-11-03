import Image from 'next/image';
import {useUser} from '@/lib/dashboardContext';
import Eye from '@/components/svg/eye';
import Preview from '@/components/svg/preview';
import Edit from '@/components/svg/edit';
import Bubbles from '@/components/svg/bubbles';
import Trash from '@/components/svg/trash';
import LinkSvg from '@/components/svg/link';

const Card = ({
  _id,
  thumbnail,
  title,
  tags,
  comments,
  views,
  postStatus,
  pageStatus,
  url,
  fullUrl,
  isProtected,
  authorEmail,
  edit,
  del
}) => {
  const notProtect = !isProtected;
  const {blog} = useUser();

  return <li className="post" key={`post-${_id}`}>
    {
      thumbnail
      ? <div className="image" style={{ backgroundImage: `url(${thumbnail}&h=150)` }} />
      : <div className="image-title">{!title ? 'N' : title[0].toUpperCase()}</div>
    }
    <div className="data">
      <span>{title ? title : postStatus ? '(Nueva Entrada)' : '(Nueva Pagina)'}</span>
      <div>
        <div className='views-comments-container'>
          <div className='tags-container'>
            <div className='tags'>
              {
                tags ? tags.map(e => <span key={e} className='tag'>{e}</span>) : null
              }
            </div>
          </div>
          <div className='views-container'>
            {
              !pageStatus &&
              <div className="align">
                <Bubbles style={{height: 22}}/>
                <span>{comments}</span>
              </div>
            }
            <div className="align">
              <Eye style={{height: 22}}/>
              <span>{views}</span>
            </div>
          </div>
        </div>
        <div className="buttons">
          {
            postStatus === 'published' &&
            <div className='card-icon' onClick={() => window.open(`https://${blog.domain}${fullUrl}`, '_blank')}>
              <LinkSvg style={{height: 25}}/>
            </div>
            }
            {
            postStatus === 'draft' &&

            <div className='card-icon' onClick={() => window.open(`https://${blog.domain}/api/preview?id=${_id}`, '_blank')}>
              <Preview style={{height: 25}}/>
            </div>
          }
          {
            pageStatus === 'published' &&
            <div className='card-icon' onClick={() => window.open(`https://${blog.domain}/${url}`, '_blank')}>
              <LinkSvg style={{height: 25}}/>
            </div>
          }
          {
            notProtect &&
            <div className='card-icon' onClick={() => edit(_id)}>
              <Edit style={{height: 25}}/>
            </div> 
          }
          {
            notProtect &&
            <div className='card-icon' onClick={() => del(_id)}>
              <Trash style={{height: 25}}/>
            </div>
          }
        </div>
      </div>
    </div>
    <style jsx>{`
      .card-icon {
        width: 25px;
        height: 25px;
        position: relative;
        margin: 5px;
        cursor: pointer
      }
      li.post {
        padding: 0 5% 0 0;
        margin: 10px 0;
        width: 100%;
        height: 150px;
        background: white;
        border-radius: 10px;
        box-shadow: 1px 1px 5px gray;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      li.post .image {
        background-size: cover;
        background-position: center;
        display: inline-block;
        width: 150px;
        height: 150px;
      }
      li.post .image-title {
        width: 150px;
        height: 150px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #5f4dee, #03a9f4);
        color: white;
        font-size: 32px;
      }
      li.post .data {
        display: flex;
        margin: 0 0 0 25px;
        margin: 0 0 0 25px;
        align-items: start;
        justify-content: space-between;
        flex-direction: column;
        height: 80%;
      }
      li.post .buttons {
        position: absolute;
        bottom: 5%;
        right: 1%;
      }
      li.post .buttons button {
        margin: 0 10px
      }
      li.post span {
        margin: 5px;
        display: inline-block;
      }
      li.post span.tags {
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
      .views-comments-container {
        display: flex;
        flex-direction: column;  
      }
      .views-comments-container .views-container {
        display: flex;
      }
      .views-comments-container .views-container div {
        display: flex;
      }
      .tags .tag {
        padding: .1rem .5rem;
        margin: 0 .2rem;
        font-size: .7rem;
        border: solid 1px #999;
        color: #999;
        text-align: center;
        border-radius: 50px;
      }
    `}</style>
  </li>;
};

export default Card;
