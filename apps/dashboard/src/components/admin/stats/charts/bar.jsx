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

  data = Object.entries(data).map(([key, views]) => {
    const parsed = {
      [dataKey]: translate ? intl.formatMessage({id: key}) : key
    };

    parsed[_views] = views;

    return parsed;
  });

  if (sort)
    data = data.sort((a,b) => a.vistas > b.vistas ? -1 : +1);

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
        <CartesianGrid />
        <Tooltip />
        <Bar
          dataKey={_views}
          fill="#03a9f4"
          radius={[isHorizontal ? 5 : 0, 5, isHorizontal ? 0 : 5, 0]}/>
      </BarChart>
    </ResponsiveContainer>
  </div>;
}

export default RenderBarChart;
