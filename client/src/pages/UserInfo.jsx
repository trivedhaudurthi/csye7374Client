import axios from "axios";
import React from "react";
import AlertMessage from "../components/Alert.component";
import Navbar from "../components/Navbar.component";
import * as constants from '../utils/constants';
import '../PageStyles/UserInfo.styles.css';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            address: "",
            zipcode: "",
            isSeller: false,
            successResponse: null,
            failureResponse: null,
            products: [],
            product_quantity: "",
            product_name: "",
            product_type: "tech",
            product_price: "",
            product_description: "",
            up_product_quantity: "",
            up_product_name: "",
            up_product_type: "",
            up_product_price: "",
            up_product_description: "",
            role: "",
            up_product_to_update: "",
        };
    }

    async fectchInfo() {
        const role = localStorage.getItem("role");
        const url = `${constants.baseUrl}/${role}/`;
        try {
            const options = {
                url,
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("auth")}`
                }
            }
            const response = await axios(options);
            this.setState({ ...this.state, ...response.data, role });

        } catch (error) {
            console.log(error);
            this.setState({ ...this.state, failureResponse: "Unable to fetch the User Info" })
        }
    }
    async componentDidMount() {

        this.fectchInfo();

    }

    onUserUpdate = async (event)=>{
        event.preventDefault();
        const role = localStorage.getItem("role");
        const url = `${constants.baseUrl}/${role}/`;
        const data={
            name:this.state.name,
            zipcode:this.state.zipcode,
            address:this.state.address
        }
        try {
            const options = {
                url,
                method: 'patch',
                data,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("auth")}`
                }
            }
            const response = await axios(options);
            this.setState({ ...this.state, ...response.data, role });

        } catch (error) {
            console.log(error);
            this.setState({ ...this.state, failureResponse: "Unable to update Info" })
        }
    }

    onTextChange = (event) => {
        var type = event.target.name;
        this.setState({ ...this.state, [type]: event.target.value });
    }
    onUpdateProduct = async (event) => {
        const url = `${constants.baseUrl}/seller/product/${this.state.up_product_to_update}`
        event.preventDefault();
        const options={
            method:"patch",
            url,
            data:{
                "name":this.state.up_product_name,
                "description":this.state.up_product_description,
                "price":this.state.up_product_price,
                "quantity":this.state.up_product_quantity,
                "type":this.state.up_product_type
            },
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth")}`
            }
        }
       
        try {
            const response = await axios(options);
            this.fectchInfo();
        } catch (error) {
            console.log(error);
            this.setState({...this.state,failureResponse:"Unable to add/update product"});
        }
    }
    onAddProduct=async(event)=>{
        const url = `${constants.baseUrl}/seller/product`;
        this.performAction(event,"post",url);
    }
    performAction = async (event,method,url) =>{
        event.preventDefault();
        const options={
            method,
            url,
            data:{
                "name":this.state.product_name,
                "description":this.state.product_description,
                "price":this.state.product_price,
                "quantity":this.state.product_quantity,
                "type":this.state.product_type
            },
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth")}`
            }
        }
       
        try {
            const response = await axios(options);
            this.fectchInfo();
        } catch (error) {
            console.log(error);
            this.setState({...this.state,failureResponse:"Unable to add/update product"});
        }
    }

    onProductClicked = (event,product)=>{
        event.preventDefault();
        this.setState({...this.state,
            up_product_name:product.name,
            up_product_description:product.description,
            up_product_price:product.price,
            up_product_quantity:product.quantity,
            up_product_type:product.type,
            up_product_to_update:product.id
        })
    }

    renderProducts() {
        return this.state.products.map((product, index) => {
            return (
                <div key={index} className="cart-product seller-product-item" onClick={(event)=>{this.onProductClicked(event,product)}}>
                    <h4 className="cart-product-name">{product.name}</h4>
                    <h4 className="cart-product-quantity">{`x${product.quantity}`}</h4>
                    <h4 className="cart-product-price">{`${product.price}`}</h4>
                    <h4 className="cart-product-price">{`${product.type}`}</h4>
                </div>
            );
        })
    }

    rennderHeadings() {
        return (
            <div className="cart-product">
                <h4 className="cart-product-name">Name</h4>
                <h4 className="cart-product-quantity">Quantity</h4>
                <h4 className="cart-product-price">Price</h4>
                <h4>Type</h4>
            </div>
        )
    }

    renderAddProductInfo(submitAction) {
        return (
            <form className="signup-form-style" onSubmit={submitAction}  action="post">
                <legend>Add Product</legend>
                <div className="signupdiv" >
                    <label>Name</label>
                    <input type="text" name="product_name" value={this.state.product_name} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Description</label>
                    <input type="text" name="product_description" value={this.state.product_description} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Quantity</label>
                    <input type="text" name="product_quantity" value={this.state.product_quantity} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Price</label>
                    <input type="text" name="product_price" value={this.state.product_price} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Product Type</label>
                    <select name="product_type" value={this.state.product_type} onChange={this.onTextChange}>
                        <option value="tech">Tech</option>
                        <option value="grocery">Grocery</option>
                        <option value="clothing">Clothing</option>
                    </select>
                </div>
                <div className="signupdiv seller-signup-checkBox">
                    <input type="submit" value="Add Product" />
                </div>
            </form>
        )
    }

    renderUpdateProductInfo(submitAction) {
        return (
            <form className="signup-form-style update-product" onSubmit={submitAction} action="post">
                <legend>Update Product</legend>
                <div className="signupdiv" >
                    <label>Name</label>
                    <input type="text" name="up_product_name" value={this.state.up_product_name} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Description</label>
                    <input type="text" name="up_product_description" value={this.state.up_product_description} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Quantity</label>
                    <input type="text" name="up_product_quantity" value={this.state.up_product_quantity} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Price</label>
                    <input type="text" name="up_product_price" value={this.state.up_product_price} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Product Type</label>
                    <select name="up_product_type" value={this.state.up_product_type} onChange={this.onTextChange}>
                        <option value="tech">Tech</option>
                        <option value="grocery">Grocery</option>
                        <option value="clothing">Clothing</option>
                    </select>
                </div>
                <div className="signupdiv seller-signup-checkBox">
                    <input type="submit" value="Update Product" />
                </div>
            </form>
        )
    }
    render() {
        return (
            <div className="info-page">
                <Navbar />
                <div className="info-container">
                    <div className="user-info">
                        <form className="signup-form-style" onSubmit={this.onUserUpdate} >
                            <div className="signupdiv">
                                <label>Name</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.onTextChange} />
                            </div>
                            <div className="signupdiv">
                                <label>Email</label>
                                <input type="text" name="email" value={this.state.email} onChange={this.onTextChange} disabled />
                            </div>
                            
                            <div className="signupdiv">
                                <label>Address</label>
                                <input type="text" name="address" value={this.state.address} onChange={this.onTextChange} />
                            </div>
                            <div className="signupdiv">
                                <label>Zipcode</label>
                                <input type="text" name="zipcode" value={this.state.zipcode} onChange={this.onTextChange} />
                            </div>
                            <div className="signupdiv seller-signup-checkBox">
                                <input type="submit" value="Update" />
                            </div>
                            {this.state.successResponse && <AlertMessage isSuccess={true}>Successfully Updated!!</AlertMessage>}
                        </form>
                    </div>
                    {this.state.role === "seller" && (
                        <div className="add-product">
                            {this.renderAddProductInfo(this.onAddProduct)}
                        </div>
                    )
                    }
                </div>
                <div className="cart-product-group">
                    {this.rennderHeadings()}
                    {this.renderProducts()}
                </div>
                {this.state.role==="seller"&&this.renderUpdateProductInfo(this.onUpdateProduct)}
                {this.state.failureResponse && <AlertMessage isSuccess={false}>{this.state.failureResponse}</AlertMessage>}
            </div>
        )
    }
}

export default UserInfo;