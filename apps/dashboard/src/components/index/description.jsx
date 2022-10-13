import Image from 'next/image';

const MainFeature = () => <div className="cards-1">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="above-heading">CREA</div>
          <h2 className="h2-heading">Crea el mejor contenido para tus usuarios con las herramientas pensadas en ti</h2>
      </div> 
    </div>
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-image">
            <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/5.svg`} alt="alternative"/>
          </div>
          <div className="card-body">
            <h4 className="card-title">Editores WYSIWYG</h4>
            <p>Crea tus entradas y paginas mas facil con nuestros editores que facilitan la tarea para ti. Arrastrar, suelta y crea</p>
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/109.svg`} alt="alternative"/>
          </div>
          <div className="card-body">
            <h4 className="card-title">Pruebas A/B</h4>
            <p>Prueba y ofrece la mejor version de tu contenido de una manera sencilla y sin herramientas externas</p>
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/125.svg`} alt="alternative"/>
          </div>
          <div className="card-body">
            <h4 className="card-title">Colaboradores</h4>
            <p>Manten a tu equipo unido y agiliza la creacion de tu contenido. Evita retrasos para entregar tu contenido</p>
          </div>
        </div>
      </div> 
    </div>
  </div>
  <style jsx>{`
    .cards-1 {
  padding-top: 3.25rem;
  padding-bottom: 3rem;
  text-align: center;
}

.cards-1 .h2-heading {
  margin-bottom: 3.5rem;
}

.cards-1 .card {
  max-width: 21rem;
  margin-right: auto;
  margin-bottom: 3.5rem;
  margin-left: auto;
  padding: 0;
  border: none;
}

.cards-1 .card-image {
  max-width: 16rem;
  margin-right: auto;
  margin-bottom: 2rem;
  margin-left: auto;
}

.cards-1 .card-title {
  margin-bottom: 0.5rem;
}

.cards-1 .card-body {
  padding: 0;
}
@media (min-width: 992px) {
  .cards-1 .card {
    display: inline-block;
    width: 17rem;
    max-width: 100%;
    margin-right: 1rem;
    margin-left: 1rem;
    vertical-align: top;
  }

  .cards-1 .card-image {
    width: 9rem;
  }
}
@media (min-width: 1200px) {
  .cards-1 .card {
    width: 18.875rem;
    margin-right: 2rem;
    margin-left: 2rem;
  }

  .cards-1 .card-image {
    width: 12.5rem;
  }
}
  `}</style>
</div>;

export default MainFeature;
