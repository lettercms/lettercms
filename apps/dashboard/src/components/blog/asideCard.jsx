import Link from 'next/link';

export default function AsideCard({thumbnail, title, fullUrl}) {
  return <div className='flex flex-row aside-card'>
    <Link href={fullUrl}>
      <a target='_blank'>
        {
          thumbnail
          ? <div className='aside-thumbnail' style={{backgroundImage: `url(${thumbnail})`}}></div>
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