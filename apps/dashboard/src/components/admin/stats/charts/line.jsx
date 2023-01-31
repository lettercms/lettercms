import {useIntl} from 'react-intl';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function RenderLineChart({data}) {
  const intl = useIntl();
  
  const _views = intl.formatMessage({
    id: 'views'
  });

  if (!Array.isArray(data)) {
    data = Object.entries(data).map(([name, views]) => ({
      name,
      [_views]: views
    }));
  }

  return <div style={{height: 200, width: '95%'}}>
    <ResponsiveContainer>
    <LineChart width={700} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey={_views} stroke="#5f4dee" />
      <CartesianGrid stroke="#e1e4e5" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
    </ResponsiveContainer>
  </div>;
}

export default RenderLineChart;
