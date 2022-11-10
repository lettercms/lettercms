import {useRouter} from 'next/router';
import sdk from '@lettercms/sdk';
import Layout from '../listLayout';

function Page() {
  const router = useRouter();

  const newPage = async () => {
    try {
      const {id} = await sdk.pages.create();

      router.push(`/dashboard/pages/edit/${id}`);
    } catch(err) {
      alert('Error al crear la pagina');
      throw err;
    }
  };

  return <div style={{ width: '90%' }}>
    <Layout
      picture={`${process.env.ASSETS_BASE}/assets/pages.svg`}
      type='pages'
      fields={[
        'title',
        'pageStatus',
        'views',
        'url',
        'images',
        'subdomain'
      ]}
      tabs={[
        {name: 'published', alias: 'Publicados'},
        {name: 'draft', alias: 'Guardados'}
      ]}
      onEdit={id => router.push(`/dashboard/pages/edit/${id}`)}
      onCreate={newPage}
      buttonText='Crear'
      topImg={`${process.env.ASSETS_BASE}/illustrations/74.svg`}
      topText='Páginas'
    />
  </div>;
}

export default Page;
