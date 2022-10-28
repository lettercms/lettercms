import {useState, useEffect} from 'react';
//import asyncImport from '@/lib/asyncImportScript';
import sdk from '@lettercms/sdk';
import AccountLoad from './load';
import dynamic from 'next/dynamic';
import {useUser} from '@/lib/dashboardContext';

const UI = dynamic(() => import('./ui'), {
  loading: () => <AccountLoad/>,
  ssr: false
});

const Cropper = dynamic(() => import('./cropper'), {
  ssr: false
}); 

let changes = {};

export default function AccountConfig({button}) {
  const [data, setData] = useState({});
  const [loading, setLoad] = useState(true);
  const [file, setFile] = useState(null);
  const {user, status} = useUser();

  useEffect(() => {
    if (status === 'done') {

      sdk.accounts.me([
        'photo',
        'name',
        'lastname',
        'website',
        'twitter',
        'facebook',
        'instagram',
        'linkedin',
        'description',
        'ocupation',
        'role'
      ])
        .then(d => {
          setData(d);
          setLoad(false);
        });

      button.current.onclick = () => {
        sdk.accounts.update(user._id, changes).then(() => {
          alert('Datos Modificados con exito');
          changes = {};
        });
      };
    }
  }, [status, button, user._id]);

  const handleInput = ({target: {name, value}}) => {

    setData(prev => ({
      ...prev,
      [name]: value
    }));

    changes[name] = value;
  };

  if (loading)
    return <AccountLoad/>;

  return <div>
    <UI {...data} onChange={handleInput} onChangePicture={setFile}/>
    <Cropper file={file} onChange={photo => setData(prev => ({
      ...prev,
      photo
    }))}/>
    <style jsx global>{`
      .cropper-view-box,
      .cropper-face {
        border-radius: 50%;
      }
    `}</style>
  </div>;
}
