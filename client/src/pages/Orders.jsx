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

    rennderHeadings(){
        var role = localStorage.getItem("role");
        return (
            <div className="order-product">
                    <h4>Name</h4>
                    <h4>Quantity</h4>
                    <h4>{role==="seller"?'User':'Seller'}</h4>
                    <h4>Ordered Time</h4>
            </div>
        )
    }
    renderOrders() {
        var role = localStorage.getItem("role");
        return this.state.orders.map((order, index) => {
            var date = new Date(order.createdTime);
            return (
                <div className="order-product" key={index}>
                    <div>{order.productName}</div>
                    <div>{order.quantity}</div>
                    <div>{role==="seller"?order.userName:order.sellerName}</div>
                    <div>{`${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</div>
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
                    {this.rennderHeadings()}
                    {this.renderOrders()}
                </div>
                {this.state.failureState&&<AlertMessage isSuccess={false}>{this.state.failureState}</AlertMessage>}
            </div>
        );
    }
}


export default Orderspage;