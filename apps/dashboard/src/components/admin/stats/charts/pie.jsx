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
  data = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));
  
  return <div style={{ width: '100%', height: 200 }}>
    <ResponsiveContainer>
      <PieChart height={200}>
        <Legend paylodUniqBy />
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          label={false}
        >
          {
            data.map((entry, index) => <Cell key={`slice-${index}`} fill={`rgba(3, 169, 244, ${(index + 1) / data.length})`} />)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>;
}

export default RenderPieChart;
