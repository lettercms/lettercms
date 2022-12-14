import {useEffect, useState} from'react';
import FirstTime from'./firstTime';
import Dashboard from'./dashboard';
import sdk from '@lettercms/sdk';
import Load from '../../logoLoad';
import Router from 'next/router';
import {useUser} from '@/components/layout';

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
