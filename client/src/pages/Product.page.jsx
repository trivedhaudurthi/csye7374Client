import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import AlertMessage from "../components/Alert.component";
import Navbar from "../components/Navbar.component";
import logo from '../logo.svg'
import * as constants from '../utils/constants';
import '../PageStyles/Product.page.styles.css'

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            failureResponse: null,
            quantity: 0,
            successResponse: null,
        };
    }

    onAddToCart = async (event) => {
        event.preventDefault();
        const url = `${constants.baseUrl}/user/cart`;
        const headers = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("auth")
            }
        }
        try {
            if (this.state.quantity === 0 || this.state.quantity > this.state.product.quantity) {
                throw new Error("Quntity requested in invalid");
            }
            const response = await axios.post(url, { id: this.state.product.id, quantity: this.state.quantity },headers);
            this.setState({ ...this.state, successResponse: "Added to cart", failureResponse: null });
        } catch (error) {
            this.setState({ ...this.state, successResponse: null, failureResponse: "Unable to add item to cart" })
        }
    }

    async componentDidMount() {
        const id = window.location.href.split("/").pop();
        // const id = 2;
        const url = `${constants.baseUrl}/product/${id}`;
        try {
            const response = await axios.get(url);
            this.setState({ ...this.state, product: response.data, failureResponse: null });
        }
        catch (ex) {
            console.log(ex);
            this.setState({ ...this.state, product: null, failureResponse: "Requested Product does not exist" });
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <h1>Product Info</h1>
                {this.state.product && (
                    <div className="product-page-container">
                        <div className="product-page-image">
                            <img src={logo} alt="product image"></img>
                        </div>
                        <div className="product-page-info">
                            <h3>{this.state.product.name}</h3>
                            <h5 className="product-page-price">{`$${this.state.product.price}`}</h5>
                            <p className="product-page-desc">{this.state.product.description}</p>
                            <h4 className="product-page-seller-label">Sold by</h4>
                            <p className="product-page-seller-name">{this.state.product.seller.name}</p>

                            <p>{`Available quantity:${this.state.product.quantity}`}</p>
                            <div className="product-page-quantity">
                                <label> Requested quantity</label>
                                <input type="text" value={this.state.quantity} className="product-page-quantity-input" onChange={(event) => { this.setState({ ...this.state, quantity: event.target.value }) }} />
                                <input type={"button"} value={"Add to cart"} onClick={this.onAddToCart} />
                            </div>
                        </div>

                    </div>)

                }
                {this.state.failureResponse && <AlertMessage isSuccess={false}>{this.state.failureResponse}</AlertMessage>}
                {this.state.successResponse && <Navigate to={"/cart"} replace={true} />}
            </div>
        )
    }
}

export default ProductPage;