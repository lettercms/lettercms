import {useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Button from '@/components/button';

const features = [
  {
    title: 'Integra tus redes',
    description: 'Promociona tus entradas sin demora a travez de los distintos canales. Tu te concentras en crear y nosotros promocionamos por ti',
    img: `${process.env.ASSETS_BASE}/illustrations/5.svg`,
    feats: [
      'Promociona en tus redes sociales',
      'Envia emails a tus suscriptores',
      'Envia notificaciones a los dispositivos de tus lectores'

    ]
  },
  {
    title: 'Muestra el contenido correcto',
    img: `${process.env.ASSETS_BASE}/illustrations/109.svg`,
    description: 'Nuestros sistema de recomendacion te ayudara a ofrecerle el contenido correcto para cada persona',
    feats: [
      'Filtros de similares',
      'Recomendaciones basada en gustos',
      'Contenido 100% dinamico'
    ]
  },
  {

    title: 'Pensado para tus lectores',
    img: `${process.env.ASSETS_BASE}/illustrations/125.svg`,
    description: 'Nuestra plataforma esta optimizada para ofrecer la mejor experiencia de carga. Reducimos la espera para aumentar tus visitas',
    feats: [
      'Reduccion del peso de las imagenes',
      'Carga asincrona',
      'Creación de paginas en demanda'
    ]
  }
]

const changeTab = (e, tab, cb) => {
  e.preventDefault();

  cb(tab);

}

export default function Features() {
  const [tab, setTab] = useState(0);
  const router = useRouter();

  return <div id="features" className="tabs">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="above-heading">FEATURES</div>
            <h2 className="h2-heading">Pensando en ti y en tus lectores</h2>
            <p className="p-heading">Toma tu tiempo, dedicate a escribir, que nosotros nos encargamos de entregar tu contenido en tus redes con un solo click. Una vez dentro ofrecemos el contenido correcto para la persona correcta</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ul className="nav nav-tabs" id="argoTabs" role="tablist">
              <li className="nav-item">
                <a className={`nav-link${tab === 0 ? ' active' : ''}`} onClick={e => changeTab(e, 0, setTab)} id="nav-tab-1" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected={tab === 0 ? 'true' : 'false'}><i className="fas fa-list"></i>Promociona</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link${tab === 1 ? ' active' : ''}`} onClick={e => changeTab(e, 1, setTab)} id="nav-tab-2" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected={tab === 1 ? 'true' : 'false'}><i className="fas fa-envelope-open-text"></i>Deleita</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link${tab === 2 ? ' active' : ''}`} onClick={e => changeTab(e, 2, setTab)} id="nav-tab-3" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected={tab === 2 ? 'true' : 'false'}><i className="fas fa-chart-bar"></i>Fideliza</a>
              </li>
            </ul>
            <div className="tab-content" id="argoTabsContent">
              {
                features.map((e, i) => {
                  return <div key={e.title} className={`tab-pane fade ${tab === i ? ' show active' : ''}`} id={`tab-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="image-container">
                        <img className="img-fluid" src={e.img} alt="alternative"/>
                      </div> 
                    </div>
                      <div className="col-lg-6">
                        <div className="text-container">
                          <h3>{e.title}</h3>
                          <p>{e.description}</p>
                          <ul className="list-unstyled li-space-lg">
                            {
                              e.feats.map(f => <li className="media">
                                <i className="fas fa-square"></i>
                                <div className="media-body">{f}</div>
                              </li>)
                            }
                          </ul>
                          <Button type='solid' onClick={() => router.push('/signin')}>REGISTRATE</Button>
                        </div> 
                      </div> 
                    </div> 
                  </div>
                })
              }
            </div>
          </div> 
        </div> 
      </div>
      <style jsx>{`
        .tabs {
          padding-top: 8rem;
          padding-bottom: 8.125rem;
          background-color: #f3f7fd;
        }

        .tabs .h2-heading,
        .tabs .p-heading {
          text-align: center;
        }

        .tabs .nav-tabs {
          display: block;
          margin-bottom: 2.25rem;
          border-bottom: none;
        }

        .tabs .nav-link {
          padding: 0.375rem 1rem 0.375rem 1rem;
          border: none;
          color: #86929b;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.75rem;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .tabs .nav-link:hover,
        .tabs .nav-link.active {
          background: transparent;
          color: #5f4dee;
        }

        .tabs .nav-link .fas {
          margin-right: 0.625rem;
        }

        .tabs .image-container {
          margin-bottom: 2.75rem;
        }

        .tabs .list-unstyled .fas {
          color: #5f4dee;
          font-size: 0.5rem;
          line-height: 1.625rem;
        }

        .tabs .list-unstyled .media-body {
          margin-left: 0.625rem;
        }

        .tabs #tab-1 h3 {
          margin-bottom: 0.75rem;
        }

        .tabs #tab-1 .list-unstyled {
          margin-bottom: 1.5rem;
        }

        .tabs #tab-2 h3 {
          margin-bottom: 0.75rem;
        }

        .tabs #tab-2 .list-unstyled {
          margin-bottom: 1.5rem;
        }

        .tabs #tab-3 h3 {
          margin-bottom: 0.75rem;
        }

        .tabs #tab-3 .list-unstyled {
          margin-bottom: 1.5rem;
        }

        .lightbox-basic {
          margin: 0 auto;
          padding: 0;
          border-radius: 0.25rem;
          background: none;
          text-align: left;
        }

        .lightbox-basic .container {
          padding-right: 0;
          padding-left: 0;
        }

        .lightbox-basic .image-container {
          max-width: 33.75rem;
          margin-right: auto;
          margin-bottom: 3rem;
          margin-left: auto;
        }

        .lightbox-basic h3 {
          margin-bottom: 0.5rem;
        }

        .lightbox-basic hr {
          width: 2.5rem;
          height: 0.125rem;
          margin-top: 0;
          margin-bottom: 0.875rem;
          margin-left: 0;
          border: 0;
          background-color: #5f4dee;
          text-align: left;
        }

        .lightbox-basic h4 {
          margin-bottom: 1rem;
        }

        .lightbox-basic .list-unstyled .fas {
          color:#5f4dee;
          font-size: 0.5rem;
          line-height: 1.625rem;
        }

        .lightbox-basic .list-unstyled .media-body {
          margin-left: 0.625rem;
        }

        .lightbox-basic .btn-outline-reg,
        .lightbox-basic .btn-solid-reg {
          margin-top: 0.75rem;
        }

        .lightbox-basic .btn-solid-reg.mfp-close {
          position: relative;
          width: auto;
          height: auto;
          color: #fff;
          opacity: 1;
        }

        .lightbox-basic .btn-solid-reg.mfp-close:hover {
          color: #5f4dee;
        }

        .lightbox-basic a.mfp-close.as-button {
          position: relative;
          width: auto;
          height: auto;
          margin-left: 0.375rem;
          color: #5f4dee;
          opacity: 1;
        }

        .lightbox-basic a.mfp-close.as-button:hover {
          color: #fff;
        }

        .lightbox-basic button.mfp-close.x-button {
          position: absolute;
          top: -0.125rem;
          right: -0.125rem;
          width: 2.75rem;
          height: 2.75rem;
          color: #707984;
        }

        @media (min-width: 992px) {
          .tabs .nav-tabs {
            display: flex;
            justify-content: center;
            margin-bottom: 2.75rem;
          } 

          .tabs .nav-link {
            padding-right: 1.25rem;
            padding-left: 1.25rem;
            border-bottom: 2px solid rgb(202, 202, 202);
          }
          
          .tabs .nav-link:hover,
          .tabs .nav-link.active {
            border-bottom: 2px solid #5f4dee;
          }

          .tabs .image-container {
            margin-bottom: 0;
          }


          .lightbox-basic {
            max-width: 62.5rem;
            padding: 0;
          }

          .lightbox-basic .image-container {
            max-width: 100%;
            margin-right: 2rem;
            margin-bottom: 0;
            margin-left: 0.5rem;
          }

          .lightbox-basic h3 {
            margin-top: 0.5rem;
          }
        }

        @media (min-width: 1200px) {
          
          .tabs .image-container {
            margin-right: 1.5rem;
            margin-left: 1rem;
          }
          
          .tabs .text-container {
            margin-top: 1.5rem;
            margin-right: 1rem;
            margin-left: 1.5rem;
          }
        }
      `}</style>
    </div>;
  }
