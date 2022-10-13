export default function NoImages({images, isUploading}) {
  return <div id='no-image-container'>
    <img src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/no-images.svg' alt='' />
    <span>No hay imagenes disponibles</span>
    <style jsx>{`
      #no-image-container {
        height: 100%;
        width: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      img {
        width: 20rem;
      }
    `}</style>
  </div>;
}