import {useState} from 'react';
import Load from '../../logoLoad';
import dynamic from 'next/dynamic';
import Dashboard from './dashboard';
import {useRouter} from 'next/router';

const NewPosts = dynamic(() => import('./publish'), {
  ssr: false,
  loading: Load
});
const Feed = dynamic(() => import('./feed'), {
  ssr: false,
  loading: Load
});

export default function SocialDashboard(props) {
  const [tab, setTab] = useState(props.publish ? 'new' : 'dashboard');
  const [type, setType] = useState('');
  const [accounts, setAccounts] = useState(null);
  const router = useRouter();


  switch (tab) {
    case 'dashboard':
      return <Dashboard onAccounts={setAccounts} newPost={() => router.push('/dashboard/social/publish')} showFeed={type => {setType(type); setTab('feed');}}/>;
    case 'new':
      return <NewPosts accounts={props.accounts}/>;
    case 'feed':
      return <Feed type={type} back={() => setTab('dashboard')}/>;
    default:
      return null;
  }
}
