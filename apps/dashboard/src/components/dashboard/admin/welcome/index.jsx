'use client'

import FirstTime from'./firstTime';
import Dashboard from'./dashboard';
import Load from '../../logoLoad';
import {useUser} from '@/components/dashboard/layout';

const Welcome = () => {
  const {status, user} = useUser();

  let ui;

  if (status === 'loading')
    ui = <Load/>;
  else {
    if (user.firstTime)
      ui = <FirstTime name={user.name} id={user._id}/>;
    else
      ui = <Dashboard/>;
  }
    
  return <div id='welcome-main'>
    {ui}
    <style jsx>{`
      #welcome-main {
        width: 100%;
      }
    `}</style>
  </div>;
};

export default Welcome;
