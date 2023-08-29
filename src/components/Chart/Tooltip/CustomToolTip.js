import "./CustomToolTip.css";
import { useEffect, useState } from "react";
import Card from "../../Card/Card";

function CustomToolTip({ active, payload, label }) {
  
  const [timeFrame, setTimeFrame] = useState("secondly");
  

//   useEffect(() => {

//   },[props.data])

  if (active && payload && payload.length) {
    return (
        <div className="custom-tooltip">
            <Card backgroundColor={"#000"} height={""} width={""} padding={"5px 10px"}>
                <p className="label">{`${label.split(" ")[0]} ${label.split(" ")[1].split("+")[0]} : ${payload[0].value}`}</p>
                {/* <div>
                {payload.map((pld) => (
                    <div style={{ display: "inline-block" }}>
                        <div style={{ color: pld.fill }}>{pld.value}</div>
                        <div>{pld.dataKey}</div>
                    </div>
                ))}
                </div> */}
            </Card>
        </div>
    );
   }
}

export default CustomToolTip;
