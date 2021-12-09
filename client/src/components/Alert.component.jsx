import React from "react";
import '../App.css'
const AlertMessage = (props)=>{
    return(
        <div className={`alert ${props.isSuccess?'successAlert':'failureAlert'}`}>
            {props.children}
        </div>
    );
}

export default AlertMessage;