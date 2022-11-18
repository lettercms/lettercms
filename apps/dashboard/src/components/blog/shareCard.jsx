import Facebook from '@/components/svg/facebook';
import Twitter from '@/components/svg/twitter';
import Linkedin from '@/components/svg/linkedin';

const ShareCard = ({ url, title, style }) => {
  const encodedURL = encodeURI(url);
  return (
    <div id="share-card" style={style}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&t=${encodeURI(title)}`}
        target="_blank"
        rel='noreferrer'
      >
        <Facebook height='50'/>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?original_referer=${encodedURL.split('vercel.app')[0] + 'vercel.app'}&ref_src=twsrc%5Etfw&text=${encodeURI('Esta entrada me gusto, puede que a ti también te interese.')}&tw_p=tweetbutton&url=${encodedURL}&via=lettercms`}
        target="_blank"
        rel='noreferrer'
      >
        <Twitter height='50' />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}`}
        target="_blank"
        rel='noreferrer'
      >
        <Linkedin height='50'/>
      </a>
      <style jsx>
        {`
      #share-card {
        transition: ease .3s;
        position: absolute;
        bottom: 80px;
        height: 50px;
        padding: 10px 25px;
        width: 250px;
        left: 50%;
        margin-left: -150px;
        background: #f3f5f7;
        border-radius: 50px;
        box-shadow: 1px 1px 3px grey;
        justify-content: space-between;
      }
      #share-card a,
      #share-card a img {
        height: 100%;
      }
    `}
      </style>
    </div>
  );
};

export default ShareCard;
