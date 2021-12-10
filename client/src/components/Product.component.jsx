import React from "react";
import logo from '../logo.svg';
import '../componentStyles/product.styles.css';
import { useNavigate } from "react-router-dom";

const Product = (props) => {

    let navigate = useNavigate();

    const onClick = (event)=>{
        event.preventDefault();
        navigate(`/product/${props.id}`,{replace:true})
    }

    return (
        <div className="product-container" onClick={onClick}>
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

export default Product;