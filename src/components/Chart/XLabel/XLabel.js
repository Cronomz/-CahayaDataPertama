import "./XLabel.css";
import { useEffect, useState } from "react";
import Card from "../../Card/Card";

function XLabel(props) {
    const { margin, value } = props;
    return (
        <div style={{margin: margin}}>
          {value}
        </div>
    );
}

export default XLabel;
