import Link from 'next/link';
import AngleDoubleRight from '@/components/svg/angleDoubleRight';

const Breadcrumbs = ({title}) => {
  return <div className="ex-basic-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumbs">
            <Link href="/blog">
              <a>Inicio</a>
            </Link>
            <AngleDoubleRight fill='#aaa' className='.angle-double-right' width='16' style={{margin: '0 .5em'}}/>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Breadcrumbs;
