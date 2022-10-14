export default function About({photo, name, lastname, description, facebook, twitter, instagram, linkedin}) {
  return <div id="about-container">
      <h4>Un poco acerca de mi</h4>
      <img src={photo} alt={`${name} ${lastname}`} />
      <p>{description}</p>
      <div id="social-container">
        {
          !!facebook &&  
          <a
            href={facebook}
            target="_blank"
            onClick={() => FB.AppEvents.logEvent('View Profile on Facebook')} rel="noreferrer"
          >
            <img src="/assets/facebook.svg" />
          </a>
        }
        {
          !!twitter &&
          <a
            href={twitter}
            target="_blank"
            onClick={() => FB.AppEvents.logEvent('View Profile on Twitter')} rel="noreferrer"
          >
            <img src="/assets/twitter.svg" />
          </a>
        }
        {
          !!linkedin &&
          <a
            href={linkedin}
            target="_blank"
            onClick={() => FB.AppEvents.logEvent('View Profile on LinkedIn')} rel="noreferrer"
          >
            <img src="/assets/linkedin.svg" />
          </a>
        }
        {
          !!instagram &&
          <a
            href={instagram}
            target="_blank"
            onClick={() => FB.AppEvents.logEvent('View Profile on Instagram')} rel="noreferrer"
          >
            <img src="/assets/instagram.svg" />
          </a>
        }
      </div>
      <style jsx>
        {`
			div#about-container {
				background: #f3f5f7;
				width: 90%;
				margin: 2rem auto;
				padding: 25px 5%;
				overflow: hidden;
				border-left: solid 4px #03A9F4;
			}
			div#about-container > h4 {
				margin: 0;
				font-size: 20px;
			}
			div#about-container > img {
				width: 40%;
				display: block;
				border-radius: 50%;
				margin: 40px auto 10px;
			}
			div#about-container > #social-container {
				margin: auto;
			}
			div#about-container > #social-container a img {
				width: 10%;
				margin: 20px 7.5% 0;
			}
			@media screen and (min-width: 480px) {
				div#about-container > h4 {
					font-size: 24px;
				}
				div#about-container > img {
					width: 30%;
					margin: 40px auto 20px;
				}
				div#about-container > #social-container {
					width: 60%;
				}
			}
			@media screen and (min-width: 720px) {
				div#about-container {
					width: 50%;
				}
				div#about-container > h4 {
					margin-bottom: 20px;
					font-size: 18px;
				}
				div#about-container > img {
					display: inline-block;
					margin: 10px 0;
					width: 30%;
				}
				div#about-container > p {
					width: 60%;
					display: inline-block;
					vertical-align: top;
					margin: 10% 0 0 5%;
				}
			}
		`}
      </style>
    </div>
};
