import Link from 'next/link';
import Image from 'next/image';

const Details = () => <div id="details" className="basic-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="text-container">
            <h2>Es tiempo de mejorar la creacion de tu contenido</h2>
            <p>Nuestra meta es que crezcas y entregues tu contenido de la mejor manera posible. Con la yuda de LetterCMS no tendras que añadir plugins o integrar herramientas externas, todo lo ofrecemos en un mismo lugar</p>
            <ul className="list-unstyled li-space-lg">
              <li className="media">
                <i className="fas fa-square"></i>
                <div className="media-body">Atrae nuevos lectoresy ofreceles calidad</div>
              </li>
              <li className="media">
                <i className="fas fa-square"></i>
                <div className="media-body">Colabora y crea de manera mas eficiente</div>
              </li>
            </ul>
            <Link href='/signin'>
              <a className="btn-solid-reg page-scroll">REGISTRARSE</a>
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="image-container">
            <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/489.svg`} alt="alternative"/>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .basic-1 {
        padding-top: 7.5rem;
        padding-bottom: 8rem;
      }

      .basic-1 .text-container {
        margin-bottom: 3.75rem;
      }

      .basic-1 .list-unstyled {
        margin-bottom: 1.375rem;
      }

      .basic-1 .list-unstyled .fas {
        color: #5f4dee;
        font-size: 0.5rem;
        line-height: 1.625rem;
      }

      .basic-1 .list-unstyled .media-body {
        margin-left: 0.625rem;
      }

      @media (min-width: 992px) {
        .basic-1 {
          padding-top: 8rem;
        }

        .basic-1 .text-container {
          margin-bottom: 0;
        }
      }
      @media (min-width: 1200px) {
        .basic-1 .image-container {
          margin-right: 1rem;
          margin-left: 1.5rem;
        }
        
        .basic-1 .text-container {
          margin-top: 1rem;
          margin-right: 1.5rem;
          margin-left: 1rem;
        }

        .basic-1 h2 {
          margin-bottom: 1rem;
        }
      }
    `}</style>
  </div>;

export default Details;
