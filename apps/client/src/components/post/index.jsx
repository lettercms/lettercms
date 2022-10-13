import Link from 'next/link';
import dynamic from 'next/dynamic';
import Head from '@/components/postHead';
import Share from '@/components/post/share';
import About from '@/components/post/about';
import HandleDate from '@/lib/handleDate';
import Banners from '@/components/banners';
import {useEffect} from 'react';

 const Post = props => {
   const date = new Date();
   const defaultDate = date.toISOString(); 
    const {
      post: {
        images = [],
        content = '',
        tags = [],
        updated = defaultDate,
        published = defaultDate,
        category,
        author,
        subdomain,
        thumbnail,
        fullUrl,
        url = ''
      },
      status,
      isSubscribe = false,
      origin,
      blog,
    } = props;

    const title = props.post.title || 'Este deberia ser el titulo que olvidaste colocar';
    const description = props.post.description || 'Esta la descripcion que olvidaste colocar';

    useEffect(() => {
      let lazyImages = [].slice.call(document.querySelectorAll('img.lazy-img'));
      let active = false;

      const lazyLoad = () => {
        if (active === false) {
          active = true;

          setTimeout(() => {
            lazyImages.forEach((lazyImage) => {
              const clientRect = lazyImage.getBoundingClientRect();
              if (clientRect.top <= window.innerHeight && clientRect.bottom >= 0) {
                lazyImage.src = lazyImage.dataset.src;

                lazyImage.onload = () => lazyImage.classList.remove('lazy-img');

                lazyImages = lazyImages.filter((image) => image !== lazyImage);

                if (lazyImages.length === 0) {
                  document.removeEventListener('scroll', lazyLoad);
                  window.removeEventListener('resize', lazyLoad);
                  window.removeEventListener('orientationchange', lazyLoad);
                }
              }
            });
            active = false;
          }, 200);
        }
      };

      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationchange', lazyLoad);

      const script = document.createElement('script');
      script.id = '_code';
      script.src = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=sunburst';

      document.body.appendChild(script);

      return () => {
        document.removeEventListener('scroll', lazyLoad);
        window.removeEventListener('resize', lazyLoad);
        window.removeEventListener('orientationchange', lazyLoad);
        document.getElementById('_code')?.remove();
      };
    }, []);

    return (
      <div>
        <Head url={url} category={category} published={updated} title={`${title} | ${blog.title}`} tags={tags} images={images} description={description} />
        <header>
          <div id="header-shadow">
            <h1>{title}</h1>
          </div>
          <img src="/images/davidsdevel-rombo.png" />
        </header>
        <div>
          <div>
            <span className="publish-date">{HandleDate.getGMTDate(published)}</span>
          </div>
          <main dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <ul id="tags">
          {tags.map((e) => (
            <li key={`tag-${e}`}>
              <Link href={`/search?q=${e}`}>
                <a>{e}</a>
              </Link>
            </li>
          ))}
        </ul>
        <Share subdomain={subdomain} url={fullUrl} title={title} isSubscribe={isSubscribe} />
        <About {...author}/>
        <h4>Comentarios</h4>
        <div
          id="comments-container"
          dangerouslySetInnerHTML={{
            __html: `<div
       class="fb-comments"
       data-href=${origin}?url=${url}
       data-width="100%"
       data-numposts="20"
      ></div>`
          }}
        />
        <style jsx>
          {`
        header {
          background-image: url(${thumbnail || images?.[0] || '/images/privacidad.jpg'});
          height: 600px;
          width: 100%;
          background-position: center;
          background-size: cover;
          overflow: hidden;
        }
        header img {
          position: absolute;
          width: 30%;
          top: 100px;
          left: 35%;
        }
        h1 {
          color: white;
          width: 90%;
          margin: 300px auto 0;
          text-align: center;
        }
        header #header-shadow {
          overflow: hidden;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, .5)
        }
        .publish-date {
          margin:  2rem 5% 0;
          display: block;
          font-weight: bold;
          font-size: 16px;
          color: rgb(80, 80, 80)
        }
        main {
          padding: 0 5%;
          margin: 2rem 0;
        }
        #tags {
          margin: 0 0 20px;
          padding: 0 0 0 5%;
        }
        #tags li {
          font-size: 12px;
          margin: 5px 0;
        }
        .banner-container {
          margin 50px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #comments-container {
          width: 90%;
          margin: auto;
        }
        @media screen and (min-width: 720px) {
          main {
            width: 60%;
            display: inline-block;
          }
          header img {
            position: absolute;
            width: 20%;
            top: 100px;
            left: 40%;
          }
          #comments-container {
            width: 60%;
          }
        }
        @media screen and (min-width: 960px) {
          header img {
            width: 10%;
            top: 200px;
            left: 45%;
          }
          h1 {
            background: linear-gradient(90deg, black, transparent);
            margin: 400px 0 0;
            padding: 20px;
            text-align: initial;
          }
        }
      `}
        </style>
        <style global jsx>
          {`
        h1, h2, h3, h4 {
          text-align: center;
          margin: 30px 0 50px;
        }
        b {
          color: black;
        }
        main p {
          text-align: justify;
          padding: 1rem 0;
          font-size: 1rem;
          line-height: 1.75;
          font-weight: 300;
        }
        main img {
          max-width: calc(100%);
          height: auto;
        }
        main img.lazy {
          filter: blur(8px)
        }
        main ul {
          padding: 0 0 0 20px;
          margin: 10px 0;
        }
        main ul li {
          margin: 5px 0;
          list-style: initial;
        }
        blockquote {
          font-style: italic;
          color: gray;
          font-size: 18px;
          margin: 15px auto;
          border-left: 5px gray solid;
          padding-left: 15px;
        }
        @media screen and (min-width: 780px) {
          main p {
            text-align: left;
          }
        }
      `}
        </style>
      </div>
    );
  };

  export default Post;
  