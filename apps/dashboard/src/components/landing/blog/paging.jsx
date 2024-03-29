'use client'

import {useRouter} from 'next/navigation';
import Button from '@/components/button';
import Select from '@/components/select';

export default function Paging({page, total, translation}) {
  const router = useRouter();
  const pages = new Array(total);

  pages.fill(1);

  return <div className='flex flex-row w-full py-4 px-2'>
    <div className='flex flex-row flex-grow'>
      {
        page !== 1
        ? <Button type='outline' onClick={() => router.push(`/blog?page=${page - 1}`)}>
            {translation['Prev']}
          </Button>
        : <div/>
      }
      {
        page !== total
        ? <Button type='outline' onClick={() => router.push(`/blog?page=${page + 1}`)}>
            {translation['Next']}
          </Button>
        : <div/>
      }
    </div>
    <div>
      <Select options={pages.map((_, i) => i + 1)} value={page.toString()} onChange={({target:{value}}) => router.push(`/blog?page=${value}`)}/>
    </div>
  </div>;
}