import { PieChart, Pie, Cell, ResponsiveContainer, Label} from 'recharts';

export default function CircleChart({data, labels}) {
  data.available = data.available < 0 ? 0 : data.available;

  const original = data;

  if (!Array.isArray(data)) {
    data = Object.entries(data).map((e) => ({
      name: e[0],
      value: e[1],
    }));
  }

  const usedQuota = original.available === 0;

  return <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      <PieChart height={300}>
        <Pie
          data={data}
          innerRadius={80}
          outerRadius={100}
          startAngle={-270}
          endAngle={90}
          fill="#0088FE33"
          dataKey="value"
          label={false}              
        >
          <Label value={usedQuota ? 'Has agotado' : labels[0]} dy={-112}/>
          <Label value={usedQuota ? 'Tu cupo' : labels[1]} dy={-86} style={{fontSize: 32}}/>
          {usedQuota && <Label value='gratuito' dy={-60}/>}
          {!usedQuota && <Label value={labels[2]} dy={28}/>}
          <Cell fill='#0088FE' />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>;
 }