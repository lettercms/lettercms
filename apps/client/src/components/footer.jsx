export default function Footer() {

  return <footer className='text-center bg-slate-100 px-1/6 py-5'>
    <span>{`Built with LetterCMS © ${new Date().getFullYear()}`}</span>
  </footer>;
};
