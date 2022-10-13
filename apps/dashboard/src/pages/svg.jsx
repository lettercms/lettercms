import {useState, useEffect} from 'react';

const arr = new Array(500);

const images = arr.fill(0);

export default function SVG() {
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
  }, []);

  return <div>
    {
      images.map((e, i) => <img  loading="lazy" className='lazy-img' key={`/illustrations/${i+1}.svg`} src={`/illustrations/${i+1}.svg`}/>)
    }
    <style jsx global>{`
      img.svg {
        width: 20%;
      }
    `}</style>
  </div>;
}