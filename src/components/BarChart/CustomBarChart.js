import "./CustomBarChart.css"
import React from "react";
import {CartesianGrid, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#ec42ff"];

function CustomBarChart(props) {
  

  return (
    <BarChart width={500}
              height={200}
              data={props.data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis dataKey="value"/>
      <Tooltip />
      <Bar dataKey="value" stackId="a" fill="#8884d8" />
    </BarChart>
  );
}


export default CustomBarChart;
