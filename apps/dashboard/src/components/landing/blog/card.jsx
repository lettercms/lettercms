'use client'

import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import Share from './shareCard';
import {FaComments} from 'react-icons/fa';

export default function Card({title, content, url, thumbnail, comments, ID, size, translation}) {
  const [isShareOpened, setIsSharedOpened] = useState(false);
  const [shareDisplay, setShareDisplay] = useState('none');
  const [shareOpacity, setShareOpacity] = useState(0);

  const router = useRouter();

  const toggleShare = () => {
    setIsSharedOpened(!isShareOpen);

    if (shareDisplay === 'flex') {
      setShareOpacity(0);
      setTimeout(() => setShareDisplay('none'), 310);
    } else {
      setShareDisplay('flex');
      setTimeout(() => setShareOpacity(1), 0);
    }
  };

  return <div className="blog-card">
    <Link href={`/blog/${url}`}>
      <img width='1' height='1' src='/pixel.png' style={{position: 'absolute'}} alt={title}/>
      {
        !!thumbnail
          ? <div className="card-header-image" style={{ backgroundImage: `url(${thumbnail}&w=500&q=50)` }} />
          : <div className="card-header-title">
              <h3>{size === 'big'  ? title[0].toUpperCase() : title}</h3>
            </div>
      }
    </Link>
    <div className="data-cont">
      {(!!thumbnail || size === 'big') && 
        <div className="title-container">
          <h3>{title.length > 70 ? title.slice(0, 67) + '...' : title}</h3>
        </div>
      }
      <p>{content.length > 200 ? `${content.slice(0, 197)}...` : content}</p>
      <div className="comment-container">
        <div/>
        <div>
          <span>{comments}</span>
          <FaComments height='18'/>
        </div>
      </div>
      <div>
        <button className="view-more" onClick={() => { router.push(`/blog/${url}`);}}>
          {translation['See more']}
        </button>
        <button className="share" onFocus={toggleShare} onBlur={toggleShare}>
          {translation['Share']}
        </button>
      </div>
      <Share style={{ opacity: shareOpacity, display: shareDisplay }} title={title} url={`https://lettercms.vercel.app/blog/${url}`} />
    </div>
    <style jsx>
          {`
        .comment-container {
          padding: 20px;
          display: flex;
          text-align: right;
          justify-content: space-between;
          align-items: center;
        }
        .comment-container div {
          display: flex;
          align-items: center;
        }
        .comment-container img {
          height: 18px;
        }
        .comment-container img.download-icon {
          cursor: pointer;
        }
        :global(.comment-container div svg) {
          margin: 0 10px;
        }
        .blog-card {
          width: 90%;
          margin: 50px auto;
            position: relative;
            border-radius: 10px;
            overflow: hidden;
        }
        .blog-card p {
          color: #505050;
        }
        .blog-card .card-header-image {
          height: 200px;
            background-position: center;
            background-size: cover;
        }
        .blog-card .card-header-title {
          height: 300px;
          background: black;
          display: flex;
             justify-content: center;
          align-items: center;
        }
        .blog-card .card-header-title h3 {
          color: white;
        }
        .blog-card .title-container {
          height: 100px;
          display: flex;
             justify-content: center;
             align-items: center;
        }
        .blog-card h3 {
          text-align: center;
            padding: 10px;
        }
        .blog-card p {
          height: 100px;
          padding: 0 10px;
        }
        .blog-card div button {
          width: 50%;
          height: 35px;
          border: none;
          cursor: pointer;
        }
        .blog-card div .view-more {
          border-radius: 0 0 0 10px;
          color: white;
          font-size: 15px;
          background: #5f4dee;
        }
        .blog-card div .share {
          border-radius: 0 0 10px 0;
          color: #03A9F4;
          font-size: 15px;
          background: white;
        }
        @media screen and (min-width: 480px) {
          .blog-card {
            width: 80%;
            margin: 50px auto 50px;
          }
        }
        @media screen and (min-width: 720px) {
          .blog-card {
            width: ${size === 'big' ? '65%' : '45%'};
            margin: 50px ${size === 'big' ? '0' : '2.5%'};
            display: inline-block;
            position: relative;
            overflow: hidden;
          }
          .blog-card > a {
            ${size === 'big'
            ? `display: inline-block;
              width: 35%;
              top: 0;
              height: 100%;
              position: absolute;` : 'position: relative;display: block;width: 100%;'
            }
            overflow: hidden;
          }
          .blog-card .card-header-image,
          .blog-card .card-header-title {
            ${size === 'big'
              ? `display: inline-block;
              width: 100%;height:100%;` : ''
            }
          }
          .blog-card .data-cont {
            ${size === 'big'
              ? `display: inline-block;
              width: 65%;margin-left: 35%;` : ''
            }
          }
          .blog-card div .view-more {
            ${size === 'big'
              ? 'border-radius: 0;' : ''
            }
          }
          .blog-card p {
            ${size === 'big'
              ? 'height: 60px;' : ''
            }
            
          }
        }
      `}
    </style>
  </div>
}
