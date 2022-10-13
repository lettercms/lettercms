import React from 'react';
import { string } from 'prop-types';

//TODO: add blog url to social Share

export default function ShareCard({ url, title, style }) {
  const encodedURL = encodeURI(url);

  return (
    <div id="share-card" style={style}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&t=${encodeURI(title)}`}
        target="_blank"
        rel="noreferrer"
      >
        <img src="/assets/facebook.svg" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fblog.davidsdevel.com&ref_src=twsrc%5Etfw&text=${encodeURI(`Esta entrada me gusto, puede que a ti también te interese.${title}`)}&tw_p=tweetbutton&url=${encodedURL}&via=davidsdevel`}
        target="_blank"
        rel="noreferrer"
      >
        <img src="/assets/twitter.svg" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}`}
        target="_blank"
        rel="noreferrer"
      >
        <img src="/assets/linkedin.svg" />
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

ShareCard.propTypes = {
  url: string,
  title: string,
};
