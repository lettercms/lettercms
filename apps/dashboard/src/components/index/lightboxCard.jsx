import Link from 'next/link';
import Image from 'next/image';

const LightboxCard = ({title, description, features, close}) => <div id={`details-lightbox-${title}`} className="lightbox-basic zoom-anim-dialog mfp-hide">
  <div className="container">
    <div className="row">
      <div className="col-lg-8">
        <div className="image-container">
          <img className="img-fluid" src="https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/images/details-lightbox.png" alt="alternative"/>
        </div> 
      </div> 
      <div className="col-lg-4">
        <h3>{title}</h3>
        <hr/>
        <h5>Detalles</h5>
        <p>{description}</p>
        <ul className="list-unstyled li-space-lg">
          {
          features.map(e => <li key={`feature-${e}`} className="media">
            <i className="fas fa-square"></i>
            <div className="media-body">{e}</div>
          </li>)
          }
        </ul>
        <Link href='/signin'>
          <a className="btn-solid-reg mfp-close">REGISTRARSE</a>
        </Link>
        <a className="btn-outline-reg mfp-close as-button" onClick={close}>ATRAS</a>
      </div> 
    </div> 
  </div>
  <style jsx>{`
    .lightbox-basic {
      height: 100%;
      width: 100%;
    }
  `}</style>
</div>;

export default LightboxCard;
