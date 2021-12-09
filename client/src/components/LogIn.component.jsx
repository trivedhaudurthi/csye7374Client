import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router';
import "../componentStyles/SignUp.styles.css";
import * as constants from '../utils/constants'
import AlertMessage from './Alert.component';
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
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
        const url = `${constants.baseUrl}/authenticate`;
        try{
            const response = await axios.post(url,{
                email:this.state.email,
                password:this.state.password
            });

            localStorage.setItem("auth",response.data);
            localStorage.setItem("username",this.email.split("@")[0]);
            this.setState({...this.state,successResponse:"Logged in successfully",failureResponse:null});
        }
        catch(ex){
            console.log(ex);
            localStorage.setItem("auth",null);
            localStorage.setItem("username",null);
            this.setState({...this.state,failureResponse:ex,successResponse:null});
        }
    }

    render() {
        return (
            <form className="signup-form-style" onSubmit={this.onSubmit}>
                <div className="signupdiv">
                    <label>Email</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv">
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.onTextChange} />
                </div>
                <div className="signupdiv seller-signup-checkBox">
                    <input type="submit" value="Sign Up" />
                </div>
                {this.state.successResponse&&<Navigate to="/" replace={true}></Navigate>}
                {this.state.failureResponse&&<AlertMessage isSuccess={false}> Please enter valid emial/password </AlertMessage>}
            </form>
        );
    }
}

export default LoginForm;