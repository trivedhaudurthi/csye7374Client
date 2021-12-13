import axios from "axios";
import React from "react";
import Navbar from "../components/Navbar.component";
import * as constants from '../utils/constants';
import '../PageStyles/Orders.styles.css';
import '../PageStyles/cart.styles.css';
import AlertMessage from "../components/Alert.component";
class Orderspage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            failureState: null
        }
    }
    async componentDidMount() {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("auth");
        const url = `${constants.baseUrl}/${role}/order`;
        const options = {
            method:"get",
            url,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        try {
            
            const response = await axios(options);
            this.setState({ ...this.state, orders: response.data, failureState: null });
        } catch (error) {
            console.log(error);
            this.setState({ ...this.state, failureState: "Unable to fetch orders" })
        }
    }


    renderOrders() {
        return this.state.orders.map((order, index) => {
            return (
                <div className="order-product" key={index}>
                    <div>{order.productName}</div>
                    <div>{order.quantity}</div>
                    <div>{order.sellerName}</div>
                    <div>{new Date(order.createdTime).toLocaleTimeString()}</div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className="order-page-container">
                <Navbar />
                <h2>Orders</h2>
                <div className="cart-product-group">
                    {this.renderOrders()}
                </div>
                {this.state.failureState&&<AlertMessage isSuccess={false}>{this.state.failureState}</AlertMessage>}
            </div>
        );
    }
}


export default Orderspage;