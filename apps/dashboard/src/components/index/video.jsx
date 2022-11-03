import Base from '../admin/stats/base';
import Link from 'next/link';
import Button from '@/components/button';
import {useRouter} from 'next/router';

export default function CTA() {
  const router = useRouter();

  return <div id="video" className="basic-2">
    <Base rows={1} style={{height: 'auto'}}>
      <div className="row">
        <div className="col-lg-12">
          <div className="image-container">
            <div className="image-wrapper">
              <img className="img-fluid" src={`${process.env.ASSETS_BASE}/illustrations/324.svg`} alt="alternative"/>
            </div> 
          </div>
          <p className="p-heading">Empieza desde cero y crece junto a nosotros.</p>
          <Button type='outline' onClick={() => router.push('/signin')}>REGISTRARSE</Button>
        </div> 
      </div> 
    </Base> 
    <style jsx>{`
      .basic-2 {
      padding-top: 8rem;
      padding-bottom: 6.75rem;
      background-color: white;
      text-align: center;
      }

      .basic-2 .image-container {
      margin-bottom: 2rem;
      }

      .basic-2 .image-container img {
      border-radius: 0.75rem;
      }

      .basic-2 .video-wrapper {
      position: relative;
      }

      /* Video Play Button */
      .basic-2 .video-play-button {
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      display: block;
      box-sizing: content-box;
      width: 2rem;
      height: 2.75rem;
      padding: 1.125rem 1.25rem 1.125rem 1.75rem;
      border-radius: 50%;
      -webkit-transform: translateX(-50%) translateY(-50%);
      -ms-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
      }
      
      .basic-2 .video-play-button:before {
      content: "";
      position: absolute;
      z-index: 0;
      top: 50%;
      left: 50%;
      display: block;
      width: 4.75rem;
      height: 4.75rem;
      border-radius: 50%;
      background: #5f4dee;
      animation: pulse-border 1500ms ease-out infinite;
      -webkit-transform: translateX(-50%) translateY(-50%);
      -ms-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
      }
      
      .basic-2 .video-play-button:after {
      content: "";
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      display: block;
      width: 4.375rem;
      height: 4.375rem;
      border-radius: 50%;
      background: #5f4dee;
      transition: all 200ms;
      -webkit-transform: translateX(-50%) translateY(-50%);
      -ms-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
      }
      
      .basic-2 .video-play-button span {
      position: relative;
      display: block;
      z-index: 3;
      top: 0.375rem;
      left: 0.25rem;
      width: 0;
      height: 0;
      border-left: 1.625rem solid #fff;
      border-top: 1rem solid transparent;
      border-bottom: 1rem solid transparent;
      }
      
      @keyframes pulse-border {
      0% {
        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
        opacity: 0;
      }
      }

      .basic-2 .p-heading {
      margin-bottom: 1rem;
      }

      @media (min-width: 992px) {
      .basic-2 .image-container {
        max-width: 53.125rem;
        margin-right: auto;
        margin-left: auto;
      }

      .basic-2 p {
        width: 65%;
        margin-right: auto;
        margin-left: auto;
      }
      }
    `}</style>
  </div>;
}
