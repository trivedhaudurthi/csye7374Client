import React from 'react';
import "../componentStyles/SignUp.styles.css";
import * as constants from "../utils/constants";
import axios from 'axios';
import AlertMessage from './Alert.component';
class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            address: "",
            zipcode: "",
            isSeller:false,
            successResponse:null,
            failureResponse:null
        }
    }

    onTextChange = (event) => {
        var type = event.target.name;
        this.setState({ ...this.state, [type]: event.target.value });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const url = `${constants.baseUrl}/signup/${this.state.isSeller?'seller':'user'}`;
        try{
            const response = await axios.post(url,{name:this.state.name,email:this.state.email,
            password:this.state.password,address:this.state.address,zipcode:this.state.zipcode});
            this.setState({...this.state,successResponse:response,failureResponse:null});
            
        }catch(ex){
            console.log(ex);
            this.setState({...this.state,failureResponse:ex,successResponse:null});
        }
        
    }

    render() {
        return (
            <form className="signup-form-style" onSubmit ={this.onSubmit} >
                <div className="signupdiv">
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Email</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.onTextChange} />
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
                    <input type="checkbox" checked={this.state.isSeller} onChange= {(event)=>{this.setState({...this.state,isSeller:!this.state.isSeller})}}/>
                    <label>Sign in as seller</label>
                </div>
                <div className="signupdiv seller-signup-checkBox">
                    <input type="submit" value="Sign Up" />
                </div>
                {this.state.successResponse&&<AlertMessage isSuccess={true}>You have signed up</AlertMessage>}
                {this.state.failureResponse&&<AlertMessage isSuccess={false}>Make sure to fill all the details</AlertMessage>}
            </form>
        );
    }
}

export default SignupForm;