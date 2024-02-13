import {useIntl} from 'react-intl';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from 'recharts';

function RenderBarChart({data, sort = false, dataKey = 'vista', layout = 'horizontal', translate = false}) {
  const intl = useIntl();

  const _views = intl.formatMessage({
    id: 'views'
  });
  
  const isHorizontal = layout === 'horizontal';

  if (!Array.isArray(data))
    data = Object.entries(data);

  data = data.map(([key, views]) => {
    const parsed = {
      [dataKey]: translate ? intl.formatMessage({id: key}) : key
    };

    parsed[_views] = views;

    return parsed;
  });

  if (sort)
    data = data.sort((a,b) => a[_views] > b[_views] ? -1 : +1);

  return <div style={{height: !isHorizontal ? data.length * 50 + 10 : 200, width: '95%'}}>
    <ResponsiveContainer>
      <BarChart data={data}
        height={layout === 'horizontal' ? 200 : 'auto'}
        layout={!layout ? 'horizontal' : layout} 
        margin={{ left: isHorizontal ? 0 : 250}}
      >
        <XAxis
          type={!isHorizontal ? 'number' : 'category'}
          dataKey={isHorizontal ? dataKey : undefined}
        />
        <YAxis
          type={isHorizontal ? 'number' : 'category'}
          dataKey={!isHorizontal ? dataKey : undefined}
        />
        <CartesianGrid stroke="#e1e4e5" strokeDasharray="5 5"/>
        <Tooltip />
        <Bar
          dataKey={_views}
          fill="#5f4dee"
          radius={[isHorizontal ? 5 : 0, 5, isHorizontal ? 0 : 5, 0]}/>
      </BarChart>
    </ResponsiveContainer>
  </div>;
}

export default RenderBarChart;
