import axios from "axios";
import React from "react";
import AlertMessage from "../components/Alert.component";
import Navbar from "../components/Navbar.component";
import * as constants from '../utils/constants'
class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            successResponse:null,
            failureResponse:null,
            products:[],
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

    onRemoveProduct = async (id)=>{
        const url = `${constants.baseUrl}/user/cart/${id}`;
        console.log(url);
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

    render(){
        return(
            <div>
                <Navbar />
                <div>
                    {this.renderProducts()}
                </div>
                {this.state.failureResponse&&<AlertMessage isSuccess={false}>{this.state.failureResponse}</AlertMessage>}
            </div>
        )
    }
}

export default Cart;