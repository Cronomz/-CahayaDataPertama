import "./XAxisTick.css";
import { useEffect, useState } from "react";
import Card from "../../Card/Card";

function XAxisTick(props) {
    const { x, y, stroke, payload, tickFormatter, fontSize } = props;
    return (
        <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={10} fill="#666" fontSize={fontSize}> 
          <tspan textAnchor="middle" x="0">
            {tickFormatter? tickFormatter(payload.value)[0]: payload.value}
          </tspan>
          <tspan textAnchor="middle" x="0" dy="20">
            {tickFormatter? (tickFormatter(payload.value)[1]?? ""): ""}
          </tspan>
        </text>
      </g>
    );
}

export default XAxisTick;
