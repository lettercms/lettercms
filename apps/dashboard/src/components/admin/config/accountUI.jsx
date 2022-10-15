import Input from '../../input';
import Image from 'next/image';
import Container from '../stats/base';
import Social from './socialConfig';

const AccountUI = ({
  photo,
  name,
  lastname,
  website,
  twitter,
  facebook,
  instagram,
  linkedin,
  userDescription,
  ocupation,
  onPictureClick,
  onChange
}) => <div className='flex flex-column config-opts'>
  <img alt={`${name} ${lastname} picture`} id='account-photo' src={photo || `https://avatar.tobi.sh/${name}-${lastname}?&size=250`} onClick={onPictureClick}/>
  <Container rows={1} title='Información'>
    <div>
      <div className='flex' style={{width: '100%'}}>
        <Input id='name' value={name} label='Nombre' onInput={onChange}/>
        <Input id='lastname' value={lastname} label='Apellido' onInput={onChange}/>
      </div>
      <Input id='ocupation' value={ocupation} label='Ocupación' onInput={onChange}/>
      <Input id='userDescription' value={userDescription} type='textarea' label='Acerca de mi' onInput={onChange}/>
    </div>
  </Container>
  <Container rows={1} title='Redes sociales'>
    <div>
      <Input id='website' value={website} label='Sitio Web' onInput={onChange}/>
      <Input id='facebook' value={facebook} label='Facebook' onInput={onChange}/>
      <Input id='instagram' value={instagram} label='Instagram' onInput={onChange}/>
      <Input id='twitter' value={twitter} label='Twitter' onInput={onChange}/>
      <Input id='linkedin' value={linkedin} label='Linkedin' onInput={onChange}/>
    </div>
  </Container>
  <Container rows={1} title='Enlaces'>
    <Social/>
  </Container>

  <style jsx>{`
    :global(.chart-container > div) {
      width: 70%
    }
    :global(.flex-column .form-group) {
      width: 100%;
    }
    .social-group label {
      width: 100%;
      position: relative;
    }
    .social-group label:before {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      background-size: cover;
      top: 16px;
      left: 5px;
    }
    label[for="website"]:before {
      background-image: url('/assets/website.svg');
    }
    label[for="facebook"]:before {
      background-image: url('/assets/facebook.svg');
    }
    label[for="instagram"]:before {
      background-image: url('/assets/instagram.svg');
    }
    label[for="twitter"]:before {
      background-image: url('/assets/twitter.svg');
    }
    label[for="linkedin"]:before {
      background-image: url('/assets/linkedin.svg');
    }
    input[type=text], textarea {
      width: 100%;
    }
    input[name="website"],
    input[name="facebook"],
    input[name="instagram"],
    input[name="twitter"],
    input[name="linkedin"] {
      padding: 10px 20px 10px 50px;
    }
    #account-photo {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      cursor: pointer;
      margin: 25px 0;
      border: #ddd solid 1px;
    }
  `}</style>
</div>;

export default AccountUI;
