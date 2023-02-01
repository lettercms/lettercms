import {FormattedMessage} from 'react-intl';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Button from '@/components/button';

export default function  Header (){
  const router = useRouter();

  return <div>
    <header id="header" className="header">
      <div className="header-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-4">
              <div className="text-container">
                <h1>Letter CMS</h1>
                <p className="p-large">
                  <FormattedMessage id='Use LetterCMS to attract new users and offer them the best content based on their tastes'/>
                </p>
                <Button type='outline' alt onClick={() => router.push('/signin')}>
                  <FormattedMessage id="REGISTER"/>
                </Button>
              </div> 
            </div> 
            <div className="col-lg-6 col-xl-8">
              <div className="image-container">
                <div className="img-wrapper">
                  <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/99.svg`} alt="alternative"/>
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div>
    </header> 
    <svg className="header-frame" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 310">
      <defs>
      <style>{'.cls-1{fill:#5f4dee;}'}</style>
      </defs>
      <title>header-frame</title>
      <path className="cls-1" d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z"/>
    </svg>
    <style jsx>{`
    .header {
      background-color: #5f4dee;
    }

    .header .header-content {
      padding-top: 8rem;
      padding-bottom: 4rem;
      text-align: center;
    }

    .header .text-container {
      margin-bottom: 3rem;
    }

    .header h1 {
      margin-bottom: 1rem;
      color: #fff;
      font-size: 2.5rem;
      line-height: 3rem;
    }

    .header .p-large {
      margin-bottom: 2rem;
      color: #f3f7fd;
    }

    .header .btn-solid-lg {
      margin-right: 0.5rem;
      margin-bottom: 1.125rem;
      margin-left: 0.5rem;
      border-color: #f3f7fd;
      background-color: #f3f7fd;
      color: #5f4dee;
    }

    .header .btn-solid-lg:hover {
      background: transparent;
      color: #f3f7fd;
    }

    .header .btn-outline-lg {
      border-color: #f3f7fd;
      color: #f3f7fd;
    }

    .header .btn-outline-lg:hover {
      background-color: #f3f7fd;
      color: #5f4dee;
    }

    .header-frame {
      margin-top: -1px;
      width: 100%;
      height: 2.25rem;
    }

    @media (min-width: 768px) {
      .header .text-container {
      margin-bottom: 4rem;
      }

      .header h1 {
      font-size: 3.5rem;
      line-height: 4.125rem;
      }

      .header .btn-solid-lg {
      margin-bottom: 0;
      margin-left: 0;
      }

      .header-frame {
      height: 5.5rem;
      }
    }

    @media (min-width: 992px) {
      .header .header-content {
      text-align: left;
      }

      .header .text-container {
      margin-top: 4rem;
      margin-bottom: 0;
      }

      .header .image-container {
      position: relative;
      margin-top: 3rem;
      }
      
      .header .image-container .img-wrapper {
      position: absolute;
      display: block;
      width: 470px;
      }

      .header-frame {
      height: 8rem;
      }
    }

    @media (min-width: 1200px) {
      .header .header-content {
        padding-top: 5rem;
        padding-bottom: 8rem;
      }

      .header .text-container {
      margin-top: 5.5rem;
      margin-right: 0.5rem;
      }

      .header .image-container {
      margin-top: 1rem;
      margin-left: 1.5rem;
      }

      .header .image-container .img-wrapper {
        width: 100%;
      }

      .header-frame {
        height: 9.375rem;
      }
    }
    `}</style>
  </div>;
}
