import "./Card.css";
import { useEffect, useState } from 'react';

function Card(props) {
 

    return (
        <div className={props.isAnimated?'card-container-animated': 'card-container'}
            style={{
                backgroundColor: props.backgroundColor,
                width: props.width?? 'min-content',
                height: props.height,
                padding: props.padding?? '20px',
                borderRadius: props.borderRadius?? "10px",
                ...props.style
            }}
        >
            {props.children}
        </div>
    );
}

export default Card;
