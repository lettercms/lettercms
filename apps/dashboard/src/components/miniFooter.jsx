import Image from 'next/image';

export default function MiniFooter() {
  const date = new Date();

  return <footer>
    <hr/>
    <div id='footer-container'>
      <span>LetterCMS {date.getFullYear()} | </span>
      <div style={{height: '1rem', position: 'relative', width: '2rem'}}>
        <Image layout='fill' objectFit='contain' src={`${process.env.ASSETS_BASE}/images/lettercms-logo-standalone.png`} alt="David's Devel Rombo Logo"/>
      </div>
    </div>
    <style jsx>{`
      footer {
        width: 100%;
      }
      hr {
        width: 90%;
        max-width: 500px;
      }
      #footer-container {
        margin: auto;
        width: max-content;
        display: flex;
        align-items: center;
      }
    `}</style> 
  </footer>;
}
