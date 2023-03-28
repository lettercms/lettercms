import Link from 'next/link';

export default function AsideCard({thumbnail, title, url}) {
  return <div className='flex flex-row aside-card items-center'>
    <Link href={`/blog/${url}`}>
      <a target='_blank'>
        <img width='1' height='1' src='/pixel.png' alt={`${title} - LetterCMS`}/>
        {
          thumbnail
          ? <div className='aside-thumbnail' style={{backgroundImage: `url(${thumbnail}&h=100&q=50)`}}></div>
          : <div className='flex flex-center aside-no-thumbnail'>
              <span>{title[0].toUpperCase()}</span>
            </div>
        }
      </a>
    </Link>
    <div className='aside-title'>
      <span>{title}</span>
    </div>
    <style jsx>{`
      .aside-card {
        width: 100%;
        margin: .5rem 0;
      }
      a {
        text-decoration: none !important;
      }
      .aside-no-thumbnail,
      .aside-thumbnail {
        height: 6rem;
        width: 6rem;
        border-radius: 10px 0 0 10px;
      }
      .aside-thumbnail {
        background-position: center;
        background-size: cover;
      }
      .aside-no-thumbnail {
        background: linear-gradient(to right, #5f4dee, #03a9f4);
        color: white;
      }
      .aside-title {
        flex-grow: 1;
        padding: 0 .5rem;
      }
    `}</style>
  </div>;
}