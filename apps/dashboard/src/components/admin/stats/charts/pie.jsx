import {useIntl} from 'react-intl';
import {
    Legend,
    LabelList,
    ResponsiveContainer,
    Pie,
    PieChart,
    Cell,
    Tooltip
} from 'recharts';

function RenderPieChart({data}) {
  const intl = useIntl();

  const _views = intl.formatMessage({
    id: 'views'
  });

  data = Object.entries(data).map(([key, views]) => ({
    name: key === 'Unknown' ? intl.formatMessage({id: key}) : key,
    [_views]: views
  }));

  return <div style={{ width: '100%', height: 200 }}>
    <ResponsiveContainer>
      <PieChart height={200}>
        <Legend paylodUniqBy />
        <Tooltip />
        <Pie
          data={data}
          dataKey={_views}
          label={false}
        >
          {
            data.map((entry, index) => <Cell key={`slice-${index}`} fill={`rgba(95, 77, 238, ${(index + 1) / data.length})`} />)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>;
}

export default RenderPieChart;
