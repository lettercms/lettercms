import Link from 'next/link';

export default function Pagination({prev, next, page}){
  return <div style={{ height: 56 }}>
    {
      prev &&
      <Link href={`/?page=${page - 1}`}>
        <a className="prev">Anterior</a>
      </Link>
    }
    {
      next &&
      <Link href={`/?page=${page + 1}`}>
        <a className="next">Siguiente</a>
      </Link>
    }
    <style jsx>
      {`
    a {
      color: #03A9F4;
    }
    .next {
      position: absolute;
      right: 0;
    }
    .prev {
      position: absolute;
      left: 0;
    }
    `}
    </style>
  </div>;
}
