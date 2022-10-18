import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from 'recharts';

function RenderBarChart({data, dataKey = 'vista', layout = 'horizontal'}) {
  const isHorizontal = layout === 'horizontal';

  data = Object.entries(data).map(([key, vistas]) => ({
    vistas,
    [dataKey]: key
  }));



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
          dataKey="vistas"
          fill="#03a9f4"
          radius={[isHorizontal ? 5 : 0, 5, isHorizontal ? 0 : 5, 0]}/>
      </BarChart>
    </ResponsiveContainer>
  </div>;
}

export default RenderBarChart;
