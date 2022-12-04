import React from 'react';
import store from '../../store';
import { showModal } from '../../store/actions';

const Share = ({ subdomain, url, title, isSubscribe }) => {
  const encodedURL = encodeURI(`https://${subdomain}.lettercms.vercel.app${url}`);

  return (
    <div id="share-container">
      <span className="bold"><b>¿Te gustó?</b></span>
      <br />
      <span>¡Compartelo con tus amigos!</span>
      <div id="share">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&t=${encodeURI(title)}`}
          target="_blank" rel="noreferrer"
        >
          <img src="/assets/facebook.svg" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?original_referer=https%3A%2F%2F${subdomain}.lettercms.vercel.app&ref_src=twsrc%5Etfw&text=${encodeURI(`Esta entrada me gusto, puede que a ti también te interese.${title}`)}&tw_p=tweetbutton&url=${encodedURL}&via=davidsdevel`}
          target="_blank" rel="noreferrer"
        >
          <img src="/assets/twitter.svg" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}`}
          target="_blank" rel="noreferrer"
        >
          <img src="/assets/linkedin.svg" />
        </a>
      </div>
      {/*
			!isSubscribe
			&& (
<div>
  <span style={{ margin: '50px 0 25px', display: 'block' }}>
    <b>Ó</b>
    <br />
    !Sucribete! Y obtén actualizaciones de mi blog
  </span>
  <button className="black" onClick={() => store.dispatch(showModal())}>Suscríbete</button>
</div>
			)
		*/}
      <style jsx>
        {`
			b {
				font-size: 18px;
				fontWeight: bold;
				margin: 5px 0;
				display: block;
			}
			#share-container {
				text-align: center;
				width: 90%;
				margin: auto;
				background: #f3f5f7;
				padding: 20px 0;
				border-left: solid 4px #03A9F4;
			}
			button.black {
				width: calc(20% + 105px);
			}
			a img {
				width: 35px;
				margin: 30px 5% 0;
			}

			@media screen and (min-width: 480px) {
				#share-container {
					width: 80%;
				}
			}
			@media screen and (min-width: 720px) {
				#share-container {
					width: 50%;
				}
			}
		`}
      </style>
    </div>
  );
};

export default Share;
