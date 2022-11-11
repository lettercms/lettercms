import {metaInputs} from './metaInputs.module.css';

export default function MetaInputs({hasFacebook, hasInstagram}) {
  return <div className={metaInputs}>
    <input type='checkbox'/>
    {
      hasInstagram &&
      <input type='checkbox'/>
    }
    {
      hasFacebook &&
      <input type='checkbox'/>
    }

  </div>;
}
