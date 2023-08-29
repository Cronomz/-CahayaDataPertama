import "./CustomPieChart.css"
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#ec42ff"];



const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

function CustomPieChart(props) {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const mult = 2.2
    const x = cx + (radius * Math.cos(-midAngle * RADIAN)) * mult;
    const y = cy + (radius * Math.sin(-midAngle * RADIAN)) * mult;

    return (
      <text x={x} y={y} fill={COLORS[index % COLORS.length]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {x > cx ? 
          `${(percent * 100).toFixed(0)}% 
          ${props.data[index].name}` 
          :
          `${props.data[index].name}
          ${(percent * 100).toFixed(0)}% `
        }
      </text>
    );
  };
  return (
    <PieChart width={props.width??600} height={props.height??200}>
      <Pie animationDuration={300}
        data={props.data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {props.data? props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))
          :null
        }
      </Pie>
    </PieChart>
  );
}


export default CustomPieChart;
