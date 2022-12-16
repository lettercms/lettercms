import Link from 'next/link';
import {useRouter} from 'next/router';
import Button from '@/components/button';

export default function Paging({page, total}) {
  const router = useRouter();
  const pages = new Array(total);

  pages.fill(1);

  return <div className='flex flex-row' id='paging-container'>
  <div className='flex flex-row'>
    {
      page !== 1
      ? <Button type='outline' onClick={() => router.push(`/blog?page=${page - 1}`)}>Anterior</Button>
      : <div/>
    }
    {
      page !== total
      ? <Button type='outline' onClick={() => router.push(`/blog?page=${page + 1}`)}>Siguiente</Button>
      : <div/>
    }
  </div>
  <div>
    <select value={page.toString()} onChange={({target:{value}}) => router.push(`/blog?page=${value}`)}>
      {
        pages.map((_, i) => <option key={'opts-' + i} value={i+1}>{i + 1}</option>)
      }
    </select>
  </div>
  <style jsx>{`
    #paging-container {
      margin: 2rem 0 4rem;
    }
    #paging-container .flex {
      padding: 0 2rem;
      flex-grow: 1;
    }
    :global(#paging-container .flex button) {
      width: 8rem;
    }
    select {
      width: 3.5rem;
    }
  `}</style>
  </div>;
}