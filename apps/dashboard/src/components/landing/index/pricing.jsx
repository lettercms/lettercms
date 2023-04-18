import Link from 'next/link';

const Pricing = () => <div id="pricing" className="cards-2">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="above-heading">PRECIOS</div>
          <h2 className="h2-heading">Tabla de Precios</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="card-title">PRE COMPRA</div>
              <div className="price"><span className="currency">$</span><span className="value">10</span></div>
              <div className="frequency">Pago unico.<br/>Gratis para siempre</div>
              <div className="divider"></div>
              <ul className="list-unstyled li-space-lg">
                <li className="media">
                  <i className="fas fa-check"></i><div className="media-body">Editor de blog</div>
                </li>
                <li className="media">
                  <i className="fas fa-check"></i><div className="media-body">Gestion de redes</div>
                </li>
                <li className="media">
                  <i className="fas fa-check"></i><div className="media-body">Colaboradores</div>
                </li>
                <li className="media">
                  <i className="fas fa-check"></i><div className="media-body">Analiticas</div>
                </li>
              </ul>
              <div className="button-wrapper">
                <Link href='/signin'>
                  REGISTRARSE
                </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <style jsx>{`
    .cards-2 {
    padding-top: 7.875rem;
    padding-bottom: 2.25rem;
    text-align: center;
    }

    .cards-2 .h2-heading {
    margin-bottom: 3.75rem;
    }

    .cards-2 .card {
    display: block;
    max-width: 19rem;
    margin-right: auto;
    margin-bottom: 3rem;
    margin-left: auto;
    border: 1px solid #ccd3df;
    border-radius: 0.375rem;
    }

    .cards-2 .card .card-body {
    padding: 2.5rem 2rem 2.75rem 2em;
    }

    .cards-2 .card .card-title {
    margin-bottom: 0.5rem;
    color: #5f4dee;
    font: 700 1.125rem/1.5rem "Open Sans", sans-serif;
    }

    .cards-2 .card .price .currency {
    margin-right: 0.25rem;
    color: #434c54;
    font-weight: 700;
    font-size: 1.5rem;
    vertical-align: 40%;
    }

    .cards-2 .card .price .value {
    color: #434c54;
    font: 700 3.25rem/3.5rem "Open Sans", sans-serif;
    text-align: center;
    }

    .cards-2 .card .frequency {
    font-size: 0.875rem;
    }

    .cards-2 .card .divider {
    height: 1px;
    margin-top: 1.75rem;
    margin-bottom: 2rem;
    border: none;
    background-color: #ccd3df;
    }

    .cards-2 .card .list-unstyled {
    margin-top: 1.875rem;
    margin-bottom: 1.625rem;
    text-align: left;
    }

    .cards-2 .card .list-unstyled .media {
    margin-bottom: 0.5rem;
    }

    .cards-2 .card .list-unstyled .fas {
    color: #5f4dee;
    font-size: 0.875rem;
    line-height: 1.625rem;
    }

    .cards-2 .card .list-unstyled .fas.fa-times {
    margin-left: 0.1875rem;
    margin-right: 0.125rem;
    color: #555;
    }

    .cards-2 .card .list-unstyled .media-body {
    margin-left: 0.625rem;
    }

    @media (min-width: 992px) {
    .cards-2 .card {
      display: inline-block;
      margin-right: 0.5rem;
      margin-left: 0.5rem;
      vertical-align: top;
    }
    }
    @media (min-width: 1200px) {

    .cards-2 .card {
      width: 19.375rem;
      max-width: 100%;
      margin-right: 1.75rem;
      margin-left: 1.75rem;
    }

    .cards-2 .card .card-body {
      padding-right: 2.25rem;
      padding-left: 2.25rem;
    }
    }
  `}</style>
  </div>;

export default Pricing;
