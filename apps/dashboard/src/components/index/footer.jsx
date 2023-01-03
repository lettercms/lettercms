import {FormattedMessage} from 'react-intl';
import Link from 'next/link';

const links = [
  {
    pre: <FormattedMessage id='Created by '/>,
    link: 'David\'s Devel' ,
    href: 'https://facebook.com/davidsdevel'
  },
  {
    pre: <FormattedMessage id='Collaborate with us in '/>,
    link: 'GitHub' ,
    href: 'https://github.com/lettercms'
  },
  {
    pre: <FormattedMessage id='Support us in '/>,
    link: 'Open Collective' ,
    href: 'https://opencollective.com/lettercms'
  }
];

const Footer = ({isPost}) => {
  return <>
    <svg className="footer-frame" style={{background: isPost ? 'white' : null}} data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 79"><defs><style>{'.cls-2{fill:#5f4def;}'}</style></defs><path className="cls-2" d="M0,72.427C143,12.138,255.5,4.577,328.644,7.943c147.721,6.8,183.881,60.242,320.83,53.737,143-6.793,167.826-68.128,293-60.9,109.095,6.3,115.68,54.364,225.251,57.319,113.58,3.064,138.8-47.711,251.189-41.8,104.012,5.474,109.713,50.4,197.369,46.572,89.549-3.91,124.375-52.563,227.622-50.155A338.646,338.646,0,0,1,1920,23.467V79.75H0V72.427Z" transform="translate(0 -0.188)"/></svg>
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-col first">
              <h4>
                <FormattedMessage id='About LetterCMS'/>
              </h4>
              <p className="p-small">
                <FormattedMessage id={`LetterCMS is a system created by David's Devel. With the purpose of helping both new and experienced content creators`}/>
              </p>
            </div>
          </div> 
          <div className="col-md-4">
            <div className="footer-col middle">
              <h4>
                <FormattedMessage id='Relevant links'/>
              </h4>
              <ul className="list-unstyled li-space-lg p-small">
              {
                links.map(({pre, link, href}) => {
                  return  <li key={link} className="media">
                    <i className="fas fa-square"></i>
                    <div className="media-body">{pre} <Link href={href}><a target='_blank' className="white">{link}</a></Link></div>
                  </li>;
                })
              }
              </ul>
            </div>
          </div> 
          <div className="col-md-4">
            <div className="footer-col last">
              <h4>
                <FormattedMessage id='Contact'/>
              </h4>
              <ul className="list-unstyled li-space-lg p-small">
                <li className="media">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="media-body">22 Innovative, San Francisco, CA 94043, US</div>
                </li>
                <li className="media">
                  <i className="fas fa-envelope"></i>
                  <div className="media-body"><a className="white" href="mailto:contact@tivo.com">contact@tivo.com</a> <i className="fas fa-globe"></i><a className="white" href="#your-link">www.tivo.com</a></div>
                </li>
              </ul>
            </div> 
          </div> 
        </div> 
      </div> 
    </div>
    <div className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p className="p-small"><FormattedMessage id='Developed by '/> <Link href="https://www.facebook.com/davidsdevel"><a>David&apos;s Devel</a></Link></p>
          </div> 
        </div> 
      </div> 
    </div> 
    <style jsx>{`
      .footer-frame {
        width: 100%;
        height: 1.5rem;
      }

      .footer {
        padding-top: 3rem;
        padding-bottom: 0.5rem;
        background-color: #5f4dee;
      }

      .footer .footer-col {
        margin-bottom: 2.25rem;
      }

      .footer h4 {
      margin-bottom: 0.625rem;
      color: #fff;
      }

      .footer .list-unstyled,
      .footer p {
      color: #f3f7fd;
      }

      .footer .footer-col.middle .list-unstyled .fas {
      color: #fff;
      font-size: 0.5rem;
      line-height: 1.5rem;
      }

      .footer .footer-col.middle .list-unstyled .media-body {
      margin-left: 0.5rem;
      }

      .footer .footer-col.last .list-unstyled .fas {
      color: #fff;
      font-size: 0.875rem;
      line-height: 1.5rem;
      }

      .footer .footer-col.last .list-unstyled .media-body {
      margin-left: 0.625rem;
      }

      .footer .footer-col.last .list-unstyled .fas.fa-globe {
      margin-left: 1rem;
      margin-right: 0.625rem;
      }

      .copyright {
      padding-top: 1rem;
      padding-bottom: 0.375rem;
      background-color: #5f4dee;
      text-align: center;
      }

      .copyright .p-small {
      padding-top: 1.375rem;
      border-top: 1px solid #718ad1;
      color: #f3f7fd;
      }

      .copyright a {
      color: #f3f7fd;
      text-decoration: none;
      }

      @media (min-width: 768px) {
      .footer-frame {
        height: 5rem;
      }
      }

      @media (min-width: 1200px) {
      .footer .footer-col.first {
        margin-right: 1.5rem;
      }

      .footer .footer-col.middle {
        margin-right: 0.75rem;
        margin-left: 0.75rem;
      }

      .footer .footer-col.last {
        margin-left: 1.5rem;
      }
      }
    `}</style>
  </>;
};

export default Footer;
