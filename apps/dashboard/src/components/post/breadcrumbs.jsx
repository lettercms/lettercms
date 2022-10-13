import Link from 'next/link';

const Breadcrumbs = ({title}) => {
  return <div className="ex-basic-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumbs">
            <Link href="/blog">
              <a>Inicio</a>
            </Link>
            <img src='/assets/angle-double-right.svg' className="fa angle-double-right"/>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .angle-double-right {
        width: 1rem;
      }
    `}</style>
  </div>;
};

export default Breadcrumbs;
