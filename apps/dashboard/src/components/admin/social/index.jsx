import {Component} from 'react';
import Load from '../../logoLoad';
import dynamic from 'next/dynamic';
import Dashboard from './dashboard';

const NewPosts = dynamic(() => import('./publish'), {
  ssr: false,
  loading: Load
});
const Feed = dynamic(() => import('./feed'), {
  ssr: false,
  loading: Load
});

export default function SocialDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [type, setType] = useState('');
  const [accounts, setAccounts] = useState(null);

  switch (tab) {
    case 'dashboard':
      return <Dashboard onAccounts={setAccounts} newPost={() => setTab('new')} showFeed={type => {setType(type); setTab('feed');}}/>;
    case 'new':
      return <NewPosts accounts={accounts}/>;
    case 'feed':
      return <Feed type={type} back={() => setTab('dashboard')}/>;
    default:
      return null;
  }
}
