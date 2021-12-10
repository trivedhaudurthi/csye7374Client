import axios from 'axios';
import React from 'react';
import Navbar from '../components/Navbar.component';
import Product from '../components/Product.component';
import * as constants from '../utils/constants';

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            products:[],
            failureResponse:null,
            successResponse:null
        }
    }
    async componentDidMount(){
        const url = `${constants.baseUrl}/product`;
        try {
            const response = await axios.get(url);
            this.setState({...this.state,products:response.data,failureResponse:null,successResponse:'success'});
        } catch (ex) {
            console.log(ex);
            this.setState({...this.state,failureResponse:ex,successResponse:null});
        }
    }
    renderProducts(){
        // console.log(this.state.products);
        return (
            <div className ="home-products-container">
                {
                    this.state.products.map((product,index)=>{
                        return <Product {...product} key = {index} />
                    })
                }
            </div>
        )
    }
    render(){
        return(
            <div>
                <Navbar />
                <h1>Products</h1>
                <div>
                    {this.renderProducts()}
                </div>
            </div>
        )
    }
}

export default HomeScreen;