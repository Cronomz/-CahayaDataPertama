import "./Chart.css"
import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Label } from 'recharts';
import CustomToolTip from "./Tooltip/CustomToolTip";
import XAxisTick from "./XAxisTick/XAxisTick";
import XLabel from "./XLabel/XLabel";

const COLORS = ['#00C49F', '#FF8042', '#FFBB28'];

function Chart(props) {
  const [chartWidth, setChartWidth] = useState(window.innerWidth - 200);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setChartWidth(window.innerWidth - 200);
    })
    console.log(props.yDataKey)
  },[])

  const yAxisFormatter = (value) => {
    value = value.toString();
    let format = "";
    let count = 0;
    for (let i = value.length - 1; i >= 0; i--) {
      format = value[i] + format;
      count++;
      if (count%3 == 0 && i != 0) {
        format = "," + format;
      }
    }
    
    return format
  }

  return (
    <div className="chart-container">
      <LineChart width={1000} height={300} data={props.data} animationDuration={300}>
        {props.yDataKey.map((e, index) => {
          console.log("ydatakey:", e)
          return (<Line type="monotone" dataKey={e??"value"} stroke={COLORS[index%COLORS.length]}/>)
        })}
        <CartesianGrid  strokeDasharray="3 3"/>
        <XAxis dataKey={props.xDataKey?? "timestamp"} tickFormatter={props.xAxisFormatter} tickSize={20} height={30} fontSize={"15px"} tick={<XAxisTick/>}/>
        <YAxis  tickFormatter={props.yAxisFormatter} width={40} allowDataOverflow={true} fontSize={"20px"} tickSize={10}/>
        {/* <Tooltip content={<CustomToolTip/>}></Tooltip> */}
        <Legend />
      </LineChart>
      <div className="label-y">{props.labelY}</div>
      {/* <div className="label-" style={{}}>{props.labelX?? `Time`}</div> */}
    </div>
  );
}

export default Chart;
