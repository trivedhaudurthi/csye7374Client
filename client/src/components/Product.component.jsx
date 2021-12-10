import React from "react";
import logo from '../logo.svg';
import '../componentStyles/product.styles.css';
const product = (props) => {

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img src={logo} alt="product" className="product-image"/>
            </div>
            <div className="product-name">
                <h3>{props.name}</h3>
            </div>
            <div className="product-info">
                <p>{props.price}</p>
                <p>{props.quantity}</p>
            </div>
        </div>
    )
}

export default product;