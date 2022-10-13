export async function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://lettercms.vercel.app',
      permanent: true
    }
  };
}

export default function Home() {
  return <div/>;
}
