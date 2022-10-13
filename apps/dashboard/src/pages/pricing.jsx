import Header from '@/components/pricing/header';
import Panel from '@/components/admin/stats/base';
import Free from '@/components/pricing/free';

function Pricing() {
  return <div>
    <Header/>
    <Panel style={{height: 'auto'}} rows={1}>
      <Free/>
    </Panel>

    <style jsx global>{`
      body {
        background-color: #5f4dee !important;
      }
    `}</style>
  </div>;
}

export default Pricing;
