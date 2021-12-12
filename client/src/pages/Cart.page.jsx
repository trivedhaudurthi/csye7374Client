import axios from "axios";
import React from "react";
import AlertMessage from "../components/Alert.component";
import Navbar from "../components/Navbar.component";
import * as constants from '../utils/constants'
import '../PageStyles/cart.styles.css';
import { Navigate } from "react-router-dom";
class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            successResponse:null,
            failureResponse:null,
            products:[],
            onOrder:false,
            cardNumber:"",
            cvv:"",
            nameOnCard:"",
            paypalId:""
        }
    }
    async componentDidMount(){
        const token = localStorage.getItem("auth");
        const url = `${constants.baseUrl}/user/cart`;
        const options = {
            method:"get",
            url,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const response = await axios(options);
            this.setState({...this.state,products:response.data,failureResponse:null});
        } catch (error) {
            console.log(error);
            this.setState({...this.state,failureResponse:"Unable to fetch cart"})
        }

    }

    onOrder= (event)=>{
        event.preventDefault();
        this.setState({...this.state,onOrder:true})
    }

    onRemoveProduct = async (id)=>{
        const url = `${constants.baseUrl}/user/cart/${id}`;
        // console.log(url);
        const getItemsUrl = `${constants.baseUrl}/user/cart`;
        const headers = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("auth")
            }
        }
        try {
            
            const response = await axios.delete(url,headers);
            const cartItems = await axios.get(getItemsUrl,headers);
            this.setState({...this.state,products:cartItems.data,failureResponse:null});
            
        } catch (error) {
            console.log(error);
            this.setState({...this.state,failureResponse:"Unable to Remove Item from Cart"})
        }
    }
    rennderHeadings(){
        return (
            <div className="cart-product">
                    <h4 className="cart-product-name">Name</h4>
                    <h4 className="cart-product-quantity">Quantity</h4>
                    <h4 className="cart-product-price">Price</h4>
                    <h4>Remove Product</h4>
            </div>
        )
    }
    renderProducts(){
        return this.state.products.map((cartProduct,index)=>{
            return (
                <div key={index} className="cart-product">
                    <h4 className="cart-product-name">{cartProduct.product.name}</h4>
                    <h4 className="cart-product-quantity">{`X${cartProduct.quantity}`}</h4>
                    <h4 className="cart-product-price">{`$${cartProduct.product.price*cartProduct.quantity}`}</h4>
                    <input className="cart-product-remove" type={"button"} value={"Remove"} onClick={()=>this.onRemoveProduct(cartProduct.id)}/>
                </div>
            );
        })
    }
    renderSummary(){
        let total =0;
        var i=0;
        for(i=0;i<this.state.products.length;i++){
            var cartProduct = this.state.products[i];
            total+=(cartProduct.product.price*cartProduct.quantity);
        }
        return (
            <div className="cart-product">
                    <h4 className="cart-product-name"></h4>
                    <h4 className="cart-product-quantity">Total</h4>
                    <h4 className="cart-product-price">{total}</h4>
                    <h4></h4>
            </div>
        )
    }

    onCheckOutWithCreditCard = async (event)=>{
        event.preventDefault();
        const url = `${constants.baseUrl}/user/order/creditcard`;
        const headers = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("auth")
            }
        }
        try {
            const data  = {cardNumber:this.state.cardNumber,cvv:this.state.cvv,nameOnCard:this.state.nameOnCard};
            const response = await axios.post(url,data,headers);
            this.setState({...this.state,onOrder:true});
        } catch (error) {
            console.log(error);
            this.setState({...this.state,failureResponse:"Unable to place the order!!"})
        }
    }

    onCheckOutWithPaypal = async (event) =>{
        event.preventDefault();
        const url = `${constants.baseUrl}/user/order/paypal`;
        const headers = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("auth")
            }
        }
        try {
            const data  = {token:this.state.paypalId};
            const response = await axios.post(url,data,headers);
            this.setState({...this.state,onOrder:true});
        } catch (error) {
            console.log(error);
            this.setState({...this.state,failureResponse:"Unable to place the order!!"})
        }
    }

    onTextChange=(event)=>{
        const name = event.target.name;
        this.setState({...this.state,[name]:event.target.value});
    }

    render(){
        return(
            <div className="cart-page-container">
                <Navbar />
                {/* <input  type ="button" value={"Order"} className="cart-product-remove order-button"  onClick={this.onOrder}/> */}
                <div className="cart-product-group">
                    {this.rennderHeadings()}
                    {this.renderProducts()}
                    {this.renderSummary()}
                </div>
                <div className="checkout-container">
                    <form className="credit-card-container" onSubmit={this.onCheckOutWithCreditCard}>
                        <legend className="payment-form-title">Credit Card</legend>
                        <label className="payment-label">Card Number</label>
                        <input className="payment-input" type="text" placeholder="1234 XXXX" required={true} name="cardNumber" onChange={this.onTextChange} value={this.state.cardNumber}/>
                        <label className="payment-label">CVV</label>
                        <input className="payment-input" type="text" placeholder="333" required={true} name="cvv" onChange={this.onTextChange} value={this.state.cvv} />
                        <label className="payment-label">Name On Card</label>
                        <input className="payment-input" type="text" placeholder="John Doe" required={true} name="nameOnCard" onChange={this.onTextChange} value={this.state.nameOnCard} />
                        <input className="order-product-button" type="submit" value="Checkout" />
                    </form>
                    <form className="paypal-container" onSubmit={this.onCheckOutWithPaypal}>
                        <legend className="payment-form-title">Paypal</legend>
                        <label className="payment-label">Paypal Id</label>
                        <input className="payment-input" type="text" placeholder="ab@example.com" required={true} name="paypalId" onChange={this.onTextChange} value={this.state.paypalId} />
                        <input className="order-product-button" type="submit" value="Checkout" />
                    </form>
                </div>
                {this.state.failureResponse&&<AlertMessage isSuccess={false}>{this.state.failureResponse}</AlertMessage>}
                {this.state.onOrder&& <Navigate to="/orders" />}
            </div>
        )
    }
}

export default Cart;